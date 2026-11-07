import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, MapPin, Search } from "lucide-react";
import { Navbar, Logo } from "@/components/Navbar";
import { RestaurantCard } from "@/components/RestaurantCard";
import { cities, images, localities, restaurants } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zomato Clone — Discover the best food & drinks" },
      { name: "description", content: "Search restaurants, cuisines and dishes. Order online, explore dining and nightlife." },
      { property: "og:title", content: "Zomato Clone — Discover the best food & drinks" },
      { property: "og:description", content: "Search restaurants, cuisines and dishes. Order online, explore dining and nightlife." },
    ],
  }),
  component: Index,
});

const features = [
  { title: "Order Online", text: "Stay home and order to your doorstep", img: images.burger },
  { title: "Dining", text: "View the city's favourite dining venues", img: images.hero },
  { title: "Nightlife", text: "Explore the city's top nightlife outlets", img: images.sushi },
];

function Index() {
  const navigate = useNavigate();
  const [city, setCity] = useState("Kolkata");
  const [q, setQ] = useState("");
  const go = (query = q) => navigate({ to: "/restaurants", search: { q: query } });

  return (
    <div>
      <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden">
        <img src={images.hero} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <Navbar transparent />
        <div className="relative z-10 w-full max-w-3xl px-4 text-center text-on-dark">
          <Logo className="text-6xl sm:text-8xl" />
          <p className="mt-3 text-2xl font-medium sm:text-4xl">Discover the best food & drinks in {city}</p>
          <form onSubmit={(e) => { e.preventDefault(); go(); }}
            className="mx-auto mt-8 flex flex-col overflow-hidden rounded-xl bg-card text-foreground shadow-lift sm:flex-row">
            <label className="flex items-center gap-2 border-b px-4 py-3 sm:w-56 sm:border-b-0 sm:border-r">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              <select aria-label="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent outline-none">
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label className="flex flex-1 items-center gap-2 px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for restaurant, cuisine or a dish"
                className="w-full bg-transparent outline-none" />
            </label>
          </form>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <Link key={f.title} to="/restaurants" search={{ q: "" }} className="overflow-hidden rounded-2xl border bg-card card-hover">
              <img src={f.img} alt={f.title} loading="lazy" width={944} height={704} className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">Popular localities in and around <span className="text-primary">{city}</span></h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {localities.map((l) => (
              <button key={l.name} onClick={() => go(l.name)}
                className="flex items-center justify-between rounded-xl border bg-card px-4 py-4 text-left shadow-card transition hover:border-primary">
                <div>
                  <p className="font-semibold">{l.name}</p>
                  <p className="text-sm text-muted-foreground">{l.count} places</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold">Trending this week</h2>
            <Link to="/restaurants" search={{ q: "" }} className="font-semibold text-primary">See all</Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 4).map((r) => <RestaurantCard key={r.id} r={r} />)}
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center">
          <Logo />
          <p className="text-sm text-muted-foreground">A demo food discovery experience. © 2026</p>
        </div>
      </footer>
    </div>
  );
}
