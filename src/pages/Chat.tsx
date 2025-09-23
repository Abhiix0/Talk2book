import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Calendar, Ticket, History, MessageSquare } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/chat/ChatBot";

const Chat = () => {
  const [selectedExhibition, setSelectedExhibition] = useState<string>();

  // Mock booking history data
  const bookingHistory = [
    {
      id: "TKT-001",
      museum: "Metropolitan Museum",
      exhibition: "Ancient Civilizations",
      date: "2024-01-15",
      tickets: 2,
      status: "confirmed",
      total: 50
    },
    {
      id: "TKT-002", 
      museum: "MoMA",
      exhibition: "Modern Art Gallery",
      date: "2024-01-10",
      tickets: 1,
      status: "completed",
      total: 30
    },
    {
      id: "TKT-003",
      museum: "Science Museum",
      exhibition: "Space & Science",
      date: "2024-01-20",
      tickets: 4,
      status: "upcoming",
      total: 112
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-accent text-accent-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      case "upcoming": return "bg-primary text-primary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Book Museum Tickets
          </h1>
          <p className="text-xl text-muted-foreground">
            Chat with our AI assistant to book tickets, check exhibitions, or manage your bookings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[700px] flex flex-col">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>Talk2Book Assistant</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ChatBot selectedExhibition={selectedExhibition} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setSelectedExhibition("Ancient Civilizations")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Popular Exhibition
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Nearby Museums
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Check Availability
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Ticket className="w-4 h-4 mr-2" />
                  Group Booking
                </Button>
              </CardContent>
            </Card>

            {/* Booking History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>Recent Bookings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="space-y-2 p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{booking.id}</span>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>{booking.museum}</div>
                      <div>{booking.exhibition}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span>{booking.date}</span>
                        <span className="font-medium">${booking.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-sm">
                  View All Bookings
                </Button>
              </CardContent>
            </Card>

            {/* Popular Exhibitions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Ancient Civilizations", museum: "Metropolitan", price: "$25" },
                  { name: "Modern Art Gallery", museum: "MoMA", price: "$30" },
                  { name: "Space & Science", museum: "Science Museum", price: "$28" },
                ].map((exhibition, index) => (
                  <div 
                    key={index} 
                    className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedExhibition(exhibition.name)}
                  >
                    <div className="font-medium text-sm">{exhibition.name}</div>
                    <div className="text-xs text-muted-foreground">{exhibition.museum}</div>
                    <div className="text-sm font-medium text-primary mt-1">{exhibition.price}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Language Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Language</CardTitle>
              </CardHeader>
              <CardContent>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="zh">中文</option>
                </select>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-muted/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Common Questions</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• How to book group tickets?</li>
                <li>• Cancellation policy</li>
                <li>• Accessibility options</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Example Commands</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• "Book 2 tickets for MoMA"</li>
                <li>• "Show exhibitions this weekend"</li>
                <li>• "Cancel booking TKT-001"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Support</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Live chat support 24/7</li>
                <li>• Email: support@talk2book.com</li>
                <li>• Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Chat;