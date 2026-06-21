/**
 * FoodCard.jsx
 * Individual food item card component.
 * Displays image, badges, name, description, rating, price, and Add to Cart button.
 */

import { motion } from "framer-motion";
import { FaStar, FaFire, FaLeaf, FaShoppingCart, FaCheck } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function FoodCard({ item }) {
  const { cart, dispatch } = useCart();

  // Check if the item is already in the cart
  const inCart = cart.some((c) => c.id === item.id);

  function handleAddToCart() {
    dispatch({ type: "ADD_ITEM", payload: item });
  }

  return (
    <motion.div
      className="food-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      layout
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image */}
      <div className="food-card-image-wrapper">
        <img src={item.image} alt={item.name} loading="lazy" />

        {/* Badges */}
        <div className="food-card-badges">
          {item.popular && (
            <span className="badge badge-popular">
              <FaFire /> Popular
            </span>
          )}
          {item.veg && (
            <span className="badge badge-veg">
              <FaLeaf /> Veg
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="food-card-body">
        <div className="food-card-category">{item.category}</div>
        <div className="food-card-name">{item.name}</div>
        <div className="food-card-desc">{item.description}</div>

        <div className="food-card-footer">
          <div className="food-card-rating">
            <FaStar />
            <span>{item.rating.toFixed(1)}</span>
          </div>
          <div className="food-card-price">${item.price.toFixed(2)}</div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          className={`add-to-cart-btn ${inCart ? "in-cart" : ""}`}
          onClick={handleAddToCart}
          whileTap={{ scale: 0.96 }}
          aria-label={`Add ${item.name} to cart`}
        >
          {inCart ? (
            <>
              <FaCheck /> Added to Cart
            </>
          ) : (
            <>
              <FaShoppingCart /> Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default FoodCard;
