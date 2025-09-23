import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, MapPin, Calendar, Star, Search, Filter, Users } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/layout/Footer";
import ancientImage from "@/assets/ancient-civilizations.jpg";
import modernArtImage from "@/assets/modern-art.jpg";
import spaceScienceImage from "@/assets/space-science.jpg";
import photographyImage from "@/assets/photography.jpg";

const Exhibitions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const exhibitions = [
    {
      id: 1,
      title: "Ancient Civilizations",
      museum: "Metropolitan Museum of Art",
      description: "Journey through time and explore the fascinating world of ancient Egypt, Greece, and Rome. See authentic artifacts, mummies, and treasures.",
      image: ancientImage,
      price: 25,
      duration: "2-3 hours",
      rating: 4.8,
      category: "History",
      location: "5th Ave, New York",
      availability: "Available",
      features: ["Audio Guide", "Interactive", "Family Friendly"],
      nextAvailable: "Today at 2:00 PM"
    },
    {
      id: 2,
      title: "Modern Art Gallery",
      museum: "Museum of Modern Art (MoMA)",
      description: "Immerse yourself in the world's finest collection of modern and contemporary art, featuring works by Picasso, Van Gogh, and Warhol.",
      image: modernArtImage,
      price: 30,
      duration: "1-2 hours",
      rating: 4.9,
      category: "Art",
      location: "11 W 53rd St, New York",
      availability: "Limited",
      features: ["Audio Guide", "Expert Tour", "Photography"],
      nextAvailable: "Tomorrow at 10:00 AM"
    },
    {
      id: 3,
      title: "Space & Science Discovery",
      museum: "Natural History Museum",
      description: "Explore the wonders of our universe with interactive planetarium shows, moon rocks, and hands-on space exploration exhibits.",
      image: spaceScienceImage,
      price: 28,
      duration: "2-4 hours",
      rating: 4.7,
      category: "Science",
      location: "200 Central Park West",
      availability: "Available",
      features: ["Planetarium", "Interactive", "Kids Zone", "IMAX"],
      nextAvailable: "Today at 1:30 PM"
    },
    {
      id: 4,
      title: "Contemporary Photography",
      museum: "Photography Center",
      description: "A stunning collection of contemporary photography showcasing diverse perspectives from emerging and established artists worldwide.",
      image: photographyImage,
      price: 22,
      duration: "1-2 hours",
      rating: 4.6,
      category: "Photography",
      location: "94 E Broadway, New York",
      availability: "Available",
      features: ["Artist Talks", "Photography", "Quiet Viewing"],
      nextAvailable: "Today at 3:00 PM"
    }
  ];

  const categories = ["All", "Art", "History", "Science", "Photography", "Culture"];

  const filteredExhibitions = exhibitions.filter(exhibition => {
    const matchesSearch = exhibition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exhibition.museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exhibition.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || exhibition.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Limited": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Sold Out": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-museum text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Amazing Exhibitions
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Explore world-class museums and exhibitions. Book your cultural journey with our AI assistant.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search exhibitions, museums, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg bg-white text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">Categories:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Showing {filteredExhibitions.length} of {exhibitions.length} exhibitions
          </div>
        </div>

        {/* Exhibition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {filteredExhibitions.map((exhibition) => (
            <Card key={exhibition.id} className="museum-card overflow-hidden">
              <div className="relative">
                <img 
                  src={exhibition.image} 
                  alt={exhibition.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getAvailabilityColor(exhibition.availability)}>
                    {exhibition.availability}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/70 text-white">
                    ${exhibition.price}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{exhibition.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mb-2">
                      {exhibition.museum}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{exhibition.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {exhibition.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {exhibition.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                {/* Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{exhibition.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{exhibition.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Next available: {exhibition.nextAvailable}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2">
                  <Link to={`/chat?exhibition=${encodeURIComponent(exhibition.title)}`} className="flex-1">
                    <Button className="w-full btn-museum">
                      Book Now
                    </Button>
                  </Link>
                  <Button variant="outline" size="default">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredExhibitions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">No exhibitions found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or category filter
            </p>
            <Button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 text-center text-primary-foreground">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Can't Decide? Let Our AI Help!
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Chat with our intelligent assistant to find the perfect exhibition based on your interests
          </p>
          <Link to="/chat">
            <Button size="lg" className="btn-accent">
              <Users className="w-5 h-5 mr-2" />
              Get Personalized Recommendations
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Exhibitions;