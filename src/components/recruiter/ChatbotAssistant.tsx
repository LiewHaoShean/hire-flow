
import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI assistant. How can I help you with recruiting today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I can help you find suitable candidates for that position.",
        "Would you like me to analyze the applicant's profile?",
        "I can schedule interviews for your top candidates.",
        "Let me check the latest applicants for your job postings.",
        "I can provide insights on market trends for this role.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        className="h-14 w-14 rounded-full shadow-lg bg-hr-blue hover:bg-hr-blue-dark"
        aria-label="Chat with AI Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in">
          {/* Chat header */}
          <div className="p-3 border-b bg-hr-blue text-white flex justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2 bg-white text-hr-blue">
                <MessageSquare className="h-4 w-4" />
              </Avatar>
              <span className="font-medium">AI Recruiting Assistant</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChat}
              className="text-white hover:bg-hr-blue-dark rounded-full h-8 w-8 p-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Chat messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-hr-blue text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="bg-hr-blue hover:bg-hr-blue-dark"
              disabled={inputValue.trim() === ""}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
