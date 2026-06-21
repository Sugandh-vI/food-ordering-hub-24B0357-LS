/**
 * CheckoutModal.jsx
 * Dummy two-step checkout modal:
 *  Step 1 – Delivery details form
 *  Step 2 – Order success confirmation
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { useCart } from "../context/CartContext";

function generateOrderId() {
  return "FH-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 25 } },
  exit: { opacity: 0, scale: 0.9, y: 20 },
};

function CheckoutModal({ isOpen, onClose }) {
  const { dispatch, totalPrice } = useCart();
  const [step, setStep] = useState(1); // 1=form, 2=success
  const [orderId] = useState(generateOrderId);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", zip: "",
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStep(2);
    dispatch({ type: "CLEAR_CART" }); // Clear cart on successful order
  }

  function handleDone() {
    setStep(1);
    setForm({ name: "", email: "", phone: "", address: "", city: "", zip: "" });
    onClose();
  }

  const DELIVERY_FEE = 2.99;
  const TAX = totalPrice * 0.08;
  const grandTotal = (totalPrice + DELIVERY_FEE + TAX).toFixed(2);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.target === e.currentTarget && step === 1 && onClose()}
        >
          <motion.div
            className="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {step === 1 ? (
              /* ── STEP 1: Delivery Form ── */
              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="modal-form-title">
                  <MdLocalShipping style={{ color: "var(--accent)", marginRight: 8, verticalAlign: "middle" }} />
                  Delivery Details
                </div>
                <div className="modal-form-subtitle">
                  Total: <strong style={{ color: "var(--accent)" }}>${grandTotal}</strong>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input
                      className="form-input"
                      name="name"
                      placeholder="John"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone *</label>
                    <input
                      className="form-input"
                      name="phone"
                      placeholder="+1 234 567"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    className="form-input"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address *</label>
                  <input
                    className="form-input"
                    name="address"
                    placeholder="123 Main Street, Apt 4B"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      className="form-input"
                      name="city"
                      placeholder="New York"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ZIP Code *</label>
                    <input
                      className="form-input"
                      name="zip"
                      placeholder="10001"
                      value={form.zip}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="modal-form-btn">
                  Place Order · ${grandTotal}
                </button>
              </form>
            ) : (
              /* ── STEP 2: Success ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="modal-success-icon">🎉</div>
                <div className="modal-title">Order Placed!</div>
                <div className="modal-subtitle">
                  Your food is being prepared and will be with you shortly. Sit tight!
                </div>
                <div className="modal-order-id">
                  Order ID: <strong>{orderId}</strong>
                  <br />
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    Estimated delivery: 25–35 minutes
                  </span>
                </div>
                <button className="modal-close-btn" onClick={handleDone}>
                  Back to Menu
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CheckoutModal;
