/**
 * MenuGrid.jsx
 * Renders the full menu as a responsive grid of FoodCards.
 * Handles category filtering, search filtering, and empty state display.
 */

import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { MdOutlineRestaurant } from "react-icons/md";
import FoodCard from "./FoodCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

function MenuGrid({ items }) {
  if (items.length === 0) {
    return (
      <div className="empty-menu">
        <div className="emoji">
          <MdOutlineRestaurant style={{ fontSize: "4rem", color: "var(--text-muted)" }} />
        </div>
        <h3>No dishes found</h3>
        <p>Try adjusting your search or category filter.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="menu-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default MenuGrid;
