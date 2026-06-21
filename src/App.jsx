/**
 * App.jsx
 * Application root. Manages global state:
 *  - Cart open/close
 *  - Checkout modal open/close
 *  - Search query
 *  - Active category filter
 *  - Theme (delegated to useTheme hook)
 */

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

import Navbar from "./components/Navbar";
import MenuGrid from "./components/MenuGrid";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import { menuItems, CATEGORIES } from "./data/menuData";
import { useTheme } from "./hooks/useTheme";
import "./index.css";

function App() {
  const { theme, toggleTheme } = useTheme();

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter items based on search query and selected category
  const filteredItems = useMemo(() => {
    let items = menuItems;

    if (activeCategory !== "All") {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    return items;
  }, [search, activeCategory]);

  function openCheckout() {
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  return (
    <>
      {/* Sticky Navbar */}
      <Navbar
        onCartOpen={() => setCartOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-eyebrow">🔥 Now Accepting Orders</div>
        <h1 className="hero-title">
          Great Food,<br />
          <span>Delivered Fast</span>
        </h1>
        <p className="hero-subtitle">
          Browse our hand-curated menu of gourmet dishes. Fresh, flavourful, and just a click away.
        </p>
      </motion.section>

      {/* Search + Category Filters */}
      <motion.div
        className="controls-bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Search Bar */}
        <div className="search-wrapper">
          <FiSearch className="search-icon" aria-hidden="true" />
          <input
            id="menu-search"
            className="search-input"
            type="search"
            placeholder="Search dishes, ingredients…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search menu"
          />
          {search && (
            <button
              className="search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <FiX />
            </button>
          )}
        </div>

        {/* Category Chips */}
        <div className="categories-scroll" role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              className={`category-chip ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.95 }}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Results Header */}
      <div className="results-header">
        <p className="results-count">
          Showing <strong>{filteredItems.length}</strong> of {menuItems.length} dishes
          {activeCategory !== "All" && ` in "${activeCategory}"`}
          {search && ` matching "${search}"`}
        </p>
      </div>

      {/* Menu Grid */}
      <main id="main-content" role="main">
        <MenuGrid items={filteredItems} />
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={openCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
}

export default App;
