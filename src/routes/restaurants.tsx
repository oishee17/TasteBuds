import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { RestaurantCard } from "@/components/RestaurantCard";
import { allCuisines, filterRestaurants, restaurants } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/restaurants")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s["q"] === "string" ? s["q"] : "" }),
  head: () => ({
    meta: [
      { title: "Restaurants near you — Zomato Clone" },
      { name: "description", content: "Browse and filter restaurants by rating, safety, delivery time, offers and cuisine." },
      { property: "og:title", content: "Restaurants near you — Zomato Clone" },
      { property: "og:description", content: "Browse and filter restaurants by rating, safety, delivery time, offers and cuisine." },
    ],
  }),
  component: Listing,
});

function Listing() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/restaurants" });
  const [rating4, setRating4] = useState(false);
  const [safety, setSafety] = useState(false);
  const [fast, setFast] = useState(false);
  const [offers, setOffers] = useState(false);
  const [cuisines, setCuisines] = useState<string[]>([]);

  const list = useMemo(
    () => filterRestaurants(restaurants, { q, rating4, safety, fast, offers, cuisines }),
    [q, rating4, safety, fast, offers, cuisines],
  );
  const toggleCuisine = (c: string) => setCuisines((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));
  const chips: Array<[string, boolean, (v: boolean) => void]> = [
    ["Rating 4.0+", rating4, setRating4], ["Max Safety", safety, setSafety],
    ["Fast Delivery", fast, setFast], ["Offers", offers, setOffers],
  ];
  const anyFilter = rating4 || safety || fast || offers || cuisines.length > 0;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <label className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-card focus-within:border-primary">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => navigate({ search: { q: e.target.value }, replace: true })}
            placeholder="Search for restaurant, cuisine or a dish" className="w-full bg-transparent outline-none" />
          {q && <button aria-label="Clear search" onClick={() => navigate({ search: { q: "" } })}><X className="h-4 w-4" /></button>}
        </label>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm text-muted-foreground"><SlidersHorizontal className="h-4 w-4" /> Filters</span>
          {chips.map(([label, on, set]) => (
            <Chip key={label} on={on} onClick={() => set(!on)}>{label}</Chip>
          ))}
          {anyFilter && (
            <button onClick={() => { setRating4(false); setSafety(false); setFast(false); setOffers(false); setCuisines([]); }}
              className="text-sm font-semibold text-primary">Clear all</button>
          )}
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {allCuisines.map((c) => <Chip key={c} on={cuisines.includes(c)} onClick={() => toggleCuisine(c)}>{c}</Chip>)}
        </div>

        <h1 className="mt-6 text-2xl font-bold sm:text-3xl">
          {q ? <>Results for “{q}”</> : "Delivery restaurants in Kolkata"}
          <span className="ml-2 text-base font-normal text-muted-foreground">{list.length} places</span>
        </h1>
        {list.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No restaurants match. Try a different search or fewer filters.</p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((r) => <RestaurantCard key={r.id} r={r} />)}
          </div>
        )}
      </main>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={on}
      className={cn("shrink-0 whitespace-nowrap rounded-lg border px-3 py-1.5 text-sm transition",
        on ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary")}>
      {children}
    </button>
  );
}
