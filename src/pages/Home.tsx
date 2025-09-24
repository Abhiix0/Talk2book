import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Clock, Shield, Zap, Users, Globe, ArrowRight, CheckCircle } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/layout/Footer";
import heroImage from "@/assets/hero-museum.jpg";

const Home = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Clock,
      title: "Skip Queues",
      description: "Book tickets instantly and bypass long waiting lines at Heritage Museum.",
    },
    {
      icon: MessageSquare,
      title: "24/7 AI Assistant",
      description: "Get instant help anytime. Our intelligent chatbot is always ready to assist.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your transactions are protected with bank-level security and encryption.",
    },
    {
      icon: Globe,
      title: "Multi-language",
      description: "Available in multiple languages to serve our diverse community.",
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Complete your Heritage Museum ticket booking in under 2 minutes via chat.",
    },
    {
      icon: Users,
      title: "Group Bookings",
      description: "Easy group reservations for families, schools, and tour groups.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Happy Visitors" },
    { value: "15+", label: "Exhibitions" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9★", label: "User Rating" },
  ];

  const testimonials = [
    {
      quote: "Talk2Book made visiting Heritage Museum so much easier! No more standing in line.",
      author: "Sarah Chen",
      role: "Art Enthusiast",
    },
    {
      quote: "The chatbot understood exactly what I wanted. Booked family tickets in minutes!",
      author: "Michael Rodriguez",
      role: "Parent",
    },
    {
      quote: "Perfect for our school group. The booking process was incredibly smooth.",
      author: "Emily Watson",
      role: "Teacher",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Skip the Queues.</span>
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Book Tickets in Seconds.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Chat with our AI assistant and book your Heritage Museum tickets instantly. 
              Experience ancient civilizations, modern art, and cutting-edge science exhibitions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-premium text-lg px-8 py-6 transition-smooth"
                onClick={() => navigate("/chat")}
              >
                Start Booking
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10 transition-smooth"
                onClick={() => navigate("/exhibitions")}
              >
                View Exhibitions
              </Button>
            </div>
          </div>
        </div>

        {/* Floating highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: MessageSquare, title: "24/7 Support", desc: "AI assistant always ready" },
            { icon: Globe, title: "Multilingual", desc: "Available in multiple languages" },
            { icon: Shield, title: "Secure Payments", desc: "Bank-level security" }
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth shadow-lg">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose Heritage Museum?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of museum ticketing with our innovative features designed for modern culture enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="museum-card group">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Book your Heritage Museum tickets in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Start Chatting",
                description: "Tell our AI assistant which exhibition you'd like to visit and when.",
              },
              {
                step: "02",
                title: "Choose Options",
                description: "Select your tickets, add-ons, and preferred time slots through natural conversation.",
              },
              {
                step: "03",
                title: "Secure Payment",
                description: "Complete your booking with secure payment and receive instant confirmation.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center text-2xl font-bold text-accent-foreground mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What Our Visitors Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied Heritage Museum visitors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="museum-card">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-accent rounded-full"></div>
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-premium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Skip the Queue?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of smart Heritage Museum visitors who book their tickets the modern way.
          </p>
          <Button 
            size="lg" 
            className="btn-accent text-lg px-8 py-3 transition-smooth"
            onClick={() => navigate("/chat")}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Book Your Tickets Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;