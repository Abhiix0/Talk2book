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

  // Mock booking history data for Heritage Museum
  const bookingHistory = [
    {
      id: "HM-001",
      exhibition: "Ancient Civilizations",
      date: "2024-01-15",
      tickets: 2,
      status: "confirmed",
      total: 50
    },
    {
      id: "HM-002", 
      exhibition: "Modern Art Gallery",
      date: "2024-01-10",
      tickets: 1,
      status: "completed",
      total: 30
    },
    {
      id: "HM-003",
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Book Heritage Museum Tickets
          </h1>
          <p className="text-xl text-muted-foreground">
            Chat with our AI assistant to book tickets, check exhibitions, or manage your bookings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[700px] flex flex-col shadow-premium">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>Heritage Museum Assistant</span>
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
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-primary/30 hover:bg-primary/10"
                  onClick={() => setSelectedExhibition("Ancient Civilizations")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Popular Exhibition
                </Button>
                <Button variant="outline" className="w-full justify-start border-primary/30 hover:bg-primary/10">
                  <MapPin className="w-4 h-4 mr-2" />
                  Museum Location & Hours
                </Button>
                <Button variant="outline" className="w-full justify-start border-primary/30 hover:bg-primary/10">
                  <Clock className="w-4 h-4 mr-2" />
                  Check Availability
                </Button>
                <Button variant="outline" className="w-full justify-start border-primary/30 hover:bg-primary/10">
                  <Ticket className="w-4 h-4 mr-2" />
                  Group Booking
                </Button>
              </CardContent>
            </Card>

            {/* Booking History */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2 text-foreground">
                  <History className="w-5 h-5" />
                  <span>Recent Bookings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="space-y-2 p-3 border border-border rounded-lg bg-card/50">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-foreground">{booking.id}</span>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>Heritage Museum</div>
                      <div>{booking.exhibition}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span>{booking.date}</span>
                        <span className="font-medium text-foreground">${booking.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-sm hover:bg-primary/10">
                  View All Bookings
                </Button>
              </CardContent>
            </Card>

            {/* Popular Exhibitions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Ancient Civilizations", price: "$25" },
                  { name: "Modern Art Gallery", price: "$30" },
                  { name: "Space & Science", price: "$28" },
                ].map((exhibition, index) => (
                  <div 
                    key={index} 
                    className="p-3 border border-border rounded-lg cursor-pointer hover:bg-primary/5 transition-colors"
                    onClick={() => setSelectedExhibition(exhibition.name)}
                  >
                    <div className="font-medium text-sm text-foreground">{exhibition.name}</div>
                    <div className="text-xs text-muted-foreground">Heritage Museum</div>
                    <div className="text-sm font-medium text-primary mt-1">{exhibition.price}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Museum Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Museum Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground">Tue-Sun: 10 AM - 6 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground">123 Culture Ave</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground">24/7 AI Support</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-card/30 rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-foreground">Common Questions</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• How to book group tickets?</li>
                <li>• Cancellation policy</li>
                <li>• Accessibility options</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-foreground">Example Commands</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• "Book 2 tickets for Modern Art"</li>
                <li>• "Show exhibitions this weekend"</li>
                <li>• "Cancel booking HM-001"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-foreground">Support</h4>
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