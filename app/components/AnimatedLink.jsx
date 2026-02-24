"use client"
import { motion } from "framer-motion";

export default function AnimatedLink({ href, children, color, target_on }) {
  return (
    <motion.a
      href={href}
      target={target_on}
      className="relative inline-block text-nowrap"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {children}
      <motion.span
        className="absolute left-0 bottom-0 h-0.5"
        style={{ backgroundColor: color }}
        variants={{
          rest: { width: 0 },
          hover: {
            width: "100%",
            transition: { duration: 0.3, ease: "easeOut" },
          },
        }}
      />
    </motion.a>
  );
}