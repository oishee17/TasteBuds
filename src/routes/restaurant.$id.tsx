import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Clock, MapPin, Minus, Plus, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { RatingBadge } from "@/components/Rating";
import { isOpen, restaurants } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/restaurant/$id")({
  loader: ({ params }) => {
    const r = restaurants.find((x) => x.id === params.id);
    if (!r) throw notFound();
    return { id: r.id, name: r.name, cuisines: r.cuisines.join(", ") };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Order online | Zomato Clone` },
          { name: "description", content: `${loaderData.name} serves ${loaderData.cuisines}. See menu, reviews and photos.` },
          { property: "og:title", content: `${loaderData.name} — Zomato Clone` },
          { property: "og:description", content: `${loaderData.cuisines} — menu, reviews and photos.` },
        ]
      : [{ title: "Restaurant unavailable" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="p-20 text-center">Restaurant not found. <Link to="/restaurants" search={{ q: "" }} className="text-primary">Browse all</Link></div>
  ),
  component: Detail,
});

const tabs = ["Overview", "Order Online", "Reviews", "Photos"] as const;
type Tab = (typeof tabs)[number];

function Detail() {
  const { id } = Route.useLoaderData();
  const r = restaurants.find((x) => x.id === id)!;
  const [tab, setTab] = useState<Tab>("Order Online");
  const open = isOpen(r);

  return (
    <div className="min-h-screen pb-24">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid h-64 gap-2 overflow-hidden rounded-2xl sm:h-96 sm:grid-cols-3 sm:grid-rows-2">
          <img src={r.gallery[0]} alt={r.name} className="h-full w-full object-cover sm:col-span-2 sm:row-span-2" />
          <img src={r.gallery[1]} alt="" className="hidden h-full w-full object-cover sm:block" />
          <img src={r.gallery[2]} alt="" className="hidden h-full w-full object-cover sm:block" />
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl">{r.name}</h1>
            <p className="mt-1 text-muted-foreground">{r.cuisines.join(", ")}</p>
            <p className="mt-1 flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" /> {r.address}</p>
            <p className="mt-2 flex items-center gap-2 text-sm">
              <span className={cn("font-semibold", open ? "text-rating-high" : "text-destructive")}>{open ? "Open now" : "Closed"}</span>
              <span className="text-muted-foreground">· {r.hours}</span>
              <span className="text-muted-foreground">· ₹{r.costForTwo} for two</span>
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2"><RatingBadge rating={r.rating} className="text-sm" /><div className="text-xs"><b>{r.votes.toLocaleString()}</b><br />Dining reviews</div></div>
            <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /><div className="text-xs"><b>{r.deliveryTime} min</b><br />Delivery time</div></div>
          </div>
        </div>

        <div className="mt-6 flex gap-6 overflow-x-auto border-b">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("whitespace-nowrap border-b-2 pb-3 text-lg transition", tab === t ? "border-primary font-semibold text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "Overview" && <Overview id={r.id} />}
          {tab === "Order Online" && <OrderOnline id={r.id} />}
          {tab === "Reviews" && <Reviews id={r.id} />}
          {tab === "Photos" && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[...r.gallery, ...r.gallery].map((g, i) => <img key={i} src={g} alt="" loading="lazy" className="aspect-square w-full rounded-xl object-cover card-hover" />)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const find = (id: string) => restaurants.find((x) => x.id === id)!;

function Overview({ id }: { id: string }) {
  const r = find(id);
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <h2 className="text-xl font-bold">About this place</h2>
        <p className="mt-2 text-muted-foreground">A {r.locality} favourite for {r.cuisines.join(", ").toLowerCase()}. Loved for its {r.menu.find((m) => m.bestseller)?.name}.</p>
        <h3 className="mt-6 font-semibold">Cuisines</h3>
        <div className="mt-2 flex flex-wrap gap-2">{r.cuisines.map((c) => <span key={c} className="rounded-full border px-3 py-1 text-sm text-primary">{c}</span>)}</div>
        <h3 className="mt-6 font-semibold">Average cost</h3>
        <p className="text-muted-foreground">₹{r.costForTwo} for two people (approx.)</p>
      </div>
      <div className="rounded-2xl border bg-card p-5 shadow-card">
        <h3 className="font-semibold">Call & directions</h3>
        <p className="mt-2 text-primary">+91 98300 {String(10000 + r.votes).slice(0, 5)}</p>
        <p className="mt-2 text-muted-foreground">{r.address}</p>
        <p className="mt-2 text-sm text-muted-foreground">Hours: {r.hours}</p>
      </div>
    </div>
  );
}

function OrderOnline({ id }: { id: string }) {
  const r = find(id);
  const { cart, add, remove } = useStore();
  const cats = ["Recommended", ...Array.from(new Set(r.menu.map((m) => m.category)))];
  const [cat, setCat] = useState(cats[0]);
  const items = cat === "Recommended" ? r.menu.filter((m) => m.bestseller) : r.menu.filter((m) => m.category === cat);
  const qty = (itemId: string) => cart.find((l) => l.item.id === itemId)?.qty ?? 0;

  return (
    <div className="grid gap-6 md:grid-cols-[200px_1fr]">
      <aside className="flex gap-2 overflow-x-auto md:sticky md:top-24 md:h-fit md:flex-col md:border-r md:pr-4">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={cn("whitespace-nowrap rounded-lg px-3 py-2 text-left transition", cat === c ? "bg-accent font-semibold text-accent-foreground" : "hover:bg-muted")}>
            {c} <span className="text-xs text-muted-foreground">({c === "Recommended" ? r.menu.filter((m) => m.bestseller).length : r.menu.filter((m) => m.category === c).length})</span>
          </button>
        ))}
      </aside>
      <div className="divide-y">
        {items.map((m) => {
          const n = qty(m.id);
          return (
            <div key={m.id} className="flex gap-4 py-5 first:pt-0">
              <img src={r.gallery[m.name.length % 3]} alt={m.name} loading="lazy" className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={cn("inline-block h-3.5 w-3.5 rounded-sm border-2", m.veg ? "border-rating-high" : "border-rating-low")} aria-label={m.veg ? "Veg" : "Non-veg"} />
                  {m.bestseller && <span className="rounded bg-accent px-1.5 text-[11px] font-bold text-accent-foreground">★ BESTSELLER</span>}
                </div>
                <h3 className="mt-1 text-lg font-semibold">{m.name}</h3>
                <p className="font-medium">₹{m.price}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
              </div>
              <div className="self-center">
                {n === 0 ? (
                  <button onClick={() => add(m, r.id, r.name)} className="rounded-lg border border-primary bg-secondary px-5 py-2 font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">Add</button>
                ) : (
                  <div className="flex items-center rounded-lg bg-primary text-primary-foreground">
                    <button aria-label={`Remove ${m.name}`} onClick={() => remove(m.id)} className="p-2"><Minus className="h-4 w-4" /></button>
                    <span className="w-6 text-center font-bold">{n}</span>
                    <button aria-label={`Add ${m.name}`} onClick={() => add(m, r.id, r.name)} className="p-2"><Plus className="h-4 w-4" /></button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Reviews({ id }: { id: string }) {
  const r = find(id);
  const { user, userReviews, addReview, setAuthMode } = useStore();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const all = [...(userReviews[id] ?? []), ...r.reviews];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) return setAuthMode("login");
    if (!rating || comment.trim().length < 3) return;
    addReview(id, { id: crypto.randomUUID(), user: user.name, rating, comment: comment.trim(), date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) });
    setRating(0); setComment("");
  };

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_340px]">
      <div className="space-y-5">
        {all.map((rv) => (
          <div key={rv.id} className="border-b pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">{rv.user[0]}</div>
              <div><p className="font-semibold">{rv.user}</p><p className="text-xs text-muted-foreground">{rv.date}</p></div>
            </div>
            <div className="mt-2"><RatingBadge rating={rv.rating} /></div>
            <p className="mt-2 text-muted-foreground">{rv.comment}</p>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="h-fit rounded-2xl border bg-card p-5 shadow-card md:sticky md:top-24">
        <h3 className="text-lg font-bold">Rate your experience</h3>
        <div className="mt-3 flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button type="button" key={s} aria-label={`${s} stars`} onClick={() => setRating(s)}>
              <Star className={cn("h-7 w-7 transition", s <= rating ? "fill-rating-mid text-rating-mid" : "text-muted-foreground")} />
            </button>
          ))}
        </div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} placeholder="Tell others what you liked…"
          className="mt-3 w-full rounded-lg border border-input bg-background p-3 outline-none focus:border-primary" />
        <button disabled={!!user && (!rating || comment.trim().length < 3)}
          className="mt-3 w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50">
          {user ? "Submit review" : "Log in to review"}
        </button>
      </form>
    </div>
  );
}
