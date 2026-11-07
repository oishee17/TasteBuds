import { useState } from "react";
import { CheckCircle2, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { DELIVERY_FEE, TAX_RATE } from "@/lib/data";
import { useStore } from "@/lib/store";

export function cartTotals(subtotal: number) {
  const taxes = Math.round(subtotal * TAX_RATE);
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  return { subtotal, taxes, delivery, total: subtotal + taxes + delivery };
}

export function CartDrawer() {
  const { cart, add, remove, clear, cartOpen, setCartOpen, user, setAuthMode } = useStore();
  const [success, setSuccess] = useState<null | { total: number; name: string }>(null);
  const count = cart.reduce((s, l) => s + l.qty, 0);
  const t = cartTotals(cart.reduce((s, l) => s + l.qty * l.item.price, 0));

  const place = () => {
    if (!user) return setAuthMode("login");
    setSuccess({ total: t.total, name: cart[0]?.restaurantName ?? "" });
    clear(); setCartOpen(false);
  };

  return (
    <>
      {count > 0 && !cartOpen && (
        <button onClick={() => setCartOpen(true)}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3.5 font-semibold text-primary-foreground shadow-lift transition hover:scale-105 animate-in slide-in-from-bottom-4">
          <ShoppingBag className="h-5 w-5" /> {count} item{count > 1 ? "s" : ""} · ₹{t.subtotal}
        </button>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-overlay/50 animate-in fade-in" onClick={() => setCartOpen(false)}>
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-lift animate-in slide-in-from-right" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-xl font-bold">Your cart</h2>
                {cart[0] && <p className="text-sm text-muted-foreground">from {cart[0].restaurantName}</p>}
              </div>
              <button aria-label="Close cart" onClick={() => setCartOpen(false)} className="rounded-full p-1 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {cart.length === 0 && <p className="py-16 text-center text-muted-foreground">Your cart is empty</p>}
              {cart.map((l) => (
                <div key={l.item.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{l.item.name}</p>
                    <p className="text-sm text-muted-foreground">₹{l.item.price} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-primary text-primary">
                      <button aria-label="Decrease" onClick={() => remove(l.item.id)} className="p-1.5"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-6 text-center text-sm font-bold">{l.qty}</span>
                      <button aria-label="Increase" onClick={() => add(l.item, l.restaurantId, l.restaurantName)} className="p-1.5"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <span className="w-16 text-right font-semibold">₹{l.qty * l.item.price}</span>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="space-y-2 border-t p-5 text-sm">
                <Row label="Item total" v={t.subtotal} />
                <Row label="Taxes (5% GST)" v={t.taxes} />
                <Row label="Delivery fee" v={t.delivery} />
                <div className="flex justify-between border-t pt-3 text-base font-bold"><span>To pay</span><span>₹{t.total}</span></div>
                <button onClick={place} className="mt-3 w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition hover:bg-primary/90">
                  {user ? `Place Order · ₹${t.total}` : "Log in to place order"}
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/60 p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-card p-8 text-center shadow-lift animate-in zoom-in-90">
            <CheckCircle2 className="mx-auto h-16 w-16 text-rating-high" />
            <h2 className="mt-4 text-2xl font-bold">Order placed!</h2>
            <p className="mt-2 text-muted-foreground">
              {success.name} is preparing your food. ₹{success.total} paid. Arriving in about 30 minutes.
            </p>
            <button onClick={() => setSuccess(null)} className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground">Done</button>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, v }: { label: string; v: number }) {
  return <div className="flex justify-between text-muted-foreground"><span>{label}</span><span>₹{v}</span></div>;
}
