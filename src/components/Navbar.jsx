/**
 * Navbar.jsx
 * Sticky glassmorphism navbar with logo, theme toggle, and animated cart button.
 */

import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Navbar({ onCartOpen, theme, toggleTheme }) {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      {/* Logo */}
      <a className="navbar-logo" href="/" aria-label="Food Hub Home">
        <div className="navbar-logo-icon">🍔</div>
        <span className="navbar-logo-text">
          Food<span>Hub</span>
        </span>
      </a>

      {/* Actions */}
      <div className="navbar-actions">
        {/* Theme Toggle */}
        <motion.button
          className="theme-btn"
          onClick={toggleTheme}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Cart Button */}
        <motion.button
          className="cart-btn"
          onClick={onCartOpen}
          whileTap={{ scale: 0.97 }}
          aria-label={`Open cart, ${totalItems} items`}
          id="cart-open-btn"
        >
          <FaShoppingCart />
          <span>Cart</span>
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                className="cart-badge"
                key="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </nav>
  );
}

export default Navbar;
