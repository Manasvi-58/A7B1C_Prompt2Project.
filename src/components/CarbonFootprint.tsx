import { Leaf, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CarbonFootprintProps {
  fastFashionCO2: number;
  sustainableCO2: number;
  className?: string;
}

export const CarbonFootprint = ({ fastFashionCO2, sustainableCO2, className }: CarbonFootprintProps) => {
  const savings = fastFashionCO2 - sustainableCO2;
  const savingsPercentage = Math.round((savings / fastFashionCO2) * 100);

  return (
    <Card className={cn("p-6 border-eco/20 bg-gradient-to-br from-eco/5 to-success/5", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-eco/20">
          <Leaf className="w-5 h-5 text-eco" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Carbon Footprint Impact</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 rounded-lg bg-destructive/5 border border-destructive/10">
          <span className="text-sm text-foreground">Fast Fashion Option</span>
          <span className="font-semibold text-destructive">{fastFashionCO2}kg CO₂</span>
        </div>
        
        <div className="flex justify-between items-center p-3 rounded-lg bg-success/5 border border-success/10">
          <span className="text-sm text-foreground">Sustainable Option</span>
          <span className="font-semibold text-success">{sustainableCO2}kg CO₂</span>
        </div>
        
        <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-eco">
          <TrendingDown className="w-5 h-5 text-white" />
          <div className="text-white">
            <span className="text-sm">You save </span>
            <span className="font-bold">{savings}kg CO₂</span>
            <span className="text-sm"> ({savingsPercentage}% reduction)</span>
          </div>
        </div>
      </div>
    </Card>
  );
};