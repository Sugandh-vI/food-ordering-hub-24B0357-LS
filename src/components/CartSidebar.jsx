/**
 * CartSidebar.jsx
 * Sliding cart sidebar showing cart items, quantities, and total.
 * Supports increment/decrement, remove, clear all, and checkout.
 */

import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaMinus, FaPlus, FaTrash, FaShoppingBag } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useCart } from "../context/CartContext";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sidebarVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: { x: "100%", transition: { duration: 0.25 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

function CartSidebar({ isOpen, onClose, onCheckout }) {
  const { cart, dispatch, totalItems, totalPrice } = useCart();

  const DELIVERY_FEE = totalPrice > 0 ? 2.99 : 0;
  const TAX = totalPrice * 0.08;

  function handleIncrement(id) {
    dispatch({ type: "INCREMENT", payload: id });
  }
  function handleDecrement(id) {
    dispatch({ type: "DECREMENT", payload: id });
  }
  function handleRemove(id) {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }
  function handleClear() {
    dispatch({ type: "CLEAR_CART" });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="cart-sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="cart-header">
              <div className="cart-header-title">
                <FaShoppingBag style={{ color: "var(--accent)" }} />
                Your Cart
                <span className="cart-header-count">{totalItems}</span>
              </div>
              <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
                <IoClose />
              </button>
            </div>

            {/* Items or Empty State */}
            {cart.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-emoji">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some delicious food to get started!</p>
              </div>
            ) : (
              <div className="cart-items">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      className="cart-item"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <img
                        className="cart-item-img"
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                      />
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                      <div className="cart-item-controls">
                        {/* Decrement / Remove */}
                        <button
                          className="qty-btn minus"
                          onClick={() => handleDecrement(item.id)}
                          aria-label="Decrease quantity"
                        >
                          <FaMinus size={10} />
                        </button>
                        {/* Quantity */}
                        <span className="qty-display">{item.quantity}</span>
                        {/* Increment */}
                        <button
                          className="qty-btn"
                          onClick={() => handleIncrement(item.id)}
                          aria-label="Increase quantity"
                        >
                          <FaPlus size={10} />
                        </button>
                        {/* Remove */}
                        <button
                          className="remove-btn"
                          onClick={() => handleRemove(item.id)}
                          aria-label="Remove item"
                        >
                          <FaTrash size={11} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Footer */}
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Delivery fee</span>
                  <span>${DELIVERY_FEE.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Tax (8%)</span>
                  <span>${TAX.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row total">
                  <span>Total</span>
                  <span className="total-price">
                    ${(totalPrice + DELIVERY_FEE + TAX).toFixed(2)}
                  </span>
                </div>

                {/* Checkout */}
                <motion.button
                  className="checkout-btn"
                  onClick={onCheckout}
                  whileTap={{ scale: 0.97 }}
                >
                  <MdShoppingCartCheckout size={20} />
                  Proceed to Checkout
                </motion.button>

                {/* Clear All */}
                <button className="clear-cart-btn" onClick={handleClear}>
                  Clear all items
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartSidebar;
