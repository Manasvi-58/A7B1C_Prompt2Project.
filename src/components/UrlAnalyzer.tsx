import { useState } from "react";
import { Search, Loader2, Leaf, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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

interface UrlAnalyzerProps {
  onAnalysisComplete: (item: AnalyzedItem) => void;
  className?: string;
}

export const UrlAnalyzer = ({ onAnalysisComplete, className }: UrlAnalyzerProps) => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a clothing item URL to analyze",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis result
    const mockAnalysis: AnalyzedItem = {
      name: "Casual Cotton T-Shirt",
      brand: "H&M",
      price: 799,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "T-Shirt",
      style: "Casual",
      color: "White",
      material: "Cotton Blend",
      co2Footprint: 20
    };
    
    onAnalysisComplete(mockAnalysis);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete!",
      description: "Found sustainable alternatives for your item",
    });
  };

  return (
    <Card className={cn("p-6 border-eco/20 bg-gradient-to-br from-eco/5 to-primary/5", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-eco/20">
          <Leaf className="w-5 h-5 text-eco" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Analyze Clothing Item</h2>
          <p className="text-sm text-muted-foreground">
            Paste a URL from any fashion retailer to find sustainable alternatives
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              type="url"
              placeholder="https://www.zara.com/... or https://www2.hm.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pr-10 border-eco/30 focus:border-eco focus:ring-eco/20"
              disabled={isAnalyzing}
            />
            <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <Button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-eco hover:opacity-90 transition-opacity min-w-[100px]"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Analyze
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            Supported: Zara, H&M, Forever21, Shein, Myntra & more
          </Badge>
        </div>

        {isAnalyzing && (
          <div className="p-4 rounded-lg bg-eco/5 border border-eco/20">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-eco" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Analyzing your item...</p>
                <p className="text-xs text-muted-foreground">
                  Our AI is identifying style, material, and finding eco-friendly alternatives
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};