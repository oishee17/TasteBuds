import { Link } from "@tanstack/react-router";
import { Clock, ShieldCheck } from "lucide-react";
import type { Restaurant } from "@/lib/data";
import { RatingBadge } from "./Rating";

export function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <Link to="/restaurant/$id" params={{ id: r.id }} className="group block rounded-2xl bg-card p-2.5 card-hover">
      <div className="relative overflow-hidden rounded-xl">
        <img src={r.image} alt={r.name} loading="lazy" width={944} height={704}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-card-overlay" />
        {r.offer && (
          <span className="absolute bottom-3 left-0 rounded-r-md bg-offer px-2.5 py-1 text-xs font-bold text-on-dark">{r.offer}</span>
        )}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-card px-2 py-0.5 text-xs font-semibold">
          <Clock className="h-3 w-3" /> {r.deliveryTime} min
        </span>
        {r.safety && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-card/90 px-2 py-0.5 text-[11px] font-semibold text-rating-high">
            <ShieldCheck className="h-3 w-3" /> Max Safety
          </span>
        )}
      </div>
      <div className="px-1.5 pb-1 pt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-lg font-semibold">{r.name}</h3>
          <RatingBadge rating={r.rating} />
        </div>
        <div className="mt-1 flex justify-between gap-2 text-sm text-muted-foreground">
          <span className="truncate">{r.cuisines.join(", ")}</span>
          <span className="shrink-0">₹{r.costForTwo} for two</span>
        </div>
      </div>
    </Link>
  );
}
