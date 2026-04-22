"use client";
import { useState } from "react";
import Burger from "./menu/burger";
import Stairs from "./menu/stairs";
import Menu from "./menu/menu";
import { AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen(prev => !prev);
  };

  return (
    <div>
      <div className="absolute top-6 right-6 z-1000">
    <Burger isOpen={menuIsOpen} toggleMenu={toggleMenu} />
  </div>

      <AnimatePresence mode="wait">
        {menuIsOpen && (
          <>
            <Stairs />
            <Menu closeMenu={() => setMenuIsOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}