import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Send, 
  Code2, 
  FileText, 
  Calculator, 
  Database, 
  Braces, 
  MessageSquare,
  Sparkles,
  Copy,
  Check,
  Bot,
  User,
  Menu,
  Plus,
  Trash2,
  History,
  Loader2,
  RefreshCw
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { 
  createConversationAPI, 
  ConversationSummary, 
  ConversationDetail, 
  ConversationMessage,
  StreamingData 
} from "@/lib/conversationApi";

// Categories matching your backend enum
const categories = [
  { 
    id: "general_chat", 
    name: "General Chat", 
    icon: MessageSquare, 
    color: "bg-blue-500", 
    description: "General programming questions and discussions" 
  },
  { 
    id: "code_generation", 
    name: "Code Generation", 
    icon: Code2, 
    color: "bg-green-500", 
    description: "Generate code snippets and functions" 
  },
  { 
    id: "documentation", 
    name: "Documentation", 
    icon: FileText, 
    color: "bg-purple-500", 
    description: "Create technical documentation and guides" 
  },
  { 
    id: "code_analysis", 
    name: "Code Analysis", 
    icon: Braces, 
    color: "bg-orange-500", 
    description: "Review and analyze existing code" 
  },
  { 
    id: "database_queries", 
    name: "Database Queries", 
    icon: Database, 
    color: "bg-red-500", 
    description: "SQL queries and database design" 
  },
  { 
    id: "calculations", 
    name: "Calculations", 
    icon: Calculator, 
    color: "bg-indigo-500", 
    description: "Mathematical computations and algorithms" 
  },
];

const suggestedPrompts = [
  "Create a React component for a login form",
  "Write a Python function to sort an array",
  "Generate SQL query to join two tables",
  "Explain how JavaScript closures work",
  "Create a responsive CSS grid layout",
  "Write TypeScript interfaces for a user system",
  "Debug this JavaScript function",
  "Optimize this SQL query for performance",
  "Create a REST API with FastAPI",
  "Write unit tests for this function"
];

export default function Code() {
  // Auth and API state
  const { user, token } = useAuth();
  
  // UI State
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [currentConversation, setCurrentConversation] = useState<ConversationDetail | null>(null);
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general_chat");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // API instance
  const apiRef = useRef<ReturnType<typeof createConversationAPI> | null>(null);
  
  // Initialize API when token is available
  useEffect(() => {
    if (token) {
      apiRef.current = createConversationAPI(token);
    }
  }, [token]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation?.messages, streamingMessage]);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  // Load user conversations
  const loadConversations = async () => {
    if (!apiRef.current) return;
    
    setIsLoadingConversations(true);
    try {
      const conversations = await apiRef.current.getConversations(20, 0);
      setConversations(conversations);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setIsLoadingConversations(false);
    }
  };

  // Start a new conversation
  const startNewConversation = async (message: string) => {
    if (!apiRef.current || !message.trim()) return;

    setIsStreaming(true);
    setStreamingMessage("");

    try {
      let conversationId: string | null = null;
      let fullResponse = '';

      const handleStream = (data: StreamingData) => {
        if (data.type === 'metadata' && data.conversation_id) {
          conversationId = data.conversation_id;
        } else if (data.type === 'content' && data.content) {
          fullResponse += data.content;
          setStreamingMessage(fullResponse);
        } else if (data.type === 'complete') {
          // Stream completed
        } else if (data.type === 'error' && data.error) {
          throw new Error(data.error);
        }
      };

      await apiRef.current.createConversation({
        message: message.trim(),
        category: selectedCategory
      }, handleStream);

      // Load the complete conversation and refresh list
      if (conversationId) {
        await loadConversation(conversationId);
        loadConversations();
      }
    } catch (error) {
      console.error('Failed to start conversation:', error);
    } finally {
      setIsStreaming(false);
      setStreamingMessage("");
    }
  };

  // Continue existing conversation
  const continueConversation = async (message: string) => {
    if (!apiRef.current || !message.trim() || !currentConversation) return;

    setIsStreaming(true);
    setStreamingMessage("");

    // Add user message to current conversation immediately
    const userMessage: ConversationMessage = {
      role: "user",
      content: message.trim(),
      timestamp: new Date().toISOString()
    };

    setCurrentConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, userMessage]
    } : null);

    try {
      let fullResponse = '';

      const handleStream = (data: StreamingData) => {
        if (data.type === 'content' && data.content) {
          fullResponse += data.content;
          setStreamingMessage(fullResponse);
        } else if (data.type === 'complete') {
          // Stream completed
        } else if (data.type === 'error' && data.error) {
          throw new Error(data.error);
        }
      };

      await apiRef.current.continueConversation(currentConversation.uid || currentConversation._id, {
        message: message.trim(),
        category: selectedCategory
      }, handleStream);

      // Add AI response to conversation
      const aiMessage: ConversationMessage = {
        role: "assistant",
        content: fullResponse,
        timestamp: new Date().toISOString()
      };

      setCurrentConversation(prev => prev ? {
        ...prev,
        messages: [...prev.messages, aiMessage]
      } : null);

      loadConversations(); // Refresh conversation list
    } catch (error) {
      console.error('Failed to continue conversation:', error);
    } finally {
      setIsStreaming(false);
      setStreamingMessage("");
    }
  };

  // Load specific conversation
  const loadConversation = async (conversationId: string) => {
    if (!apiRef.current) return;

    try {
      const conversation = await apiRef.current.getConversation(conversationId);
      if (conversation) {
        setCurrentConversation(conversation);
        // Set category based on conversation
        if (conversation.category) {
          setSelectedCategory(conversation.category);
        }
      }
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  };

  // Delete conversation
  const deleteConversation = async (conversationId: string) => {
    if (!apiRef.current) return;

    try {
      const success = await apiRef.current.deleteConversation(conversationId);
      if (success) {
        setConversations(prev => prev.filter(c => (c.uid || c._id) !== conversationId));
        if ((currentConversation?.uid || currentConversation?._id) === conversationId) {
          setCurrentConversation(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const message = input;
    setInput("");

    if (currentConversation) {
      await continueConversation(message);
    } else {
      await startNewConversation(message);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (content: string, messageId: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle prompt click
  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Create new conversation
  const createNewConversation = () => {
    setCurrentConversation(null);
    setStreamingMessage("");
  };

  // Simplified Sidebar Component
  const Sidebar = ({ onClose }: { onClose?: () => void }) => (
    <div className="space-y-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold">AI Assistant</h2>
          <p className="text-sm text-muted-foreground">Code Companion</p>
        </div>
      </div>

      {/* New Conversation Button */}
      <Button 
        onClick={() => {
          createNewConversation();
          onClose?.();
        }}
        className="w-full justify-start gap-2 mb-4"
      >
        <Plus className="h-4 w-4" />
        New Conversation
      </Button>

      {/* Recent Conversations */}
      <div className="flex-1 min-h-0">
        <div className="flex items-center gap-2 mb-3">
          <History className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-muted-foreground">Recent Chats</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadConversations}
            disabled={isLoadingConversations}
            className="ml-auto h-6 w-6 p-0"
          >
            <RefreshCw className={`h-3 w-3 ${isLoadingConversations ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <ScrollArea className="h-full">
          <div className="space-y-2">
            {isLoadingConversations ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : conversations.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No conversations yet
              </p>
            ) : (
              conversations.map((conversation) => {
                const convId = conversation.uid || conversation._id;
                const currentId = currentConversation?.uid || currentConversation?._id;
                return (
                  <Card
                    key={convId}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md group ${
                      currentId === convId
                        ? "ring-2 ring-primary shadow-lg"
                        : "hover:shadow-sm"
                    }`}
                    onClick={() => {
                      loadConversation(convId);
                      onClose?.();
                    }}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {conversation.title || "New Conversation"}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {conversation.last_message || "No messages"}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {categories.find(c => c.id === conversation.category)?.name || conversation.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {conversation.message_count} msgs
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(convId);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] relative">
        {/* Desktop Sidebar */}
        <div className="w-80 border-r bg-card/50 backdrop-blur-sm p-6 hidden lg:block overflow-y-auto">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="w-full sm:w-80 p-6 overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle className="sr-only">AI Assistant Settings</SheetTitle>
            </SheetHeader>
            <Sidebar onClose={() => setIsMobileSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden border-b bg-card/50 backdrop-blur-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-semibold text-lg">
                  {currentConversation?.title || "AI Code Assistant"}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </p>
              </div>
            </div>
            <Button
              onClick={createNewConversation}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4 lg:p-6">
            {!currentConversation && !isStreaming ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="max-w-md lg:max-w-2xl mx-auto">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="relative p-6 rounded-2xl bg-card border shadow-lg">
                      <Sparkles className="h-12 lg:h-16 w-12 lg:w-16 text-primary mx-auto mb-4" />
                      <h1 className="text-2xl lg:text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        AI Code Assistant
                      </h1>
                      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
                        Your intelligent coding companion for generating code, creating documentation, 
                        analyzing projects, and solving complex programming challenges.
                      </p>
                      
                      {/* Quick Start Prompts */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Start</h3>
                        <div className="grid gap-3 text-left">
                          {suggestedPrompts.slice(0, 6).map((prompt, index) => (
                            <button
                              key={index}
                              onClick={() => handlePromptClick(prompt)}
                              className="p-3 text-sm rounded-lg border border-dashed border-muted-foreground/30 hover:border-primary hover:bg-muted/50 transition-colors text-left"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 lg:space-y-8 max-w-4xl mx-auto">
                {/* Render conversation messages */}
                {currentConversation?.messages.map((message, index) => (
                  <div
                    key={`${currentConversation._id || currentConversation.uid}-${index}`}
                    className={`flex gap-3 lg:gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 mt-1 ring-2 ring-primary/20 shadow-md flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-semibold">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <Card
                      className={`max-w-[85%] lg:max-w-[80%] group relative ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg"
                          : "bg-card shadow-md hover:shadow-lg transition-shadow"
                      }`}
                    >
                      <CardContent className="p-4 lg:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                          <div className="text-xs text-muted-foreground">
                            {formatTimestamp(message.timestamp)}
                          </div>
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap font-sans leading-relaxed text-sm lg:text-base overflow-x-auto">{message.content}</pre>
                        </div>
                        {message.role === "assistant" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-muted h-8 w-8 p-0"
                            onClick={() => copyToClipboard(message.content, `${currentConversation._id || currentConversation.uid}-${index}`)}
                          >
                            {copiedId === `${currentConversation._id || currentConversation.uid}-${index}` ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 mt-1 ring-2 ring-muted shadow-md flex-shrink-0">
                        <AvatarFallback className="bg-muted text-foreground text-sm font-semibold">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {/* Streaming message */}
                {isStreaming && (
                  <div className="flex gap-3 lg:gap-4 justify-start animate-in slide-in-from-bottom-2">
                    <Avatar className="h-8 w-8 mt-1 ring-2 ring-primary/20 shadow-md">
                      <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <Card className="bg-card shadow-md max-w-[85%] lg:max-w-[80%]">
                      <CardContent className="p-4 lg:p-5">
                        {streamingMessage ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <pre className="whitespace-pre-wrap font-sans leading-relaxed text-sm lg:text-base overflow-x-auto">
                              {streamingMessage}
                              <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
                            </pre>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            </div>
                            <span className="text-sm text-muted-foreground">AI is thinking...</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t bg-card/50 backdrop-blur-sm p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
              {/* Input with enhanced styling */}
              <Card className="shadow-lg border-2 border-muted hover:border-primary/50 transition-colors">
                <CardContent className="p-3 lg:p-4">
                  <div className="flex gap-2 lg:gap-3">
                    <div className="flex-1 space-y-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Ask me anything about ${categories.find(c => c.id === selectedCategory)?.name.toLowerCase()}...`}
                        className="border-0 bg-transparent text-sm lg:text-base placeholder:text-muted-foreground focus-visible:ring-0 resize-none"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        disabled={isStreaming}
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Press Enter to send, Shift+Enter for new line</span>
                        <div className="flex items-center gap-2">
                          <span className="hidden sm:inline">Category:</span>
                          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-40 h-6 text-xs border-none bg-transparent">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => {
                                const Icon = category.icon;
                                return (
                                  <SelectItem key={category.id} value={category.id}>
                                    <div className="flex items-center gap-2">
                                      <Icon className="h-3 w-3" />
                                      <span>{category.name}</span>
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!input.trim() || isStreaming}
                      size="icon"
                      className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 flex-shrink-0"
                    >
                      {isStreaming ? (
                        <Loader2 className="h-4 w-4 lg:h-5 lg:w-5 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4 lg:h-5 lg:w-5" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
