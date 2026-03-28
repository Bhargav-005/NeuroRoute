"use client"

import { motion } from "framer-motion"
import { 
  Settings2, 
  Target,
  Zap,
  Coins,
  ShieldCheck
} from "lucide-react"
import { useState } from "react"

export default function SettingsView() {
  const [strategy, setStrategy] = useState("balanced")

  const strategies = [
    { id: "cost", name: "Cost Optimized", icon: Coins, desc: "Lowest token price" },
    { id: "balanced", name: "Balanced", icon: Target, desc: "Speed + Cost (Default)" },
    { id: "performance", name: "Performance First", icon: Zap, desc: "Extreme low latency" },
  ]

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-4xl font-serif text-[#41431B]">Routing Configuration</h1>
            <p className="text-[#AEB784] text-sm mt-1">Manage your global AI routing strategy and infrastructure preferences.</p>
         </div>
         <button className="px-8 py-4 rounded-full bg-[#41431B] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#AEB784] transition-all shadow-xl shadow-[#41431B]/10">
            Save Strategy
         </button>
      </div>

      <div className="max-w-4xl mx-auto w-full">
         <div className="bg-[#41431B] rounded-[2.5rem] p-12 space-y-10 shadow-2xl relative overflow-hidden text-[#F8F3E1]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#AEB784] to-transparent opacity-40 shadow-sm" />
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="flex items-center justify-between relative z-10">
               <div className="space-y-2">
                  <h3 className="text-2xl font-serif">Engine Preference</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Managed Global Routing Logic</p>
               </div>
               <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                  <ShieldCheck size={28} className="text-[#AEB784]" />
               </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 relative z-10">
               {strategies.map((s) => (
                 <button 
                   key={s.id}
                   onClick={() => setStrategy(s.id)}
                   className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center gap-4 group ${
                      strategy === s.id ? "bg-white text-[#41431B] border-white shadow-xl scale-105" : "bg-white/5 border-white/10 hover:border-[#AEB784]"
                   }`}
                 >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-md ${
                       strategy === s.id ? "bg-[#41431B] text-[#F8F3E1]" : "bg-white/10"
                    }`}>
                       <s.icon size={24} />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-[0.1em]">{s.name}</p>
                       <p className={`text-[9px] mt-1 font-medium ${strategy === s.id ? "opacity-60 text-[#41431B]" : "opacity-40"}`}>{s.desc}</p>
                    </div>
                 </button>
               ))}
            </div>

            <div className="bg-white/5 p-8 rounded-3xl relative z-10 border border-white/5 backdrop-blur-sm">
               <p className="text-xs leading-relaxed opacity-60 text-center font-medium italic">
                  Changes propagate to 12 edge clusters globally in real-time. NeuroRoute orchestration ensures 100% failover coverage regardless of strategy.
               </p>
            </div>
         </div>
      </div>
    </div>
  )
}
