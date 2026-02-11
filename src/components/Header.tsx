import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import FloatingThemeToggle from "./FloatingThemeToggle";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // ✅ Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

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
            <button onClick={() => setIsSearchOpen(true)}>
              <Search className="w-4 h-4 text-white/70" />
            </button>

            <Link to="/login">
              <User className="w-4 h-4 text-white/70" />
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
            <Link to="/login">
              <User className="w-4 h-4 text-white/70" />
            </Link>

            <button onClick={() => setIsSearchOpen(true)}>
              <Search className="w-4 h-4 text-white/70" />
            </button>
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

      {/* 🌟 COMPACT MODERN SEARCH BAR */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Transparent click layer */}
            <div className="fixed inset-0 z-40" />

            <motion.div
              ref={searchRef}
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[80px] left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl"
            >
              <div className="flex items-center gap-3 px-5 py-2 rounded-full
                bg-white/90 dark:bg-[#121212]
                backdrop-blur-md shadow-lg">

                <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />

                <input
                autoFocus
                    type="text"
                    placeholder="Search furniture, designs..."
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                          const query = (e.target as HTMLInputElement).value.toLowerCase();

                          const elements = document.querySelectorAll("p, h1, h2, h3, h4, span");

                               let found = false;

      elements.forEach((el) => {
        if (el.textContent?.toLowerCase().includes(query) && !found) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("ring-2", "ring-yellow-500");
          found = true;

          setTimeout(() => {
            el.classList.remove("ring-2", "ring-yellow-500");
          }, 2000);
        }
      });

      setIsSearchOpen(false);
    }
  }}

                  className="flex-1 bg-transparent outline-none
                  text-gray-900 dark:text-white
                  placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />

                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-xs text-gray-500 hover:text-black dark:hover:text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
