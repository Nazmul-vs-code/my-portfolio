"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-base-100 overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Aura container */}
      <div className="relative flex items-center justify-center">
        {/* Glowing Aura Rings */}
        <motion.div
          animate={{
            scale: [1, 2, 2.5],
            opacity: [0.8, 0.4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute w-32 h-32 rounded-full bg-primary/40 blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.8, 2.2],
            opacity: [0.6, 0.2, 0],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute w-32 h-32 rounded-full bg-accent/30 blur-xl"
        />
        
        {/* Core text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 font-display text-4xl sm:text-6xl font-bold gradient-text tracking-tighter"
        >
          {"<Dev />"}
        </motion.div>
      </div>
    </motion.div>
  );
}
