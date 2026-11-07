import biryani from "@/assets/food-biryani.jpg";
import pizza from "@/assets/food-pizza.jpg";
import burger from "@/assets/food-burger.jpg";
import momos from "@/assets/food-momos.jpg";
import dosa from "@/assets/food-dosa.jpg";
import sushi from "@/assets/food-sushi.jpg";
import dessert from "@/assets/food-dessert.jpg";
import hero from "@/assets/hero.jpg";

export const images = { biryani, pizza, burger, momos, dosa, sushi, dessert, hero };

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  veg: boolean;
  category: string;
  bestseller?: boolean;
};

export type Review = {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  votes: number;
  costForTwo: number;
  deliveryTime: number;
  offer?: string | undefined;
  locality: string;
  address: string;
  hours: string;
  openHour: number;
  closeHour: number;
  safety: boolean;
  image: string;
  gallery: string[];
  menu: MenuItem[];
  reviews: Review[];
};

export const cities = ["Kolkata", "Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Pune"];

export const localities = [
  { name: "Park Street", count: 342 },
  { name: "Salt Lake", count: 418 },
  { name: "Ballygunge", count: 276 },
  { name: "New Town", count: 389 },
  { name: "Gariahat", count: 198 },
  { name: "Camac Street", count: 154 },
  { name: "Esplanade", count: 231 },
  { name: "Howrah", count: 167 },
];

export const allCuisines = [
  "North Indian", "Biryani", "Mughlai", "Pizza", "Italian", "Burger", "Fast Food",
  "Chinese", "Tibetan", "Momos", "South Indian", "Japanese", "Sushi", "Desserts", "Cafe", "Bengali",
];

type MenuTemplate = Record<string, Array<[string, number, string, boolean]>>;

const menus: Record<string, MenuTemplate> = {
  indian: {
    Starters: [
      ["Chicken Tikka", 340, "Smoky tandoor-roasted chicken in yogurt marinade", false],
      ["Paneer Tikka", 290, "Charred cottage cheese with peppers and onions", true],
      ["Galouti Kebab", 380, "Melt-in-mouth minced mutton patties on ulte tawa paratha", false],
    ],
    Mains: [
      ["Butter Chicken", 420, "Tandoori chicken simmered in velvety tomato makhani", false],
      ["Dal Makhani", 290, "Black lentils slow-cooked overnight with butter", true],
      ["Hyderabadi Chicken Biryani", 380, "Dum-cooked basmati with saffron and fried onions", false],
      ["Mutton Rogan Josh", 480, "Kashmiri-style mutton in aromatic red gravy", false],
      ["Butter Naan", 70, "Soft leavened bread brushed with butter", true],
    ],
    Desserts: [
      ["Gulab Jamun (2 pcs)", 120, "Warm milk dumplings in rose syrup", true],
      ["Phirni", 140, "Chilled rice pudding with pistachios", true],
    ],
  },
  pizza: {
    Starters: [
      ["Garlic Bread with Cheese", 190, "Toasted baguette, garlic butter, mozzarella", true],
      ["Bruschetta", 220, "Tomato, basil and olive oil on sourdough", true],
      ["Chicken Wings", 320, "Spicy peri-peri glazed wings", false],
    ],
    Mains: [
      ["Margherita", 349, "San Marzano tomato, fior di latte, basil", true],
      ["Pepperoni", 499, "Classic pepperoni with mozzarella", false],
      ["Farmhouse", 429, "Mushroom, capsicum, onion, sweet corn", true],
      ["Penne Arrabbiata", 360, "Spicy tomato sauce with chilli flakes", true],
    ],
    Desserts: [
      ["Tiramisu", 280, "Espresso-soaked ladyfingers, mascarpone", true],
      ["Choco Lava Cake", 160, "Molten chocolate centre", true],
    ],
  },
  burger: {
    Starters: [
      ["Peri Peri Fries", 160, "Crispy fries tossed in peri peri", true],
      ["Onion Rings", 150, "Beer-battered onion rings", true],
      ["Chicken Nuggets", 210, "Golden crumbed nuggets with dip", false],
    ],
    Mains: [
      ["Classic Smash Burger", 299, "Double smashed patty, cheddar, house sauce", false],
      ["Crispy Chicken Burger", 249, "Buttermilk fried chicken, slaw, pickles", false],
      ["Veggie Supreme Burger", 199, "Crunchy veg patty, lettuce, tomato", true],
      ["BBQ Bacon Burger", 359, "Smoky BBQ, bacon, caramelised onions", false],
    ],
    Desserts: [
      ["Oreo Shake", 189, "Thick shake blended with Oreo", true],
      ["Brownie Sundae", 220, "Fudge brownie with vanilla ice cream", true],
    ],
  },
  chinese: {
    Starters: [
      ["Steamed Chicken Momos", 180, "Juicy chicken dumplings with fiery chutney", false],
      ["Veg Pan Fried Momos", 160, "Crisp-bottomed veggie dumplings", true],
      ["Chilli Chicken Dry", 280, "Wok-tossed chicken with peppers and soy", false],
    ],
    Mains: [
      ["Hakka Noodles", 220, "Stir-fried noodles with vegetables", true],
      ["Thukpa", 240, "Tibetan noodle soup with chicken", false],
      ["Schezwan Fried Rice", 230, "Spicy wok-fried rice", true],
      ["Chicken Manchurian Gravy", 290, "Crispy chicken balls in tangy sauce", false],
    ],
    Desserts: [
      ["Date Pancake", 180, "Crisp pancake filled with dates, with ice cream", true],
      ["Honey Noodles", 170, "Crispy noodles drizzled with honey and sesame", true],
    ],
  },
  south: {
    Starters: [
      ["Medu Vada (2 pcs)", 110, "Crisp lentil fritters with sambar", true],
      ["Idli (3 pcs)", 99, "Steamed rice cakes, chutneys and sambar", true],
      ["Chicken 65", 260, "Spicy fried chicken, curry leaves", false],
    ],
    Mains: [
      ["Masala Dosa", 150, "Crisp crepe with spiced potato filling", true],
      ["Mysore Masala Dosa", 170, "With fiery red chutney spread", true],
      ["Ghee Roast Dosa", 180, "Paper-thin dosa roasted in pure ghee", true],
      ["Chettinad Chicken Curry", 340, "Peppery Tamil-style chicken curry", false],
    ],
    Desserts: [
      ["Filter Coffee", 80, "Strong decoction with frothy milk", true],
      ["Rava Kesari", 110, "Saffron semolina sweet with cashews", true],
    ],
  },
  japanese: {
    Starters: [
      ["Edamame", 260, "Steamed soybeans with sea salt", true],
      ["Chicken Gyoza", 380, "Pan-seared dumplings, ponzu", false],
      ["Prawn Tempura", 520, "Light crisp tempura with dipping sauce", false],
    ],
    Mains: [
      ["Salmon Nigiri (2 pcs)", 590, "Fresh Norwegian salmon on seasoned rice", false],
      ["California Roll", 520, "Crab, avocado, cucumber, tobiko", false],
      ["Avocado Maki", 420, "Simple and fresh avocado roll", true],
      ["Chicken Ramen", 560, "Rich broth, chashu chicken, ajitama egg", false],
    ],
    Desserts: [
      ["Matcha Ice Cream", 290, "Ceremonial grade matcha", true],
      ["Mochi (3 pcs)", 340, "Assorted flavours", true],
    ],
  },
  dessert: {
    Starters: [
      ["Cappuccino", 180, "Double shot espresso with steamed milk", true],
      ["Cold Brew", 210, "18-hour steeped single origin", true],
      ["Croissant", 160, "Buttery, flaky French classic", true],
    ],
    Mains: [
      ["Chicken Club Sandwich", 320, "Triple-decker with egg and bacon", false],
      ["Pesto Pasta", 340, "Basil pesto, parmesan, pine nuts", true],
      ["Avocado Toast", 290, "Sourdough, smashed avocado, chilli flakes", true],
    ],
    Desserts: [
      ["Chocolate Lava Cake", 240, "Molten centre with vanilla ice cream", true],
      ["Blueberry Cheesecake", 280, "New York style baked cheesecake", true],
      ["Tiramisu Jar", 260, "Classic Italian layered dessert", true],
      ["Mishti Doi", 90, "Bengali sweet caramelised yogurt", true],
    ],
  },
};

const reviewPool: Array<[string, number, string]> = [
  ["Ananya Sen", 5, "Absolutely loved it! Portions were generous and everything arrived piping hot."],
  ["Rohit Mehra", 4, "Great taste and quick delivery. Packaging could be slightly better."],
  ["Priya Das", 5, "One of my go-to places now. The bestsellers truly live up to the hype."],
  ["Arjun Kapoor", 3, "Food was decent but a little too salty for my liking this time."],
  ["Sneha Iyer", 4, "Lovely ambience when dining in. Staff were attentive and friendly."],
  ["Kabir Khan", 5, "Authentic flavours, reminds me of home. Will definitely order again!"],
  ["Meera Nair", 4, "Good value for money. Desserts were the highlight for us."],
  ["Vikram Roy", 2, "Delivery was delayed by 30 minutes, though the food itself was okay."],
];

type Seed = {
  name: string; cuisines: string[]; menu: keyof typeof menus; img: string; gallery: string[];
  rating: number; votes: number; cost: number; time: number; offer?: string; locality: string;
  open: number; close: number; safety: boolean;
};

const seeds: Seed[] = [
  { name: "Arsalan", cuisines: ["Biryani", "Mughlai", "North Indian"], menu: "indian", img: biryani, gallery: [biryani, hero, dessert], rating: 4.4, votes: 12400, cost: 800, time: 32, offer: "50% OFF up to ₹100", locality: "Park Street", open: 11, close: 23, safety: true },
  { name: "Peter Cat", cuisines: ["North Indian", "Continental"], menu: "indian", img: hero, gallery: [hero, biryani, dessert], rating: 4.6, votes: 9800, cost: 1400, time: 40, locality: "Park Street", open: 11, close: 23, safety: true },
  { name: "Fire & Ice Pizzeria", cuisines: ["Pizza", "Italian"], menu: "pizza", img: pizza, gallery: [pizza, dessert, burger], rating: 4.3, votes: 5600, cost: 1200, time: 35, offer: "Flat ₹125 OFF", locality: "Camac Street", open: 12, close: 23, safety: true },
  { name: "Burger Barn", cuisines: ["Burger", "Fast Food"], menu: "burger", img: burger, gallery: [burger, pizza, dessert], rating: 3.8, votes: 3200, cost: 500, time: 22, offer: "Buy 1 Get 1", locality: "Salt Lake", open: 10, close: 24, safety: false },
  { name: "Momo I Am", cuisines: ["Tibetan", "Momos", "Chinese"], menu: "chinese", img: momos, gallery: [momos, hero, biryani], rating: 4.1, votes: 4100, cost: 400, time: 25, offer: "20% OFF", locality: "Gariahat", open: 12, close: 22, safety: true },
  { name: "Dosa Junction", cuisines: ["South Indian"], menu: "south", img: dosa, gallery: [dosa, hero, dessert], rating: 4.2, votes: 2800, cost: 350, time: 20, locality: "Ballygunge", open: 7, close: 22, safety: true },
  { name: "Sushi Kyo", cuisines: ["Japanese", "Sushi"], menu: "japanese", img: sushi, gallery: [sushi, momos, dessert], rating: 4.7, votes: 1900, cost: 2200, time: 45, offer: "15% OFF on ₹999", locality: "New Town", open: 12, close: 23, safety: true },
  { name: "The Sugar Café", cuisines: ["Cafe", "Desserts"], menu: "dessert", img: dessert, gallery: [dessert, pizza, burger], rating: 4.5, votes: 6700, cost: 700, time: 28, locality: "Salt Lake", open: 9, close: 23, safety: true },
  { name: "Royal Indian Hotel", cuisines: ["Mughlai", "Biryani"], menu: "indian", img: biryani, gallery: [biryani, hero, momos], rating: 3.6, votes: 7400, cost: 600, time: 38, offer: "Free delivery", locality: "Esplanade", open: 8, close: 23, safety: false },
  { name: "Wow! Momo Express", cuisines: ["Momos", "Chinese", "Fast Food"], menu: "chinese", img: momos, gallery: [momos, burger, dosa], rating: 3.9, votes: 15000, cost: 300, time: 18, offer: "40% OFF up to ₹80", locality: "Howrah", open: 11, close: 23, safety: true },
  { name: "Napoli Wood Fire", cuisines: ["Pizza", "Italian", "Desserts"], menu: "pizza", img: pizza, gallery: [pizza, dessert, hero], rating: 4.0, votes: 2300, cost: 1000, time: 30, locality: "New Town", open: 12, close: 24, safety: true },
  { name: "Smoky Grill House", cuisines: ["Burger", "American"], menu: "burger", img: burger, gallery: [burger, hero, pizza], rating: 4.2, votes: 3900, cost: 900, time: 27, offer: "₹100 OFF above ₹499", locality: "Ballygunge", open: 12, close: 2, safety: true },
  { name: "Banana Leaf", cuisines: ["South Indian", "Chettinad"], menu: "south", img: dosa, gallery: [dosa, biryani, dessert], rating: 4.4, votes: 2100, cost: 550, time: 33, locality: "Gariahat", open: 8, close: 22, safety: true },
  { name: "Kookie Jar", cuisines: ["Desserts", "Bakery", "Cafe"], menu: "dessert", img: dessert, gallery: [dessert, pizza, momos], rating: 4.3, votes: 8800, cost: 450, time: 24, offer: "10% OFF", locality: "Camac Street", open: 9, close: 22, safety: true },
  { name: "Tokyo Table", cuisines: ["Japanese", "Asian"], menu: "japanese", img: sushi, gallery: [sushi, momos, hero], rating: 3.7, votes: 900, cost: 1800, time: 42, locality: "Salt Lake", open: 12, close: 23, safety: false },
  { name: "Bhojohori Manna", cuisines: ["Bengali", "North Indian"], menu: "indian", img: hero, gallery: [hero, biryani, dosa], rating: 4.5, votes: 5200, cost: 750, time: 30, offer: "Flat 30% OFF", locality: "Ballygunge", open: 12, close: 22, safety: true },
];

const fmtHour = (h: number) => {
  const hr = h % 24;
  const suffix = hr >= 12 ? "pm" : "am";
  const v = hr % 12 === 0 ? 12 : hr % 12;
  return `${v}${suffix}`;
};

export const restaurants: Restaurant[] = seeds.map((s, i) => {
  const id = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const tpl = menus[s.menu] ?? {};
  const menu: MenuItem[] = [];
  Object.entries(tpl).forEach(([category, items]) =>
    items.forEach(([name, price, description, veg], j) =>
      menu.push({ id: `${id}-${category}-${j}`, name, price, description, veg, category, bestseller: j === 0 }),
    ),
  );
  const reviews: Review[] = Array.from({ length: 4 }, (_, k) => {
    const [user, rating, comment] = reviewPool[(i + k * 3) % reviewPool.length]!;
    return { id: `${id}-r${k}`, user, rating, comment, date: `${(k * 5 + i) % 27 + 1} Oct 2026` };
  });
  return {
    id, name: s.name, cuisines: s.cuisines, rating: s.rating, votes: s.votes, costForTwo: s.cost,
    deliveryTime: s.time, offer: s.offer, locality: s.locality,
    address: `${12 + i * 7}, ${s.locality}, Kolkata`,
    hours: `${fmtHour(s.open)} – ${fmtHour(s.close)}`,
    openHour: s.open, closeHour: s.close, safety: s.safety, image: s.img, gallery: s.gallery, menu, reviews,
  };
});

export function isOpen(r: Restaurant, hour = new Date().getHours()) {
  if (r.closeHour > r.openHour) return hour >= r.openHour && hour < r.closeHour;
  return hour >= r.openHour || hour < r.closeHour % 24;
}

export function ratingTone(rating: number): "high" | "mid" | "low" {
  if (rating >= 4) return "high";
  if (rating >= 3.5) return "mid";
  return "low";
}

export type Filters = {
  q: string; rating4: boolean; safety: boolean; fast: boolean; offers: boolean; cuisines: string[];
};

export function filterRestaurants(list: Restaurant[], f: Filters) {
  const q = f.q.trim().toLowerCase();
  return list.filter((r) => {
    if (q && !(r.name.toLowerCase().includes(q) || r.cuisines.some((c) => c.toLowerCase().includes(q)) ||
      r.menu.some((m) => m.name.toLowerCase().includes(q)) || r.locality.toLowerCase().includes(q))) return false;
    if (f.rating4 && r.rating < 4) return false;
    if (f.safety && !r.safety) return false;
    if (f.fast && r.deliveryTime > 30) return false;
    if (f.offers && !r.offer) return false;
    if (f.cuisines.length && !r.cuisines.some((c) => f.cuisines.includes(c))) return false;
    return true;
  });
}

export const TAX_RATE = 0.05;
export const DELIVERY_FEE = 40;
