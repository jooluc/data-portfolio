"use client";
import { motion } from "framer-motion";
export default function HalftoneBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fine Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(15,23,42) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(15,23,42) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
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