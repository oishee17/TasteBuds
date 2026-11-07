import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { MenuItem, Review } from "./data";

export type CartLine = { item: MenuItem; qty: number; restaurantId: string; restaurantName: string };
type User = { name: string; email: string };

type Store = {
  cart: CartLine[];
  add: (item: MenuItem, restaurantId: string, restaurantName: string) => void;
  remove: (itemId: string) => void;
  clear: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  authMode: "login" | "signup" | null;
  setAuthMode: (m: "login" | "signup" | null) => void;
  userReviews: Record<string, Review[]>;
  addReview: (restaurantId: string, r: Review) => void;
};

const Ctx = createContext<Store | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userReviews, setUserReviews] = useState<Record<string, Review[]>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCart(load("zc-cart", []));
    setUser(load("zc-user", null));
    setUserReviews(load("zc-reviews", {}));
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("zc-cart", JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { if (ready) localStorage.setItem("zc-user", JSON.stringify(user)); }, [user, ready]);
  useEffect(() => { if (ready) localStorage.setItem("zc-reviews", JSON.stringify(userReviews)); }, [userReviews, ready]);

  const add: Store["add"] = (item, restaurantId, restaurantName) =>
    setCart((c) => {
      const base = c[0] && c[0].restaurantId !== restaurantId ? [] : c;
      const found = base.find((l) => l.item.id === item.id);
      if (found) return base.map((l) => (l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l));
      return [...base, { item, qty: 1, restaurantId, restaurantName }];
    });
  const remove: Store["remove"] = (id) =>
    setCart((c) => c.flatMap((l) => (l.item.id === id ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l])));

  return (
    <Ctx.Provider
      value={{
        cart, add, remove, clear: () => setCart([]), cartOpen, setCartOpen, user, setUser, authMode, setAuthMode,
        userReviews,
        addReview: (rid, r) => setUserReviews((m) => ({ ...m, [rid]: [r, ...(m[rid] ?? [])] })),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}
