"use client";

import React, { useState, MouseEvent, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LiquidRipple {
  x: number;
  y: number;
  id: number;
}

export default function LiquidClick({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}) {
  const [ripples, setRipples] = useState<LiquidRipple[]>([]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    // Cleanup ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 700);

    if (onClick) onClick(e);
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden liquid-wrapper ${className}`}
      onClick={handleClick}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5, backgroundColor: "var(--accent-red)" }}
            animate={{
              scale: 4,
              opacity: 0,
              backgroundColor: "rgba(192, 64, 64, 0.1)", // faded accent
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full pointer-events-none mix-blend-overlay"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 40,
              height: 40,
              marginLeft: -20,
              marginTop: -20,
            }}
          />
        ))}
      </AnimatePresence>
      <motion.div
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
