# 🍽️ TasteBuds – Food Discovery & Ordering Platform

**TasteBuds** is a responsive, interactive food discovery and ordering web application inspired by Zomato. It allows users to explore restaurants, discover different cuisines, browse food menus, manage their shopping carts, and experience a simplified online food ordering process.

Built using modern frontend technologies, TasteBuds focuses on providing an intuitive user interface, smooth navigation, and an engaging restaurant discovery experience.

---

## ✨ Features

### 🏠 1. Interactive Homepage
- Attractive landing page with a restaurant discovery interface.
- Search functionality to find restaurants, cuisines, and dishes.
- City selection to personalize the discovery experience.
- Explore popular localities and trending restaurants.
- Dedicated sections for online ordering, dining, and nightlife.

### 🔍 2. Restaurant Discovery & Search
- Browse a collection of restaurants with detailed information.
- View restaurant ratings, cuisines, estimated delivery times, and average costs.
- Search restaurants by name, cuisine, or food items.
- Explore restaurants through an interactive listing interface.

### 🎯 3. Advanced Filtering
Users can refine their restaurant search using multiple filters:
- **Rating:** Discover restaurants rated 4.0 and above.
- **Max Safety:** Filter restaurants based on safety indicators.
- **Fast Delivery:** Find restaurants with quicker delivery times.
- **Offers:** Explore restaurants offering discounts.
- **Cuisine:** Filter restaurants according to preferred cuisines.

### 🍕 4. Restaurant Details & Menu
- Dedicated pages for individual restaurants.
- Restaurant overview, address, operating hours, and ratings.
- Browse categorized food menus.
- Identify vegetarian and non-vegetarian food items.
- Discover recommended and bestselling dishes.
- Explore restaurant photographs and customer reviews.

### 🛒 5. Shopping Cart & Ordering
- Add food items to the shopping cart.
- Increase or decrease item quantities.
- Automatically calculate item totals.
- Display delivery charges and applicable taxes.
- Calculate the final payable amount.
- Interactive order placement with a confirmation screen.

### 👤 6. User Authentication Interface
- Login and signup interfaces.
- Form validation for user inputs.
- Personalized interface after login.
- Logout functionality.

### ⭐ 7. Customer Reviews & Ratings
- View existing restaurant reviews.
- Submit ratings using a five-star rating system.
- Write and submit customer feedback.
- Display user-submitted reviews.

### 📱 8. Responsive User Interface
- Clean and modern design.
- Responsive layouts for different screen sizes.
- Interactive components and smooth hover effects.
- Toast notifications for user interactions.
- Easy navigation throughout the application.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Building reusable UI components |
| TypeScript | Type safety and maintainable code |
| TanStack Router | Application routing and navigation |
| TanStack Start | Application framework |
| Vite | Development server and build tool |
| Tailwind CSS 4 | Styling and responsive layouts |
| Radix UI | Accessible UI primitives |
| Lucide React | Icons and visual elements |
| TanStack Query | Data and query management |
| Vitest | Testing framework |

---

## 📂 Project Structure

```text
TasteBuds/
│
├── public/                  # Public static assets
│
├── src/
│   ├── assets/              # Images and visual assets
│   │
│   ├── components/          # Reusable UI components
│   │   ├── AuthModal.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── Navbar.tsx
│   │   ├── RestaurantCard.tsx
│   │   └── ...
│   │
│   ├── lib/                 # Application data and utilities
│   │   ├── data.ts
│   │   ├── store.tsx
│   │   └── ...
│   │
│   ├── routes/              # Application pages
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── restaurants.tsx
│   │   └── restaurant.$id.tsx
│   │
│   ├── styles.css           # Global styles
│   └── ...
│
├── .gitignore
├── package.json
├── bun.lock
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to run TasteBuds on your local machine.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)

Alternatively, you can use [Bun](https://bun.com/), for which the repository includes a lockfile.

### 1. Clone the Repository

```bash
git clone https://github.com/oishee17/TasteBuds.git
```

### 2. Navigate to the Project Directory

```bash
cd TasteBuds
```

### 3. Install Dependencies

Using npm:

```bash
npm install
```

Or using Bun:

```bash
bun install
```

### 4. Start the Development Server

Using npm:

```bash
npm run dev
```

Or using Bun:

```bash
bun run dev
```

### 5. Open the Application

Open the local URL displayed in your terminal (usually):

```text
http://localhost:3000
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run build:dev` | Creates a development-mode build |
| `npm run preview` | Previews the production build |
| `npm run lint` | Runs ESLint checks |
| `npm run format` | Formats the code using Prettier |
| `npm test` | Runs the test suite |
| `npm run test:watch` | Runs tests in watch mode |

---

## 📝 Project Notes

- TasteBuds currently uses locally defined sample restaurant, menu, and review data.
- Authentication and order placement are implemented as frontend demonstrations.
- No live payment gateway or production backend integration is currently configured.
- The application is intended as a demonstration of an interactive food discovery and ordering platform.

---

## 🎯 Learning Objectives

This project provides practical experience with:

- Building responsive web applications using React.
- Developing reusable and modular components.
- Implementing client-side routing and navigation.
- Managing application state and user interactions.
- Working with TypeScript and modern frontend tooling.
- Creating interactive search, filtering, and shopping cart functionalities.
- Designing intuitive and user-friendly interfaces.

---

## 🙌 Acknowledgements

- [Zomato](https://www.zomato.com/) – Inspiration for the food discovery and restaurant ordering experience.
- [Lovable](https://lovable.dev/) – AI-powered development platform used during project development.
- The open-source developer community for the tools and libraries used in this project.

---

## 👩‍💻 Author

**Oishee Biswas**

GitHub: [@oishee17](https://github.com/oishee17)

---

⭐ If you find this project interesting, consider giving the repository a star!

**Made with ❤️ and a passion for building interactive web experiences.**
