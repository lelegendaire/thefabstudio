"use client";
import { MenuIcon } from "../components/ui/skiper99";

export default function Burger({ isOpen, toggleMenu }) {
  return (
    <MenuIcon isOpen={isOpen} onClick={toggleMenu} className={"text-white scale-110"}/>
  );
}