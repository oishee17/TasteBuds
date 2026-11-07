import { describe, expect, it } from "vitest";
import { filterRestaurants, restaurants } from "@/lib/data";
import { cartTotals } from "@/components/CartDrawer";

const base = { q: "", rating4: false, safety: false, fast: false, offers: false, cuisines: [] as string[] };

describe("restaurant filters", () => {
  it("Rating 4.0+ keeps only 4.0 and above", () => {
    expect(filterRestaurants(restaurants, { ...base, rating4: true }).every((r) => r.rating >= 4)).toBe(true);
  });
  it("search matches dish names", () => {
    expect(filterRestaurants(restaurants, { ...base, q: "dosa" }).map((r) => r.id)).toContain("dosa-junction");
  });
});

describe("cart totals", () => {
  it("adds 5% tax and ₹40 delivery", () => {
    expect(cartTotals(1000)).toEqual({ subtotal: 1000, taxes: 50, delivery: 40, total: 1090 });
  });
});
