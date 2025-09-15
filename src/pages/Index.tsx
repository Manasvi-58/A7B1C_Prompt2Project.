import { useState } from "react";
import { Leaf, Search, Users, TrendingDown, Heart } from "lucide-react";
import { UrlAnalyzer } from "@/components/UrlAnalyzer";
import { SustainableAlternative } from "@/components/SustainableAlternative";
import { CarbonFootprint } from "@/components/CarbonFootprint";
import { CommunitySection } from "@/components/CommunitySection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-image.jpg";

interface AnalyzedItem {
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  style: string;
  color: string;
  material: string;
  co2Footprint: number;
}

const mockAlternatives = [
  {
    id: "1",
    name: "Organic Cotton Basic Tee",
    brand: "FabIndia",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    ecoRating: 4.5,
    categories: ["Organic", "Local", "Fair Trade"],
    location: "Mumbai, India",
    isLocal: true,
    url: "#"
  },
  {
    id: "2",
    name: "Sustainable Hemp T-Shirt",
    brand: "Doodlage",
    price: 1200,
    originalPrice: 1500,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    ecoRating: 4.8,
    categories: ["Hemp", "Upcycled", "Zero Waste"],
    location: "Gurgaon, India", 
    isLocal: true,
    url: "#"
  },
  {
    id: "3",
    name: "Vintage Cotton Tee - Thrifted",
    brand: "Thrift Store Find",
    price: 350,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1583743814966-8936f37f179b?w=400&h=400&fit=crop",
    ecoRating: 5.0,
    categories: ["Thrift", "Vintage", "Pre-loved"],
    location: "Sarojini Nagar, Delhi",
    isLocal: true,
    url: "#"
  }
];

const Index = () => {
  const [analyzedItem, setAnalyzedItem] = useState<AnalyzedItem | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleAnalysisComplete = (item: AnalyzedItem) => {
    setAnalyzedItem(item);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-eco">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Green Threads</h1>
                <p className="text-sm text-muted-foreground">Sustainable Fashion Alternative</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Community
              </Button>
              <Button size="sm" className="bg-gradient-eco hover:opacity-90">
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!showResults && (
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-eco/10 via-background to-success/5" />
          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-eco/20 text-eco border-eco/30">
                    <Leaf className="w-3 h-3 mr-1" />
                    Making Fashion Sustainable
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                    Find Eco-Friendly
                    <span className="bg-gradient-eco bg-clip-text text-transparent"> Alternatives </span>
                    to Fast Fashion
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-lg">
                    Paste any clothing item URL and discover sustainable, affordable alternatives that are better for you and the planet.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-success" />
                    <span className="text-sm font-medium">Reduce CO₂ Impact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-eco" />
                    <span className="text-sm font-medium">Support Local Brands</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-nature-blue" />
                    <span className="text-sm font-medium">Join Community</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Sustainable fashion with natural elements"
                  className="rounded-2xl shadow-eco w-full max-w-md mx-auto"
                />
                <div className="absolute -bottom-4 -right-4 p-4 bg-card rounded-xl shadow-soft border border-border/50 backdrop-blur-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">75%</p>
                    <p className="text-sm text-muted-foreground">Less CO₂ Impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        <UrlAnalyzer onAnalysisComplete={handleAnalysisComplete} />
        
        {showResults && analyzedItem && (
          <div className="space-y-8">
            {/* Analyzed Item Display */}
            <Card className="p-6 border-warning/20 bg-gradient-to-br from-warning/5 to-destructive/5">
              <div className="flex items-start gap-4">
                <img 
                  src={analyzedItem.image}
                  alt={analyzedItem.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{analyzedItem.name}</h3>
                  <p className="text-muted-foreground">{analyzedItem.brand}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xl font-bold">₹{analyzedItem.price.toLocaleString()}</span>
                    <Badge variant="outline">{analyzedItem.category}</Badge>
                    <Badge variant="outline">{analyzedItem.material}</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Carbon Footprint Comparison */}
            <CarbonFootprint 
              fastFashionCO2={analyzedItem.co2Footprint}
              sustainableCO2={5}
            />

            {/* Sustainable Alternatives */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-success/20">
                  <Search className="w-5 h-5 text-success" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">Sustainable Alternatives</h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockAlternatives.map((alternative) => (
                  <SustainableAlternative key={alternative.id} {...alternative} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Community Section */}
        <CommunitySection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-2">
            <Leaf className="w-5 h-5 text-eco" />
            <span className="text-sm text-muted-foreground">
              Making fashion sustainable, one choice at a time.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
