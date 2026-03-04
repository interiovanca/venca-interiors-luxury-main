import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trash2, ShieldCheck, ArrowRight, Minus, Plus } from "lucide-react";

const CheckoutPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      // 🔐 2️⃣ Login Required Only at Checkout
      localStorage.setItem("redirect_after_login", "/checkout");
      navigate("/login");
    } else {
      // Proceed to actual payment/success logic
      alert("Proceeding to payment gateway...");
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#050505] text-black dark:text-cream">
      <Header isVisible={true} />

      <main className="pt-32 pb-24 container mx-auto px-6 max-w-6xl">
        <h1 className="font-display text-4xl mb-12">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-black/5 dark:border-white/5">
            <h2 className="text-2xl font-display mb-4">Your cart is empty.</h2>
            <p className="text-black/60 dark:text-white/60 mb-8 font-body">Browse our luxury collections and add your favorite pieces.</p>
            <Link to="/collection" className="px-8 py-4 bg-amber-600 dark:bg-amber-500 text-black uppercase tracking-widest text-sm rounded-full font-medium hover:scale-105 transition-transform">
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">

            {/* CART ITEMS */}
            <div className="flex-1 space-y-6">
              {cart.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item.id}
                  className="flex gap-6 p-6 bg-card border border-black/5 dark:border-white/5 rounded-3xl"
                >
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-display tracking-wide text-lg">{item.name}</h3>
                        <p className="text-xs uppercase tracking-widest text-black/50 dark:text-white/50">{item.category}</p>
                      </div>
                      <p className="font-medium text-lg">₹{item.price.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">

                      {/* QUANTITY CONTROL */}
                      <div className="flex items-center border border-black/10 dark:border-white/10 rounded-full bg-black/5 dark:bg-white/5">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:text-amber-600 transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:text-amber-600 transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>

                      <button onClick={() => removeFromCart(item.id)} className="text-black/40 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="w-full lg:w-[400px]">
              <div className="bg-card p-8 rounded-3xl border border-black/5 dark:border-white/5 sticky top-24">
                <h3 className="font-display text-2xl mb-6">Order Summary</h3>

                <div className="space-y-4 font-body text-sm mb-6 border-b border-black/10 dark:border-white/10 pb-6">
                  <div className="flex justify-between text-black/70 dark:text-white/70">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-black/70 dark:text-white/70">
                    <span>White-Glove Delivery</span>
                    <span>Complimentary</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 font-display text-xl">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-black dark:bg-cream text-white dark:text-black py-4 rounded-full uppercase tracking-[0.15em] text-xs font-medium hover:bg-amber-600 hover:text-white dark:hover:bg-amber-500 transition-colors shadow-xl"
                >
                  <ShieldCheck size={16} />
                  Proceed to Checkout <ArrowRight size={16} />
                </button>

                {!isAuthenticated && (
                  <p className="text-center text-xs text-black/50 dark:text-white/50 mt-4">
                    You will be prompted to login securely on the next step.
                  </p>
                )}
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
