import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

import { Toaster } from "sonner"; // ✅ ONLY THIS TOASTER
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import ScrollToTop from "@/components/ScrollToTop";
import FeedbackButton from "./components/FeedbackButton";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import { UserDashboard } from "./pages/user/UserDashboard";
import { Orders } from "./pages/user/Orders";
import { OrderTracking } from "./pages/user/OrderTracking";
import { Wishlist } from "./pages/user/Wishlist";
import { AccountSettings } from "./pages/user/AccountSettings";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ContactPage from "./pages/contactpage";
import ProductPages from "./pages/projectspage";
import ServicesPage from "./pages/ServicesPage";
import OurStoryPage from "./pages/OurStoryPage";
import CollectionPage from "./pages/collection";
import ProductDetailPage from "./pages/ProductDetailPage";
import FaqPage from "./pages/FaqPage";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import CheckoutPage from "./pages/CheckoutPage";
import SearchResultsPage from "./pages/SearchResultsPage";

const queryClient = new QueryClient();

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.35 }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  // Determine if we should treat user as admin legacy authenticated
  const isLegacyAdmin = isAuthenticated && isAdmin;
  const hasAdminAuth = isLegacyAdmin || localStorage.getItem("isAdminAuth") === "true";

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/collection" element={<PageTransition><CollectionPage /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><ProductPages /></PageTransition>} />
        <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/our-story" element={<PageTransition><OurStoryPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FaqPage /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
        <Route path="/search" element={<PageTransition><SearchResultsPage /></PageTransition>} />

        {['/login', '/signup', '/forgot-password', '/verify-otp', '/reset-password'].map((path) => (
          <Route
            key={path}
            path={path}
            element={
              !isAuthenticated && !hasAdminAuth ? (
                <PageTransition>
                  <LoginPage />
                </PageTransition>
              ) : (
                <Navigate to={hasAdminAuth ? "/admin" : "/user/dashboard"} replace />
              )
            }
          />
        ))}

        {/* User Protected Routes */}
        <Route path="/user/dashboard" element={<ProtectedRoute><PageTransition><UserDashboard /></PageTransition></ProtectedRoute>} />
        <Route path="/user/orders" element={<ProtectedRoute><PageTransition><Orders /></PageTransition></ProtectedRoute>} />
        <Route path="/user/orders/:id" element={<ProtectedRoute><PageTransition><OrderTracking /></PageTransition></ProtectedRoute>} />
        <Route path="/user/wishlist" element={<ProtectedRoute><PageTransition><Wishlist /></PageTransition></ProtectedRoute>} />
        <Route path="/user/settings" element={<ProtectedRoute><PageTransition><AccountSettings /></PageTransition></ProtectedRoute>} />

        <Route
          path="/admin/*"
          element={
            hasAdminAuth ? (
              <PageTransition>
                <AdminDashboard setAuth={() => { }} />
              </PageTransition>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster richColors position="top-right" /> {/* ✅ SONNER */}
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <ScrollToTop />
              <FeedbackButton />
              <AnimatedRoutes />
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;