"use client";

import { motion } from "framer-motion";

export default function HalftoneBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      
      {/* Dot Grid */}
      <motion.div
        animate={{
          opacity: [0.4, 0.55, 0.4],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(15,23,42,0.16) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(circle at center, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 20%, transparent 80%)",
        }}
      />

      {/* Mouse Glow */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl"
      />

      {/* Secondary Glow */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-slate-300/20 blur-3xl"
      />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-56 w-full bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}