"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GitBranch, Fingerprint, Zap, Sparkles, ShieldCheck, Globe } from "lucide-react"

const decisions = [
  { 
    prompt: "Summarize this legal doc", 
    winner: "GPT-4o", 
    reason: "Complexity-matched", 
    latency: "840ms",
    cost: "$0.002"
  },
  { 
    prompt: "Write a quick greeting", 
    winner: "Claude Haiku", 
    reason: "Latency-optimized", 
    latency: "120ms",
    cost: "$0.0001"
  },
  { 
    prompt: "Analyze large dataset", 
    winner: "Gemini 1.5 Pro", 
    reason: "Context-window match", 
    latency: "1.2s",
    cost: "$0.004"
  },
]

export default function GlobalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-32 lg:py-48 bg-[#F5F5F5]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-px bg-[#222831]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#393E46]">GLOBAL MESH</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-serif text-[#222831] tracking-tight leading-tight">
              Real-time
              <br />
              intelligent routing
            </h2>
            <p className="text-[#393E46] text-lg max-w-lg leading-relaxed font-medium opacity-60">
              NeuroRoute instantly evaluates prompt complexity, regional health, and token cost to find the optimal execution path—zero manual intervention required.
            </p>

            <div className="space-y-8 pt-6">
              {[
                { icon: Globe, text: "Dynamic global provider health checks" },
                { icon: ShieldCheck, text: "Zero-configuration security abstraction" },
                { icon: Zap, text: "Extreme low-latency routing overhead" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 text-[#222831] font-bold uppercase tracking-widest text-[11px] group">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-[#222831] group-hover:text-white transition-all">
                     <item.icon size={20} />
                  </div>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="bg-white p-10 lg:p-14 rounded-[3rem] border border-[#EAEAEA] shadow-2xl shadow-[#222831]/5 relative overflow-hidden group"
          >
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-transparent via-[#AEB784] to-transparent opacity-40" />
            <div className="absolute top-10 right-10 flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg font-bold text-[9px] uppercase tracking-widest animate-pulse border border-green-100">
               Live Pathing Active
            </div>
            
            <div className="space-y-6 relative z-10 pt-4">
              {decisions.map((d, i) => (
                <div 
                  key={i} 
                  className="p-8 rounded-[2rem] bg-[#F9F9F9] border border-[#EAEAEA] flex items-center justify-between group/row hover:border-[#222831] hover:bg-white transition-all shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.4em] text-[#D0D0D0] group-hover/row:text-[#AEB784] transition-colors">
                       <Sparkles size={12} fill="currentColor" /> Prompt Source
                    </div>
                    <div className="text-sm font-bold text-[#222831]">{d.prompt}</div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#D0D0D0]">Routed Cluster</div>
                    <div className="text-sm font-bold text-[#222831] flex items-center justify-end gap-3">
                       <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm" />
                       {d.winner}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="pt-10 border-t border-[#EAEAEA] flex justify-between items-center px-4">
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0D0D0] mb-1">Impact</span>
                    <span className="text-xs text-[#222831] font-bold">142ms Avg Latency</span>
                 </div>
                 <div className="flex flex-col text-right">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0D0D0] mb-1">Efficiency</span>
                    <span className="text-xs text-green-600 font-extrabold">+42% Cost Savings</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
