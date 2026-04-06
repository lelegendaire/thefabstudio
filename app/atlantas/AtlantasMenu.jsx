"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { venom } from "../fonts";
import Link from "next/link";
import { useState, useEffect } from "react";

const menuItems = [
  { label: "Accueil", href: "#accueil", description: "Découvrir l'essence" },
  { label: "Fragrances", href: "#fragrances", description: "Notre collection" },
  {
    label: "Univers",
    href: "#univers",
    description: "Homme · Femme · Jeunesse",
  },
  { label: "Histoire", href: "#histoire", description: "Notre héritage" },
  { label: "Boutique", href: "#boutique", description: "Commander" },
  { label: "Contact", href: "#contact", description: "Nous rencontrer" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1 + i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  initial: { transition: { staggerChildren: 0, staggerDirection: -1 } },
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
      staggerDirection: 1,
    },
  },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

export default function AtlantasMenu({ isOpen, onClose }) {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[#322D29]/95 z-9998"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
          />

          {/* Menu Content */}
          <motion.div
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 pointer-events-auto z-50"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-8 h-8 text-[#D8B0B4]" />
            </motion.button>

            {/* Brand Logo */}
            <motion.div
              className="absolute top-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span
                className={`${venom.className} text-[#D8B0B4] text-3xl md:text-5xl`}
              >
                ATLANTAS
              </span>
            </motion.div>

            {/* Menu Items */}
            <motion.nav
              className="flex flex-col items-center gap-2 md:gap-4 pointer-events-auto max-h-[70vh] overflow-y-auto py-20"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="relative"
                  variants={fadeUp}
                  custom={index}
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                  animate={{
                    opacity:
                      activeItem !== null && activeItem !== index ? 0.5 : 1,
                    y: activeItem === index ? -3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`${venom.className} text-4xl md:text-6xl lg:text-7xl text-[#EFE9E1] block text-center`}
                    style={{ display: "inline-block" }}
                    whilehover={{ scale: 1.1, rotate: 1, color: "#D8B0B4" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </Link>

                  {/* Description on hover */}
                  <AnimatePresence>
                    {activeItem === index && (
                      <motion.p
                        className="absolute left-1/2 -translate-x-1/2 mt-0.5 text-[#72383D] text-xs md:text-sm tracking-widest uppercase whitespace-nowrap"
                        initial={{ opacity: 0, y: -15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.nav>

            {/* Bottom Info */}
            <motion.div
              className="absolute bottom-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-[#72383D] text-xs tracking-[0.3em] uppercase">
                Collection 2026
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
