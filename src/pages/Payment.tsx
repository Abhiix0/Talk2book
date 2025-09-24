import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, Ticket, MapPin, Calendar, Clock } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/layout/Footer";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get booking data from navigation state or use demo data
  const bookingData = location.state?.bookingData || {
    exhibition: "Ancient Civilizations",
    date: "Tomorrow",
    time: "2:00 PM",
    tickets: 2,
    price: 25,
    total: 50
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      navigate("/success", { 
        state: { 
          bookingData: {
            ...bookingData,
            bookingId: `HM-${Date.now()}`,
            qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE0Ij5RUiBDb2RlPC90ZXh0Pjwvc3ZnPg=="
          }
        }
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold mb-4 text-foreground">
            Complete Your Booking
          </h1>
          <p className="text-gray-300">
            Secure payment for Heritage Museum tickets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="museum-card sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Ticket className="w-5 h-5 text-primary" />
                  <span>Booking Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm text-gray-300">Heritage Museum</span>
                  </div>
                  <div className="font-medium text-foreground">{bookingData.exhibition}</div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-gray-300">{bookingData.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-gray-300">{bookingData.time}</span>
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Tickets ({bookingData.tickets})</span>
                    <span className="text-foreground">${bookingData.price} each</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-foreground">Total</span>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      ${bookingData.total}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="museum-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span>Payment Details</span>
                  <Lock className="w-4 h-4 text-accent ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="transition-smooth"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber" className="text-foreground">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="transition-smooth"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-foreground">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          required
                          className="transition-smooth"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                          className="transition-smooth"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="name" className="text-foreground">Cardholder Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter full name"
                        required
                        className="transition-smooth"
                      />
                    </div>
                  </div>

                  <div className="bg-card/30 rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lock className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-foreground">Secure Payment</span>
                    </div>
                    <p className="text-xs text-gray-300">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full btn-premium text-lg py-6 transition-smooth"
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing Payment...</span>
                      </div>
                    ) : (
                      `Pay $${bookingData.total} - Complete Booking`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            🔒 This is a demo payment page. No real charges will be made.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;