import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Clock, MapPin, Calendar, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  options?: string[];
  bookingData?: any;
}

interface ChatBotProps {
  selectedExhibition?: string;
}

const ChatBot = ({ selectedExhibition }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Bot responses and conversation flow
  const botResponses = {
    greeting: "Hello! Welcome to Talk2Book 🎨 I'm your museum booking assistant. I can help you book tickets, check exhibitions, or answer questions. What would you like to do today?",
    bookTicket: "Great choice! Let me help you book museum tickets. Which museum would you like to visit?",
    exhibitions: "Here are our current featured exhibitions. Which one interests you?",
    payment: "Perfect! Let me prepare your booking details for payment.",
    confirmation: "🎉 Booking confirmed! Your tickets have been sent to your email. Have a wonderful visit!",
  };

  const quickActions = [
    "Book museum tickets",
    "View current exhibitions", 
    "Check my bookings",
    "Cancel a booking",
    "Get directions",
    "Ask a question"
  ];

  const museums = [
    "Metropolitan Museum of Art",
    "Museum of Modern Art (MoMA)",
    "Natural History Museum",
    "Science Museum",
    "Art Institute"
  ];

  const exhibitions = [
    { name: "Ancient Civilizations", price: "$25", duration: "2-3 hours" },
    { name: "Modern Art Gallery", price: "$30", duration: "1-2 hours" },
    { name: "Space & Science", price: "$28", duration: "2-4 hours" },
    { name: "Contemporary Photography", price: "$22", duration: "1-2 hours" },
  ];

  useEffect(() => {
    // Initial greeting
    const initialMessage: Message = {
      id: "1",
      text: selectedExhibition 
        ? `I see you're interested in "${selectedExhibition}". Let me help you book tickets for this exhibition!`
        : botResponses.greeting,
      isUser: false,
      timestamp: new Date(),
      options: selectedExhibition ? ["Book tickets", "Learn more", "View other exhibitions"] : quickActions,
    };
    setMessages([initialMessage]);
  }, [selectedExhibition]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (text: string, isUser: boolean, options?: string[], bookingData?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
      options,
      bookingData,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleSend = (message: string = inputValue) => {
    if (!message.trim()) return;

    // Add user message
    addMessage(message, true);
    setInputValue("");

    // Simulate bot response
    simulateTyping(() => {
      handleBotResponse(message.toLowerCase());
    });
  };

  const handleBotResponse = (userMessage: string) => {
    if (userMessage.includes("book") || userMessage.includes("ticket")) {
      addMessage(
        "I'd be happy to help you book tickets! Which museum would you like to visit?",
        false,
        museums
      );
    } else if (userMessage.includes("exhibition") || userMessage.includes("show")) {
      addMessage(
        "Here are our current featured exhibitions:",
        false
      );
      // Add exhibition cards
      setTimeout(() => {
        addMessage(
          "Which exhibition would you like to book?",
          false,
          exhibitions.map(ex => ex.name)
        );
      }, 500);
    } else if (museums.some(museum => userMessage.includes(museum.toLowerCase()))) {
      const selectedMuseum = museums.find(museum => userMessage.includes(museum.toLowerCase()));
      addMessage(
        `Great choice! ${selectedMuseum} has amazing exhibitions. How many tickets do you need?`,
        false,
        ["1 ticket", "2 tickets", "3-5 tickets", "Group booking (6+)"]
      );
    } else if (userMessage.includes("cancel")) {
      addMessage(
        "I can help you cancel a booking. Please provide your booking reference number or email address.",
        false
      );
    } else if (userMessage.includes("direction") || userMessage.includes("location")) {
      addMessage(
        "📍 Most of our partner museums are located in the city center with easy public transport access. Which museum do you need directions to?",
        false,
        museums
      );
    } else if (["1", "2", "3", "4", "5"].some(num => userMessage.includes(num))) {
      addMessage(
        "Perfect! When would you like to visit?",
        false,
        ["Today", "Tomorrow", "This weekend", "Next week", "Choose specific date"]
      );
    } else if (userMessage.includes("today") || userMessage.includes("tomorrow") || userMessage.includes("weekend")) {
      const bookingData = {
        tickets: userMessage.includes("1") ? 1 : 2,
        date: userMessage.includes("today") ? "Today" : userMessage.includes("tomorrow") ? "Tomorrow" : "This weekend",
        price: 25
      };
      
      addMessage(
        `📋 Booking Summary:\n• ${bookingData.tickets} ticket(s)\n• Date: ${bookingData.date}\n• Price: $${bookingData.price * bookingData.tickets}\n\nShall I proceed with payment?`,
        false,
        ["Proceed to payment", "Modify booking", "Add more tickets"],
        bookingData
      );
    } else if (userMessage.includes("payment") || userMessage.includes("proceed")) {
      addMessage(
        "🔒 Redirecting to secure payment... Please wait.",
        false
      );
      setTimeout(() => {
        addMessage(
          "🎉 Payment successful! Your booking is confirmed. You'll receive your e-tickets via email shortly. Thank you for choosing Talk2Book!",
          false,
          ["View my tickets", "Book another museum", "Share feedback"]
        );
      }, 2000);
    } else {
      // Default response
      addMessage(
        "I'm here to help with museum bookings! You can ask me to book tickets, check exhibitions, or get information about our partner museums. What would you like to do?",
        false,
        quickActions
      );
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-gradient-hero p-4 text-primary-foreground">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">Talk2Book Assistant</h3>
            <p className="text-sm opacity-90">
              {isTyping ? "Typing..." : "Online • Ready to help"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-chat-background">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.isUser ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] p-3 rounded-2xl shadow-chat chat-bubble-enter",
                message.isUser
                  ? "bg-chat-user text-chat-user-foreground"
                  : "bg-chat-bot text-chat-bot-foreground"
              )}
            >
              <div className="flex items-start space-x-2">
                {!message.isUser && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="whitespace-pre-line">{message.text}</p>
                  
                  {/* Quick Action Buttons */}
                  {message.options && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSend(option)}
                          className="text-xs"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Booking Data Display */}
                  {message.bookingData && (
                    <Card className="mt-3">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Ticket className="w-4 h-4 text-primary" />
                            <span className="font-medium">Booking Details</span>
                          </div>
                          <Badge variant="secondary">
                            ${message.bookingData.price * message.bookingData.tickets}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.isUser && (
                      <User className="w-4 h-4 opacity-70" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-chat-bot text-chat-bot-foreground p-3 rounded-2xl shadow-chat">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button 
            onClick={() => handleSend()}
            size="sm"
            className="btn-museum"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          💡 Try: "Book 2 tickets for tomorrow" or "Show me exhibitions"
        </p>
      </div>
    </div>
  );
};

export default ChatBot;