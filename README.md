<div align="center">

# 🍔 FoodHub — Mini Food Ordering Hub

**Week 2 Assignment · WnCC Full Stack Web Development LS**

[![React](https://img.shields.io/badge/React-19.2.6-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

*A fully interactive, animated food ordering experience built with modern React.*

</div>

---

## Overview

**FoodHub** is a responsive single-page food ordering application built as the Week 2 assignment for the WnCC Full Stack Web Development Learning Series. The project demonstrates core React concepts — component architecture, hooks-based state management, Context API, and localStorage persistence — wrapped in a polished, production-grade UI with dark/light theming and Framer Motion micro-animations.

Users can browse a curated menu of 15 dishes across 9 categories, search and filter items, manage a live shopping cart, and complete a dummy checkout flow — all without a backend.

---

## Features

### Core Assignment Requirements

| Feature | Description |
|---|---|
| **Responsive Menu Grid** | CSS Grid layout auto-fills cards across breakpoints (1–4 columns) |
| **Food Cards** | Each card displays a local image, food name, price, star rating, and category badge |
| **Add to Cart** | Every card has an interactive button that adds the item to the global cart |
| **Cart Sidebar** | Animated sliding drawer listing all cart items with name and quantity (e.g. `Pizza × 2`) |
| **Live Item Counter** | Persistent badge on the navbar cart button showing total item count in real time |
| **Live Price Calculation** | Cart footer computes subtotal, delivery fee, 8% tax, and grand total dynamically |

### Innovation Features

| Feature | Description |
|---|---|
| **Search Bar** | Live full-text search across item name, description, and category |
| **Category Filters** | 9 chip-style category filters: All, Burgers, Pizza, Sushi, Pasta, Tacos, Salads, Desserts, Drinks, Grills |
| **Quantity Controls** | Inline `+` / `−` buttons in the cart with auto-remove when quantity reaches zero |
| **localStorage Persistence** | Cart contents and theme preference survive page refresh |
| **Dark / Light Theme** | One-click toggle with smooth CSS variable transition; preference persisted |
| **Framer Motion Animations** | Staggered card entry, sidebar slide-in, modal scale, badge bounce, icon swap |
| **Checkout Modal** | Two-step dummy flow: delivery details form → animated success screen with order ID |
| **Popular & Veg Badges** | Visual overlays on food cards indicating trending or vegetarian items |
| **Empty States** | Illustrated empty-cart state and no-results state for search/filter |
| **Results Counter** | Dynamic count showing filtered vs. total items |
| **Mobile Bottom Sheet** | On small screens the cart sidebar becomes a bottom drawer for native-feeling UX |

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| [React](https://react.dev/) | 19.2.6 | UI framework |
| [Vite](https://vite.dev/) | 8.0.x | Build tool & dev server |
| [Framer Motion](https://www.framer.com/motion/) | 12.x | Declarative animations |
| [React Icons](https://react-icons.github.io/react-icons/) | 5.x | SVG icon library |
| Vanilla CSS | — | Design system (CSS custom properties) |
| Context API + useReducer | — | Global cart state management |
| localStorage | — | Client-side persistence |

---

## Project Structure

```
food-ordering-hub/
├── public/
│   └── images/                  # 15 royalty-free food images (Unsplash)
│       ├── burger.jpg
│       ├── pizza.jpg
│       ├── sushi.jpg
│       ├── cheeseburger.jpg
│       ├── pasta.jpg
│       ├── tacos.jpg
│       ├── salad.jpg
│       ├── icecream.jpg
│       ├── cocktail.jpg
│       ├── cake.jpg
│       ├── hotdog.jpg
│       ├── steak.jpg
│       ├── smoothie.jpg
│       ├── ramen.jpg
│       └── eggs.jpg
├── src/
│   ├── assets/                  # Global branding assets
│   ├── components/
│   │   ├── FoodCard.jsx         # Individual food item card
│   │   ├── MenuGrid.jsx         # Responsive grid layout
│   │   ├── CartSidebar.jsx      # Sliding cart drawer
│   │   ├── CheckoutModal.jsx    # Two-step checkout modal
│   │   └── Navbar.jsx           # Glassmorphism sticky navigation
│   ├── context/
│   │   └── CartContext.jsx      # Global cart state + localStorage
│   ├── data/
│   │   └── menuData.js          # 15 menu items, 9 categories
│   ├── hooks/
│   │   └── useTheme.js          # Dark/light theme toggle hook
│   ├── App.jsx                  # Application root & state wiring
│   ├── index.css                # CSS design system (variables, layout)
│   └── main.jsx                 # React DOM entry point
├── index.html                   # HTML template with SEO meta tags
├── package.json
├── vite.config.js
└── README.md
```

---

## Screenshots

> *Add screenshots of the running application here.*

| View | Preview |
|---|---|
| **Home — Dark Mode** | *(screenshot)* |
| **Home — Light Mode** | *(screenshot)* |
| **Cart Sidebar Open** | *(screenshot)* |
| **Checkout Modal** | *(screenshot)* |
| **Mobile View** | *(screenshot)* |

---

## Installation & Setup

### Prerequisites
- Node.js ≥ 18.x
- npm ≥ 9.x

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Sugandh-vI/food-ordering-hub-24B0357-LS.git

# 2. Navigate into the project
cd food-ordering-hub-24B0357-LS/food-ordering-hub

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
# → App runs at http://localhost:5173

# 5. Build for production
npm run build

# 6. Preview the production build
npm run preview
```

---

## Assignment Requirements Coverage

| README Requirement | Implementation |
|---|---|
| **Component-Driven UI** | Each food item is rendered via `FoodCard.jsx`; the grid is managed by `MenuGrid.jsx`; no UI is hardcoded |
| **Food Image on Card** | Local images served from `public/images/`, mapped in `menuData.js` |
| **Food Name & Price on Card** | Displayed dynamically from `menuData.js` in `FoodCard.jsx` |
| **"Add to Cart" Button** | Interactive button on every card dispatches `ADD_ITEM` to the global cart reducer |
| **Cart Sidebar with Item List** | `CartSidebar.jsx` renders all cart items with name, image, and quantity |
| **Explicit Quantity Display** | Each cart entry shows `× N` quantity and a unit/total price breakdown |
| **Live Total Price** | Computed in `CartContext.jsx` and updated instantly on every cart mutation |
| **Live Item Counter Badge** | `totalItems` from context drives the animated badge on the navbar `Cart` button |
| **Reusable Components** | `FoodCard`, `MenuGrid`, `CartSidebar`, `CheckoutModal`, `Navbar` are fully reusable |
| **Dynamic React Hooks** | `useReducer`, `useContext`, `useState`, `useMemo`, `useEffect`, plus custom hooks |
| **No Hardcoding** | All menu data is sourced from `menuData.js`; UI is entirely data-driven |

---

## Learning Outcomes

- **React Functional Components** — every UI element is a pure function component
- **Props & Component Composition** — data flows down via props; events bubble up via callbacks
- **State Management** — `useReducer` + Context API for scalable global state
- **Custom Hooks** — `useTheme` abstracts theme logic; `useCart` provides cart access
- **`useMemo`** — filtering is memoized to avoid unnecessary re-renders
- **`useEffect`** — used for syncing state to localStorage and applying theme attributes
- **localStorage** — cart and theme preference persist across sessions
- **Framer Motion** — declarative spring animations with `AnimatePresence` for mount/unmount
- **Responsive UI Design** — CSS Grid, custom properties, and media queries for all screen sizes
- **Component Reusability** — all components accept props and are context-independent where possible

---

## Future Improvements

- [ ] Backend integration with a REST API or Firebase for real order management
- [ ] User authentication (login / sign-up flow)
- [ ] Persistent order history saved per user
- [ ] Wishlist / favourites feature
- [ ] Item detail modal with nutritional information
- [ ] Real payment gateway integration (Stripe / Razorpay)
- [ ] Admin dashboard for menu management
- [ ] Skeleton loading placeholders while images load
- [ ] Unit and integration tests with Vitest + React Testing Library
- [ ] Internationalisation (i18n) and multi-currency support

---

## Author

<table>
  <tr>
    <td align="center">
      <strong>Sugandh Kumar</strong><br/>
      IIT Bombay<br/>
      Roll No: <code>24B0357</code><br/>
      WnCC Full Stack Web Dev LS · Week 2
    </td>
  </tr>
</table>

---

<div align="center">

*Built with React + Vite · WnCC Learning Series 2026*

</div>
