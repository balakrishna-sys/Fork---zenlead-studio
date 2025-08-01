import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
  Check
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  category?: string;
  timestamp: Date;
}

const categories = [
  { id: "general", name: "General Chat", icon: MessageSquare, color: "bg-blue-500" },
  { id: "code", name: "Code Generation", icon: Code2, color: "bg-green-500" },
  { id: "docs", name: "Documentation", icon: FileText, color: "bg-purple-500" },
  { id: "analysis", name: "Code Analysis", icon: Braces, color: "bg-orange-500" },
  { id: "database", name: "Database Queries", icon: Database, color: "bg-red-500" },
  { id: "calculation", name: "Calculations", icon: Calculator, color: "bg-indigo-500" },
];

const suggestedPrompts = [
  "Create a React component for a login form",
  "Write a Python function to sort an array",
  "Generate SQL query to join two tables",
  "Explain how JavaScript closures work",
  "Create a responsive CSS grid layout",
  "Write TypeScript interfaces for a user system"
];

export default function Code() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      category: selectedCategory,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(input, selectedCategory),
        isUser: false,
        category: selectedCategory,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (query: string, category: string): string => {
    switch (category) {
      case "code":
        return `Here's a code solution for "${query}":\n\n\`\`\`javascript\nfunction solution() {\n  // Implementation based on your request\n  console.log("Code generated successfully!");\n  return "result";\n}\n\`\`\`\n\nThis code provides a basic structure. You can modify it according to your specific requirements.`;
      case "docs":
        return `# Documentation for "${query}"\n\n## Overview\nThis documentation covers the requested topic in detail.\n\n## Implementation\n- Step 1: Setup\n- Step 2: Configuration\n- Step 3: Usage\n\n## Best Practices\nFollow these guidelines for optimal results.`;
      case "database":
        return `Here's a SQL query for "${query}":\n\n\`\`\`sql\nSELECT * FROM table_name\nWHERE condition = 'value'\nORDER BY created_at DESC;\n\`\`\`\n\nThis query efficiently handles your data requirements.`;
      default:
        return `I understand you're asking about "${query}". Let me provide you with a comprehensive answer that addresses your question in detail. This response covers the key aspects and provides practical insights.`;
    }
  };

  const copyToClipboard = async (content: string, messageId: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-80 border-r bg-muted/30 p-4 hidden lg:block">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Categories
            </h2>
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className={`p-1.5 rounded ${category.color} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
              Suggested Prompts
            </h3>
            <div className="space-y-2">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full text-left p-2 text-xs rounded border border-dashed border-muted-foreground/30 hover:border-primary hover:bg-muted/50 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="max-w-md">
                  <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h1 className="text-2xl font-bold mb-2">AI Code Assistant</h1>
                  <p className="text-muted-foreground mb-6">
                    Ask questions, generate code, create documentation, and get help with programming tasks.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {categories.slice(0, 3).map((category) => {
                      const Icon = category.icon;
                      return (
                        <Badge
                          key={category.id}
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <Icon className="h-3 w-3 mr-1" />
                          {category.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!message.isUser && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          AI
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      } rounded-lg p-4 relative group`}
                    >
                      {message.category && (
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {categories.find(c => c.id === message.category)?.name}
                        </Badge>
                      )}
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
                      </div>
                      {!message.isUser && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard(message.content, message.id)}
                        >
                          {copiedId === message.id ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      )}
                    </div>
                    {message.isUser && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-muted text-foreground text-xs">
                          You
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4 justify-start">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-2 mb-2 lg:hidden">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-1"
                    >
                      <Icon className="h-3 w-3" />
                      <span className="hidden sm:inline">{category.name}</span>
                    </Button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about code, documentation, or programming..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!input.trim() || isLoading}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
