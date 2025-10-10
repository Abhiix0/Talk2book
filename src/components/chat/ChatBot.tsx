import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  options?: string[];
}

interface ChatBotProps {
  selectedExhibition?: string;
}

type BookingStep = 'exhibition' | 'date' | 'tickets' | 'confirm' | 'processing' | 'complete';

interface BookingData {
  exhibition: string;
  date: string;
  tickets: number;
}

const ChatBot = ({ selectedExhibition }: ChatBotProps) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<BookingStep>('exhibition');
  const [bookingData, setBookingData] = useState<BookingData>({
    exhibition: selectedExhibition || '',
    date: '',
    tickets: 0,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const exhibitions = [
    "Ancient Civilizations",
    "Modern Art Gallery",
    "Space & Science",
    "Contemporary Photography",
  ];

  useEffect(() => {
    // Initial greeting and first question
    if (selectedExhibition) {
      setBookingData(prev => ({ ...prev, exhibition: selectedExhibition }));
      addBotMessage(`Great! You've selected "${selectedExhibition}". When would you like to visit? (e.g., Today, Tomorrow, or a specific date)`, 1000);
      setCurrentStep('date');
    } else {
      addBotMessage("Welcome to Heritage Museum! 🎨 I'll help you book tickets. Which exhibition would you like to visit?", 500, exhibitions);
    }
  }, [selectedExhibition]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (text: string, isUser: boolean, options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
      options,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string, delay: number = 1000, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, false, options);
    }, delay);
  };

  const handleSend = (message: string = inputValue) => {
    if (!message.trim()) return;

    addMessage(message, true);
    setInputValue("");

    processUserInput(message);
  };

  const processUserInput = (input: string) => {
    switch (currentStep) {
      case 'exhibition':
        handleExhibitionSelection(input);
        break;
      case 'date':
        handleDateSelection(input);
        break;
      case 'tickets':
        handleTicketSelection(input);
        break;
      case 'confirm':
        handleConfirmation(input);
        break;
    }
  };

  const handleExhibitionSelection = (input: string) => {
    const matchedExhibition = exhibitions.find(ex => 
      input.toLowerCase().includes(ex.toLowerCase())
    );
    
    if (matchedExhibition || exhibitions.includes(input)) {
      const exhibition = matchedExhibition || input;
      setBookingData(prev => ({ ...prev, exhibition }));
      addBotMessage(`Great choice! "${exhibition}" is one of our most popular exhibitions. When would you like to visit? (e.g., Today, Tomorrow, or a specific date)`, 1000);
      setCurrentStep('date');
    } else {
      addBotMessage("I couldn't find that exhibition. Please choose from our current exhibitions:", 800, exhibitions);
    }
  };

  const handleDateSelection = (input: string) => {
    setBookingData(prev => ({ ...prev, date: input }));
    addBotMessage(`Perfect! You've selected ${input}. How many tickets do you need?`, 1000, ["1", "2", "3", "4", "5+"]);
    setCurrentStep('tickets');
  };

  const handleTicketSelection = (input: string) => {
    const ticketCount = parseInt(input) || parseInt(input.match(/\d+/)?.[0] || '0');
    
    if (ticketCount > 0) {
      setBookingData(prev => ({ ...prev, tickets: ticketCount }));
      const price = 25; // Base price per ticket
      const total = price * ticketCount;
      
      addBotMessage(
        `📋 Booking Summary:\n\n🎨 Exhibition: ${bookingData.exhibition}\n📅 Date: ${bookingData.date}\n🎫 Tickets: ${ticketCount}\n💰 Total: $${total}\n\nDoes everything look correct?`,
        1200,
        ["Yes, confirm booking", "No, start over"]
      );
      setCurrentStep('confirm');
    } else {
      addBotMessage("Please enter a valid number of tickets (e.g., 2)", 800);
    }
  };

  const handleConfirmation = (input: string) => {
    if (input.toLowerCase().includes('yes') || input.toLowerCase().includes('confirm')) {
      setCurrentStep('processing');
      addBotMessage("🔒 Processing your payment... Please wait.", 1000);
      
      setTimeout(() => {
        addBotMessage("✅ Payment successful! Booking your tickets...", 2000);
        
        setTimeout(() => {
          setCurrentStep('complete');
          navigate('/success', { 
            state: { 
              bookingData: {
                ...bookingData,
                bookingId: `HM-${Math.floor(Math.random() * 10000)}`,
                total: 25 * bookingData.tickets
              }
            } 
          });
        }, 3000);
      }, 2000);
    } else {
      setCurrentStep('exhibition');
      setBookingData({ exhibition: '', date: '', tickets: 0 });
      addBotMessage("No problem! Let's start over. Which exhibition would you like to visit?", 1000, exhibitions);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-gradient-hero p-4 text-primary-foreground rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">Heritage Museum Assistant</h3>
            <p className="text-sm opacity-90">
              {isTyping ? (
                <span className="flex items-center space-x-1">
                  <span>Typing</span>
                  <div className="flex space-x-0.5">
                    <div className="w-1 h-1 bg-white/70 rounded-full typing-indicator"></div>
                    <div className="w-1 h-1 bg-white/70 rounded-full typing-indicator"></div>
                    <div className="w-1 h-1 bg-white/70 rounded-full typing-indicator"></div>
                  </div>
                </span>
              ) : (
                "Online • Ready to help"
              )}
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
                "max-w-[80%] p-4 shadow-lg chat-bubble-enter transition-smooth",
                message.isUser
                  ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md ml-auto"
                  : "bg-card border border-border text-card-foreground rounded-2xl rounded-bl-md"
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
                          className="text-xs border-primary/30 hover:bg-primary/10"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
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
            <div className="bg-card border border-border text-card-foreground p-4 rounded-2xl rounded-bl-md shadow-lg transition-smooth">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full typing-indicator"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full typing-indicator"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full typing-indicator"></div>
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
            className="flex-1 bg-input border-border"
          />
          <Button 
            onClick={() => handleSend()}
            size="sm"
            className="btn-premium"
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