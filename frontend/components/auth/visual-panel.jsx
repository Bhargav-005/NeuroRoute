"use client"

import { motion } from "framer-motion"

export default function VisualPanel() {
  return (
    <div className="relative w-full h-full bg-[#41431B] overflow-hidden flex items-center justify-center">
      {/* Soft background noise or texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Abstract Animated Network */}
      <div className="relative w-full h-full max-w-md max-h-md">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Connecting Lines */}
          <motion.path
            d="M100 200 L200 100 L300 200 L200 300 Z"
            fill="none"
            stroke="#AEB784"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ originX: "200px", originY: "200px" }}
          />
          <motion.path
            d="M50 200 L200 50 L350 200 L200 350 Z"
            fill="none"
            stroke="#AEB784"
            strokeWidth="0.3"
            strokeDasharray="8 8"
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ originX: "200px", originY: "200px" }}
          />

          {/* Floating Nodes */}
          {[
            { cx: 100, cy: 200, delay: 0 },
            { cx: 200, cy: 100, delay: 1 },
            { cx: 300, cy: 200, delay: 0.5 },
            { cx: 200, cy: 300, delay: 1.5 },
            { cx: 200, cy: 200, delay: 2, r: 12 },
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r={node.r || 6}
              fill={i === 4 ? "#E3DBBB" : "#AEB784"}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + node.delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.delay,
              }}
            />
          ))}

          {/* Core Pulse */}
          <motion.circle
            cx="200"
            cy="200"
            r="40"
            stroke="#E3DBBB"
            strokeWidth="0.5"
            fill="none"
            animate={{
              scale: [1, 2],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </svg>

        {/* Floating Text/Labels (Optional) */}
        <motion.div
           animate={{ y: [-5, 5, -5] }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        >
           <h3 className="text-[#E3DBBB] font-serif text-2xl opacity-40 select-none">NeuroRoute</h3>
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#AEB784]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#E3DBBB]/10 rounded-full blur-3xl animate-pulse delay-700" />
    </div>
  )
}
