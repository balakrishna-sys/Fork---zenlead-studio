import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
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
  Zap,
  Lightbulb,
  ChevronDown,
  ArrowUp
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  category?: string;
  timestamp: Date;
}

const categories = [
  { id: "general", name: "General Chat", icon: MessageSquare, color: "bg-gradient-to-r from-blue-500 to-blue-600", description: "General programming questions and discussions" },
  { id: "code", name: "Code Generation", icon: Code2, color: "bg-gradient-to-r from-green-500 to-green-600", description: "Generate code snippets and functions" },
  { id: "docs", name: "Documentation", icon: FileText, color: "bg-gradient-to-r from-purple-500 to-purple-600", description: "Create technical documentation and guides" },
  { id: "analysis", name: "Code Analysis", icon: Braces, color: "bg-gradient-to-r from-orange-500 to-orange-600", description: "Review and analyze existing code" },
  { id: "database", name: "Database Queries", icon: Database, color: "bg-gradient-to-r from-red-500 to-red-600", description: "SQL queries and database design" },
  { id: "calculation", name: "Calculations", icon: Calculator, color: "bg-gradient-to-r from-indigo-500 to-indigo-600", description: "Mathematical computations and algorithms" },
];

const suggestedPrompts = [
  { text: "Create a React component for a login form", category: "code", icon: Code2 },
  { text: "Write a Python function to sort an array", category: "code", icon: Code2 },
  { text: "Generate SQL query to join two tables", category: "database", icon: Database },
  { text: "Explain how JavaScript closures work", category: "docs", icon: FileText },
  { text: "Create a responsive CSS grid layout", category: "code", icon: Code2 },
  { text: "Review this code for best practices", category: "analysis", icon: Braces },
];

const quickActions = [
  { id: "debug", name: "Debug Code", icon: Zap, color: "text-yellow-500" },
  { id: "optimize", name: "Optimize", icon: ArrowUp, color: "text-green-500" },
  { id: "explain", name: "Explain", icon: Lightbulb, color: "text-blue-500" },
];

export default function Code() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

    // Simulate AI response with more realistic delay
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
    }, Math.random() * 2000 + 1000);
  };

  const generateMockResponse = (query: string, category: string): string => {
    switch (category) {
      case "code":
        return `Here's a code solution for "${query}":\n\n\`\`\`javascript\nfunction solution() {\n  // Implementation based on your request\n  console.log("Code generated successfully!");\n  return "result";\n}\n\n// Usage example:\nconst result = solution();\nconsole.log(result);\n\`\`\`\n\nThis code provides a robust foundation. Key features:\n• Clean, readable structure\n• Error handling included\n• Optimized performance\n• TypeScript compatible\n\nWould you like me to explain any part or add additional features?`;
      case "docs":
        return `# 📖 Documentation: ${query}\n\n## 🎯 Overview\nThis comprehensive guide covers everything you need to know about the requested topic.\n\n## 🚀 Quick Start\n1. **Setup**: Initialize your environment\n2. **Configuration**: Set up required parameters\n3. **Implementation**: Follow the step-by-step guide\n4. **Testing**: Verify your implementation\n\n## 💡 Best Practices\n- Always validate input data\n- Implement proper error handling\n- Follow coding standards\n- Write comprehensive tests\n\n## 🔗 Related Resources\n- Official documentation\n- Community examples\n- Troubleshooting guide`;
      case "database":
        return `Here's an optimized SQL solution for "${query}":\n\n\`\`\`sql\n-- Efficient query with proper indexing considerations\nSELECT \n    t1.id,\n    t1.name,\n    t2.related_data,\n    COUNT(t3.id) as total_count\nFROM table_name t1\nINNER JOIN related_table t2 ON t1.id = t2.table_id\nLEFT JOIN counts_table t3 ON t1.id = t3.reference_id\nWHERE t1.status = 'active'\n    AND t1.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)\nGROUP BY t1.id, t1.name, t2.related_data\nORDER BY t1.created_at DESC, total_count DESC\nLIMIT 100;\n\`\`\`\n\n**Performance Notes:**\n• Uses appropriate JOIN types\n• Includes WHERE clause optimization\n• Proper indexing recommended on: status, created_at, foreign keys\n• LIMIT clause prevents excessive data retrieval`;
      case "analysis":
        return `## 🔍 Code Analysis Results\n\nI've reviewed the code for "${query}". Here's my analysis:\n\n### ✅ Strengths\n- Clean code structure\n- Good variable naming\n- Proper separation of concerns\n\n### ⚠️ Areas for Improvement\n- **Performance**: Consider caching repeated calculations\n- **Security**: Add input validation\n- **Maintainability**: Extract magic numbers to constants\n\n### 🚀 Recommended Optimizations\n1. Implement error boundaries\n2. Add TypeScript types\n3. Use modern ES6+ features\n4. Consider async/await for better readability\n\n### 📈 Performance Impact\nEstimated improvement: 25-40% faster execution\nMemory usage: 15% reduction possible`;
      case "calculation":
        return `## 🔢 Mathematical Solution for "${query}"\n\n### Algorithm Approach\nUsing optimized computational methods for accuracy and performance.\n\n\`\`\`python\ndef calculate_solution(input_data):\n    \"\"\"\n    Efficient calculation with O(n log n) complexity\n    \"\"\"\n    result = 0\n    for i, value in enumerate(input_data):\n        result += value * math.log(i + 1)\n    \n    return round(result, 6)\n\n# Example usage\ndata = [1, 2, 3, 4, 5]\nresult = calculate_solution(data)\nprint(f"Result: {result}")\n\`\`\`\n\n### Complexity Analysis\n- **Time Complexity**: O(n log n)\n- **Space Complexity**: O(1)\n- **Accuracy**: 6 decimal places\n\n### Alternative Approaches\n1. Iterative method (faster for small datasets)\n2. Recursive approach (more readable)\n3. Vectorized computation (NumPy recommended)`;
      default:
        return `I understand you're asking about "${query}". Let me provide you with a comprehensive answer:\n\n## 🎯 Key Points\n- **Primary concept**: The main idea revolves around understanding the core principles\n- **Implementation**: Practical steps to achieve your goal\n- **Best practices**: Industry-standard approaches\n\n## 💡 Practical Examples\nHere are some real-world applications and use cases that demonstrate the concept in action.\n\n## 🔗 Next Steps\n1. Start with the basics\n2. Practice with simple examples\n3. Gradually increase complexity\n4. Apply to real projects\n\nWould you like me to dive deeper into any specific aspect?`;
    }
  };

  const copyToClipboard = async (content: string, messageId: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePromptClick = (prompt: { text: string; category: string }) => {
    setSelectedCategory(prompt.category);
    setInput(prompt.text);
  };

  const scrollToTop = () => {
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Enhanced Sidebar */}
        <div className="w-80 border-r bg-card/50 backdrop-blur-sm p-6 hidden lg:block overflow-y-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI Assistant</h2>
                <p className="text-sm text-muted-foreground">Choose your category</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={category.id}
                    className={`transition-all duration-200 cursor-pointer hover:shadow-md ${
                      selectedCategory === category.id
                        ? "ring-2 ring-primary shadow-lg scale-[1.02]"
                        : "hover:shadow-sm"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${category.color} text-white shadow-sm`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{category.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Quick Actions
            </h3>
            <div className="flex gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    className="flex-1 h-auto p-2 flex-col gap-1"
                  >
                    <Icon className={`h-4 w-4 ${action.color}`} />
                    <span className="text-xs">{action.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Enhanced Suggested Prompts */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Suggested Prompts
            </h3>
            <div className="space-y-2">
              {suggestedPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-sm transition-all duration-200 hover:scale-[1.01]"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        <Icon className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-xs leading-relaxed">{prompt.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Main Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="relative p-6 rounded-2xl bg-card border shadow-lg">
                      <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        AI Code Assistant
                      </h1>
                      <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                        Your intelligent coding companion for generating code, creating documentation, 
                        analyzing projects, and solving complex programming challenges.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {categories.slice(0, 6).map((category) => {
                      const Icon = category.icon;
                      return (
                        <Card
                          key={category.id}
                          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <CardContent className="p-4 text-center">
                            <div className={`inline-flex p-3 rounded-xl ${category.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-semibold text-sm">{category.name}</h3>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 max-w-5xl mx-auto">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.isUser ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-500`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {!message.isUser && (
                      <Avatar className="h-10 w-10 mt-1 ring-2 ring-primary/20 shadow-md">
                        <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-semibold">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <Card
                      className={`max-w-[85%] group relative ${
                        message.isUser
                          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg"
                          : "bg-card shadow-md hover:shadow-lg transition-shadow"
                      }`}
                    >
                      <CardContent className="p-5">
                        {message.category && (
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" className="text-xs font-medium">
                              {categories.find(c => c.id === message.category)?.name}
                            </Badge>
                            <div className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        )}
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap font-sans leading-relaxed">{message.content}</pre>
                        </div>
                        {!message.isUser && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-muted"
                            onClick={() => copyToClipboard(message.content, message.id)}
                          >
                            {copiedId === message.id ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                    {message.isUser && (
                      <Avatar className="h-10 w-10 mt-1 ring-2 ring-muted shadow-md">
                        <AvatarFallback className="bg-muted text-foreground text-sm font-semibold">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4 justify-start animate-in slide-in-from-bottom-2">
                    <Avatar className="h-10 w-10 mt-1 ring-2 ring-primary/20 shadow-md">
                      <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <Card className="bg-card shadow-md">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          </div>
                          <span className="text-sm text-muted-foreground">AI is thinking...</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Scroll to top button */}
          {showScrollTop && (
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 rounded-full shadow-lg"
              onClick={scrollToTop}
            >
              <ChevronDown className="h-4 w-4 rotate-180" />
            </Button>
          )}

          {/* Enhanced Input Area */}
          <div className="border-t bg-card/50 backdrop-blur-sm p-6">
            <div className="max-w-5xl mx-auto">
              {/* Mobile category selector */}
              <div className="flex gap-2 mb-4 lg:hidden overflow-x-auto pb-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2 whitespace-nowrap flex-shrink-0"
                    >
                      <Icon className="h-3 w-3" />
                      <span className="text-xs">{category.name}</span>
                    </Button>
                  );
                })}
              </div>

              {/* Input with enhanced styling */}
              <Card className="shadow-lg border-2 border-muted hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Ask me anything about ${categories.find(c => c.id === selectedCategory)?.name.toLowerCase()}...`}
                        className="border-0 bg-transparent text-base placeholder:text-muted-foreground focus-visible:ring-0 resize-none"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Press Enter to send, Shift+Enter for new line</span>
                        <div className="flex items-center gap-2">
                          <span>Category:</span>
                          <Badge variant="outline" className="text-xs">
                            {categories.find(c => c.id === selectedCategory)?.name}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!input.trim() || isLoading}
                      size="icon"
                      className="h-12 w-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <Send className="h-5 w-5" />
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
