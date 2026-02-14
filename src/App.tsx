import CollectionPage from "./pages/collection";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AnimatePresence, motion } from "framer-motion";

import FeedbackButton from "@/components/FeedbackButton";
import NewsletterPopup from "@/components/NewsletterPopup";
import ScrollToTop from "@/components/ScrollToTop";

import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ContactPage from "./pages/contactpage";
import ProductPages from "./pages/projectspage";
import LoginPage from "./pages/LoginPage";
// import AboutPage from "./pages/AboutPage";
import OurStoryPage from "./pages/OurStoryPage";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";
import CollectionsPage from "@/pages/collection";


<Route path="/collections" element={<CollectionsPage />} />


const queryClient = new QueryClient();

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* HOME */}
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />

        {/* CATEGORY */}
        <Route
          path="/category/:categoryId"
          element={
            <PageTransition>
              <CategoryPage />
            </PageTransition>
          }
        />

        {/* COLLECTION */}
        <Route
          path="/collection"
          element={
            <PageTransition>
              <CollectionPage />
            </PageTransition>
          }
        />

        {/* PROJECTS */}
        <Route
          path="/projects"
          element={
            <PageTransition>
              <ProductPages />
            </PageTransition>
          }
        />

        {/* SERVICES */}
        <Route
          path="/services"
          element={
            <PageTransition>
              <ServicesPage />
            </PageTransition>
          }
        />

        {/* ABOUT */}
        {/* <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        /> */}

        {/* OUR STORY */}
        <Route
          path="/our-story"
          element={
            <PageTransition>
              <OurStoryPage />
            </PageTransition>
          }
        />

        {/* CONTACT ✅ ADDED */}
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
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
        <FeedbackButton />
        <NewsletterPopup />

        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
