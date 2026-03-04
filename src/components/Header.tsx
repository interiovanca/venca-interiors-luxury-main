import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Menu, X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import ThemeToggle from "./ThemeToggle";
import FloatingThemeToggle from "./FloatingThemeToggle";
import SearchBar from "./SearchBar";

interface HeaderProps {
  isVisible: boolean;
}

const navItems = [
  { label: "OUR STORY", path: "/our-story" },
  { label: "COLLECTIONS", path: "/collection" },
  { label: "PROJECTS", path: "/projects" },
  { label: "SERVICES", path: "/services" },
  { label: "CONTACT", path: "/contact" },
];

const mobileNavItems = [
  { label: "OUR Story", path: "/our-story" },
  { label: "Collections", path: "/collection" },
  { label: "Projects", path: "/projects" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const Header = ({ isVisible }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -60,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(60,60,60,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Mobile Header */}
        <div className="md:hidden h-14 px-4 flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white/80 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-brand text-sm tracking-[0.2em] text-white uppercase">
              Vanca Interio
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            <SearchBar />

            <Link to="/login">
              <User className="w-4 h-4 text-white/70" />
            </Link>

            <Link to="/checkout" className="relative group">
              <ShoppingBag className="w-4 h-4 text-white/70 group-hover:text-amber-500 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex container mx-auto h-11 px-6 items-center justify-center">
          <Link to="/">
            <h1 className="font-brand text-lg tracking-[0.25em] text-white uppercase">
              Vanca Interio
            </h1>
          </Link>

          <div className="absolute right-6 flex items-center gap-5">
            <Link to="/login" className="hover:text-amber-500 transition-colors">
              <User className="w-4 h-4 text-white/70 group-hover:text-amber-500" />
            </Link>

            <SearchBar />

            <Link to="/checkout" className="relative group hover:text-amber-500 transition-colors border-l border-white/10 pl-5">
              <ShoppingBag className="w-4 h-4 text-white/70 group-hover:text-amber-500" />
              {cartCount > 0 && (
                <span className="absolute -top-2 right-[-8px] bg-amber-600 text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow-lg text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block border-t border-white/5">
          <ul className="flex justify-center gap-10 h-9 items-center">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="text-white/80 hover:text-white text-xs tracking-widest"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>



      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-[60]"
              onClick={closeMobileMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#1a1a1a] z-[70]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
            >
              <div className="p-6 flex justify-between">
                <span className="text-white uppercase tracking-widest text-sm">
                  Menu
                </span>
                <button onClick={closeMobileMenu}>
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <ul className="p-6 space-y-6">
                {mobileNavItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      onClick={closeMobileMenu}
                      className="text-white/80 text-lg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-8 left-6 right-6">
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <FloatingThemeToggle isVisible={isVisible} />
    </>
  );
};

export default Header;
