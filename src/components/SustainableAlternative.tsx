import { ExternalLink, MapPin, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EcoRating } from "./EcoRating";
import { cn } from "@/lib/utils";

interface SustainableAlternativeProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  ecoRating: number;
  categories: string[];
  location?: string;
  isLocal?: boolean;
  url: string;
  className?: string;
}

export const SustainableAlternative = ({
  id,
  name,
  brand,
  price,
  originalPrice,
  image,
  ecoRating,
  categories,
  location,
  isLocal,
  url,
  className
}: SustainableAlternativeProps) => {
  const savings = originalPrice ? originalPrice - price : 0;
  const savingsPercentage = originalPrice ? Math.round((savings / originalPrice) * 100) : 0;

  return (
    <Card className={cn(
      "group overflow-hidden border-border/50 hover:border-eco/50 transition-all duration-300 hover:shadow-eco",
      className
    )}>
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          {isLocal && (
            <Badge variant="secondary" className="bg-success/90 text-success-foreground backdrop-blur-sm">
              <MapPin className="w-3 h-3 mr-1" />
              Local
            </Badge>
          )}
          {savings > 0 && (
            <Badge variant="secondary" className="bg-eco/90 text-white backdrop-blur-sm">
              Save ₹{savings}
            </Badge>
          )}
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{brand}</p>
          <h3 className="font-semibold text-foreground line-clamp-2">{name}</h3>
        </div>
        
        <EcoRating rating={ecoRating} size="sm" />
        
        <div className="flex flex-wrap gap-1">
          {categories.slice(0, 3).map((category) => (
            <Badge key={category} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">₹{price.toLocaleString()}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {savingsPercentage > 0 && (
              <p className="text-sm text-success font-medium">
                {savingsPercentage}% cheaper
              </p>
            )}
            {location && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </p>
            )}
          </div>
          
          <Button 
            size="sm" 
            className="bg-gradient-eco hover:opacity-90 transition-opacity"
            asChild
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-1" />
              View
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};