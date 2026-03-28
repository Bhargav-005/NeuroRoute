"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap, PiggyBank, ShieldCheck, Sparkles } from "lucide-react"
import RotatingBars from "./rotating-bars"
import Link from "next/link"

export default function Hero() {
  const metrics = [
    { value: "↓ Latency", icon: <Zap size={20} className="text-[#393E46]" /> },
    { value: "↓ Cost", icon: <PiggyBank size={20} className="text-[#393E46]" /> },
    { value: "No Setup", icon: <Sparkles size={20} className="text-[#393E46]" /> },
  ]

  return (
    <section className="relative min-h-[90vh] bg-white overflow-hidden flex items-center">
      {/* Rotating Bars Background */}
      <div className="absolute right-0 top-0 w-full h-full lg:w-3/5 pointer-events-none">
        <RotatingBars />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-[#222831]" />
            <span className="text-sm font-bold tracking-widest text-[#393E46] uppercase">Plug-and-Play AI Logic</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="font-serif text-6xl sm:text-7xl lg:text-8xl text-[#222831] leading-[1.05] tracking-tight mb-8"
          >
            Route every AI
            <br />
            prompt instantly
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="w-48 h-1.5 bg-[#D0D0D0] origin-left mb-12"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg lg:text-xl text-[#393E46] max-w-lg leading-relaxed mb-10 font-medium"
          >
            NeuroRoute automatically selects the best model per request. 
            No API keys. No configuration. Just intelligent orchestration.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 bg-[#222831] text-white px-8 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#222831]/90 transition-all shadow-xl shadow-[#222831]/10"
              >
                Start Routing Instantly
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#222831] px-8 py-5 rounded-full font-bold text-sm uppercase tracking-widest border border-[#D0D0D0] hover:bg-[#F5F5F5] transition-all"
              >
                View Live Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Core Metrics Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-x-12 gap-y-6 pt-10 border-t border-[#EAEAEA]"
          >
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2.5 bg-[#F5F5F5] rounded-xl text-[#393E46]">
                  {metric.icon}
                </div>
                <div className="text-xl font-bold text-[#222831] uppercase tracking-tighter">
                  {metric.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
