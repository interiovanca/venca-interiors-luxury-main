import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/ankmiishra", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ankit-mishra-3766b6232", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
    { icon: MessageCircle, href: "https://wa.me/918882480459", label: "WhatsApp" },
  ];

  const footerLinks = [
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ];

  return (
    <footer className="relative bg-[#0B0B0B] text-white">

      {/* Thin top divider */}
      <div className="h-[1px] w-full bg-white/5" />

      <div className="container mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-brand text-xl tracking-[0.18em] mb-2">
              VANCA INTERIO
            </h3>

            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              Premium interior solutions crafted with precision, elegance, and timeless appeal.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:text-center"
          >
            <h4 className="text-xs tracking-[0.3em] text-[#C9A76A] mb-4">
              QUICK LINKS
            </h4>

            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-[#C9A76A] transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:text-right"
          >
            <h4 className="text-xs tracking-[0.3em] text-[#C9A76A] mb-4">
              CONNECT
            </h4>

            <div className="flex gap-2 md:justify-end">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 flex items-center justify-center
                  border border-white/10
                  text-white/70
                  hover:border-[#C9A76A]
                  hover:text-[#C9A76A]
                  transition-all duration-300"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-white/5 text-center">
          <p className="text-xs text-white/40 tracking-wide">
            © 2024 Vanca Interio. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
