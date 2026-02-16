import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

// UI Components
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import ScrollToTop from "@/components/ScrollToTop";
import FeedbackButton from "./components/FeedbackButton";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryPage from "./pages/CategoryPage";
import ContactPage from "./pages/contactpage";
import ProductPages from "./pages/projectspage";
import ServicesPage from "./pages/ServicesPage";
import OurStoryPage from "./pages/OurStoryPage";
import CollectionPage from "./pages/collection";
import NotFound from "./pages/NotFound";

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
  
  // ✅ INITIAL CHECK: Check if strictly "true"
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAdminAuth") === "true";
  });

  // ✅ IMPROVED AUTH LOGIC: Handle login and logout properly
  const handleSetAuth = (status: boolean) => {
    setIsAuthenticated(status);
    if (status) {
      localStorage.setItem("isAdminAuth", "true");
    } else {
      // Logout hone par storage se delete karein
      localStorage.removeItem("isAdminAuth");
    }
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/collection" element={<PageTransition><CollectionPage /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><ProductPages /></PageTransition>} />
        <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/our-story" element={<PageTransition><OurStoryPage /></PageTransition>} />

        {/* ✅ LOGIN LOGIC: Direct redirect only if authenticated */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <PageTransition>
                <LoginPage setAuth={handleSetAuth} />
              </PageTransition>
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />

        {/* ✅ PROTECTED ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <PageTransition>
                <AdminDashboard setAuth={handleSetAuth} />
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
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <FeedbackButton /> 
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;