import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Calendar, 
  MapPin, 
  Ticket, 
  Share,
  Home
} from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/layout/Footer";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  
  const bookingData = location.state?.bookingData || {
    bookingId: "HM-DEMO123",
    exhibition: "Ancient Civilizations",
    date: "Tomorrow",
    time: "2:00 PM",
    tickets: 2,
    total: 50,
    qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE0Ij5RUiBDb2RlPC90ZXh0Pjwvc3ZnPg=="
  };

  useEffect(() => {
    // Hide confetti effect after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    // Create a simple ticket download (demo)
    const ticketData = {
      bookingId: bookingData.bookingId,
      museum: "Heritage Museum",
      exhibition: bookingData.exhibition,
      date: bookingData.date,
      time: bookingData.time,
      tickets: bookingData.tickets,
      total: bookingData.total
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ticketData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `ticket-${bookingData.bookingId}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Simple CSS-only confetti effect
  const confettiPieces = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 opacity-80 animate-bounce ${
        showConfetti ? 'block' : 'hidden'
      }`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 20}%`,
        backgroundColor: i % 3 === 0 ? '#1E88E5' : i % 3 === 1 ? '#FBC02D' : '#E0E0E0',
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      }}
    />
  ));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {confettiPieces}
        </div>
      )}

      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-semibold mb-4 text-foreground">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-xl text-gray-300">
            Your Heritage Museum tickets are ready
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Ticket */}
          <div className="order-2 lg:order-1">
            <Card className="museum-card text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2 text-foreground">
                  <Ticket className="w-5 h-5 text-primary" />
                  <span>Your Digital Ticket</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code */}
                <div className="bg-white p-4 rounded-xl mx-auto w-48 h-48 flex items-center justify-center">
                  <img 
                    src={bookingData.qrCode} 
                    alt="QR Code Ticket" 
                    className="w-full h-full"
                  />
                </div>

                <div className="space-y-2">
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {bookingData.bookingId}
                  </Badge>
                  <p className="text-xs text-gray-400">
                    Show this QR code at the museum entrance
                  </p>
                </div>

                <Button 
                  onClick={handleDownload}
                  className="w-full btn-accent transition-smooth"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Ticket
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Booking Details */}
          <div className="order-1 lg:order-2">
            <Card className="museum-card">
              <CardHeader>
                <CardTitle className="text-foreground">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">Heritage Museum</div>
                      <div className="text-sm text-gray-300">123 Culture Ave</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Ticket className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">{bookingData.exhibition}</div>
                      <div className="text-sm text-gray-300">{bookingData.tickets} ticket(s)</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">{bookingData.date}</div>
                      <div className="text-sm text-gray-300">{bookingData.time}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Total Paid</span>
                  <Badge className="bg-green-600 text-white text-lg px-3 py-1">
                    ${bookingData.total}
                  </Badge>
                </div>

                <Separator />

                <div className="bg-card/30 rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">Email Confirmation</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Your booking confirmation and tickets have been sent to your email address.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="transition-smooth border-primary/30 hover:bg-primary/10"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate("/chat")}
            className="transition-smooth border-primary/30 hover:bg-primary/10"
          >
            <Ticket className="w-4 h-4 mr-2" />
            Book Another
          </Button>

          <Button 
            variant="outline"
            className="transition-smooth border-primary/30 hover:bg-primary/10"
          >
            <Share className="w-4 h-4 mr-2" />
            Share Experience
          </Button>
        </div>

        {/* Important Information */}
        <div className="mt-12 bg-card/30 rounded-2xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Important Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-foreground">Before Your Visit</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• Arrive 15 minutes early</li>
                <li>• Bring a valid ID</li>
                <li>• Photography guidelines apply</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-foreground">Contact</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• Email: tickets@heritage-museum.com</li>
                <li>• Phone: +1 (555) 123-4567</li>
                <li>• Live chat available 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Success;