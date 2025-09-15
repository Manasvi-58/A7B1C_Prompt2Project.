import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface EcoRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const EcoRating = ({ rating, size = "md", showLabel = true, className }: EcoRatingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 3.5) return "Very Good";
    if (rating >= 2.5) return "Good";
    if (rating >= 1.5) return "Fair";
    return "Poor";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-success";
    if (rating >= 3) return "text-eco";
    if (rating >= 2) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizeClasses[size],
              star <= rating
                ? cn("fill-current", getRatingColor(rating))
                : "text-muted-foreground/30",
              "transition-smooth"
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className={cn("text-sm font-medium", getRatingColor(rating))}>
          {getRatingLabel(rating)}
        </span>
      )}
    </div>
  );
};