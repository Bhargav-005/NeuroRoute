"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="cta" className="py-24 lg:py-48" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[3rem] bg-[#222831] p-16 lg:p-32 text-center shadow-2xl shadow-[#222831]/20"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1f26] via-[#222831] to-[#393E46] opacity-40" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-[0.02] rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white opacity-[0.02] rounded-full blur-[100px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10">
                 <Sparkles size={32} />
              </div>
              <h2 className="text-5xl lg:text-7xl font-serif text-white tracking-tight leading-tight">
                Zero Configuration. 
                <br />
                Instant Intelligence.
              </h2>
            </div>
            
            <p className="text-xl text-[#D0D0D0] opacity-60 leading-relaxed font-medium">
              Stop managing API keys and model timeouts. Switch to NeuroRoute for 
              automated routing across the world's most powerful AI clusters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-3 bg-white text-[#222831] px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all hover:bg-[#F5F5F5] shadow-2xl shadow-white/5"
                >
                  Start Routing Instantly
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-3 bg-transparent text-white border border-white/20 px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all hover:bg-white/10 backdrop-blur-sm"
                >
                  Watch Path Analysis
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
