"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Certificate() {
  return (
    <section className="py-20 relative overflow-hidden bg-base-100">
      {/* Background glow and stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-primary/20 blur-[100px] rounded-full"></div>
        
        {/* Animated glowing stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.2, 1, 0.2], 
              scale: [1, 1.5, 1],
              rotate: [0, 90, 180] 
            }}
            transition={{ 
              duration: 3 + i * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-12 gradient-text"
        >
          My Certification
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="relative rounded-2xl overflow-hidden border border-base-300 shadow-[0_0_40px_rgba(var(--primary),0.15)] group cursor-pointer"
        >
          {/* Glass reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 pointer-events-none"></div>

          <Image 
            src="/certificate.png"
            alt="My Certificate"
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
}
