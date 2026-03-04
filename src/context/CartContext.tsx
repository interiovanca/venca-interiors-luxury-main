import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: string; // product id
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🔄 3️⃣ Cart Merge Logic (Like Amazon)
  useEffect(() => {
    const guestCart = JSON.parse(localStorage.getItem("vanca_guest_cart") || "[]");

    if (isAuthenticated && user) {
      // User is logged in, load their specific cart from the DB (simulated via localStorage here)
      const userCarts = JSON.parse(localStorage.getItem("vanca_user_carts") || "{}");
      let userCart: CartItem[] = userCarts[user.id] || [];

      // Merge guest cart into user cart if guest cart has items
      if (guestCart.length > 0) {
        guestCart.forEach((guestItem: CartItem) => {
          const existing = userCart.find((i: CartItem) => i.id === guestItem.id);
          if (existing) {
            existing.quantity += guestItem.quantity;
          } else {
            userCart.push(guestItem);
          }
        });
        // Clear guest cart after merge
        localStorage.removeItem("vanca_guest_cart");
      }

      setCart(userCart);
      userCarts[user.id] = userCart;
      localStorage.setItem("vanca_user_carts", JSON.stringify(userCarts));

    } else {
      // 🛒 1️⃣ Guest Shopping (No Login Required)
      setCart(guestCart);
    }
  }, [isAuthenticated, user?.id]);

  // Sync state to storage whenever cart changes
  useEffect(() => {
    if (isAuthenticated && user) {
      const userCarts = JSON.parse(localStorage.getItem("vanca_user_carts") || "{}");
      userCarts[user.id] = cart;
      localStorage.setItem("vanca_user_carts", JSON.stringify(userCarts));
    } else {
      localStorage.setItem("vanca_guest_cart", JSON.stringify(cart));
    }
  }, [cart, isAuthenticated, user]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
