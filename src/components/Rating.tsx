import { Star } from "lucide-react";
import { ratingTone } from "@/lib/data";
import { cn } from "@/lib/utils";

const tones = { high: "bg-rating-high", mid: "bg-rating-mid", low: "bg-rating-low" };

export function RatingBadge({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-bold text-on-dark", tones[ratingTone(rating)], className)}>
      {rating.toFixed(1)} <Star className="h-3 w-3 fill-current" />
    </span>
  );
}
