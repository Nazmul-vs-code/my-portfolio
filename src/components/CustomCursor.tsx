"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const requestRef = useRef<number>(null);
  
  // For smooth trailing
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".glass-btn") ||
        target.closest(".magnetic-btn")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // RAF loop for smooth trailing orb
  useEffect(() => {
    if (isTouchDevice) return;

    const animateTrail = () => {
      setTrailPos((prev) => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      requestRef.current = requestAnimationFrame(animateTrail);
    };
    
    requestRef.current = requestAnimationFrame(animateTrail);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePosition, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Massive Glowing Aura Trail */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[-1] mix-blend-screen hidden md:block"
        style={{
          background: "radial-gradient(circle, var(--accent-red) 0%, transparent 60%)",
          opacity: 0.08,
          x: trailPos.x - 200,
          y: trailPos.y - 200,
        }}
      />
      
      {/* Interactive Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 12),
          y: mousePosition.y - (isHovering ? 24 : 12),
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
          borderColor: isHovering ? "rgba(192, 64, 64, 0.8)" : "var(--text-secondary)",
          backgroundColor: isHovering ? "rgba(192, 64, 64, 0.1)" : "transparent",
          borderWidth: isHovering ? "2px" : "1px",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          backgroundColor: isHovering ? "transparent" : "var(--text-primary)",
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 20,
        }}
      />
    </>
  );
}
