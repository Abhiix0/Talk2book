import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Clock, Shield, Zap, Users, Globe, ArrowRight, CheckCircle, Star } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/layout/Footer";
import heroImage from "@/assets/hero-museum.jpg";
import modernArt from "@/assets/modern-art.jpg";
import ancientCivilization from "@/assets/ancient-civilizations.jpg";

const Home = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Clock,
      title: "Skip Queues",
      description: "Book tickets instantly and bypass long waiting lines.",
    },
    {
      icon: MessageSquare,
      title: "24/7 Support",
      description: "Our AI assistant is always ready to help you with your booking.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your transactions are protected with bank-level security.",
    },
  ];

  const exhibitions = [
    {
      title: "Modern Art Collection",
      description: "Explore contemporary masterpieces from renowned artists worldwide.",
      image: modernArt,
      date: "Ongoing"
    },
    {
      title: "Ancient Civilizations",
      description: "Journey through time with artifacts from ancient cultures.",
      image: ancientCivilization,
      date: "Until Dec 31, 2024"
    },
    {
      title: "Digital Futures",
      description: "Interactive exhibition showcasing the intersection of art and technology.",
      image: heroImage,
      date: "Sep 1 - Dec 15, 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1A1A1A] text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[600px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Skip the Queues.</span>
              <br className="hidden md:block" />
              <span className="text-[#FBC02D]">Book Tickets in Seconds.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Your smart museum chatbot for hassle-free booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#1E88E5] hover:bg-[#1976D2] text-white text-lg px-8 py-6 rounded-xl hover:shadow-lg hover:shadow-[#1E88E5]/30 transition-all duration-200"
                onClick={() => navigate("/chat")}
              >
                Start Booking
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitions Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Exhibitions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our current and upcoming exhibitions. Book your tickets now for an unforgettable experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exhibitions.map((exhibition, index) => (
              <Card key={index} className="bg-[#1E1E1E] border border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#1E88E5]/10 hover:border-[#1E88E5]/50 transition-all duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={exhibition.image} 
                    alt={exhibition.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-white">{exhibition.title}</CardTitle>
                      <p className="text-sm text-[#1E88E5] mt-1">{exhibition.date}</p>
                    </div>
                    <div className="flex items-center bg-[#1E88E5]/10 text-[#1E88E5] text-xs px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Featured
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{exhibition.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5]/10 hover:text-[#1E88E5] transition-colors"
                    onClick={() => navigate("/exhibitions")}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the future of museum ticketing with our innovative features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-[#1E1E1E] p-8 rounded-2xl border border-gray-800 hover:border-[#1E88E5]/50 hover:shadow-lg hover:shadow-[#1E88E5]/10 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#1E88E5] to-[#0D47A1] rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1E1E1E] to-[#1A1A1A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of visitors who've experienced the museum without the wait.
          </p>
          <Button 
            size="lg" 
            className="bg-[#1E88E5] hover:bg-[#1976D2] text-white text-lg px-8 py-6 rounded-xl hover:shadow-lg hover:shadow-[#1E88E5]/30 transition-all duration-200"
            onClick={() => navigate("/chat")}
          >
            Start Booking Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;