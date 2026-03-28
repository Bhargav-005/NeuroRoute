"use client"

import { motion } from "framer-motion"
import { 
  ShieldCheck, 
  Activity, 
  Zap, 
  Globe, 
  Cpu, 
  CpuChip,
  MessageCircle,
  Clock,
  PiggyBank
} from "lucide-react"

export default function RoutingDecisionPanel({ decision = null, active = false }) {
  if (!decision && !active) return (
     <div className="bg-[#41431B] rounded-[2.5rem] p-12 text-[#F8F3E1] space-y-10 min-h-[520px] relative overflow-hidden flex items-center justify-center border border-white/5 opacity-40">
        <div className="text-center space-y-4">
           <Globe size={48} className="mx-auto text-white/20" />
           <p className="text-xs font-bold uppercase tracking-widest text-white/30 italic">Decision Engine Idle: Enter a prompt to begin</p>
        </div>
     </div>
  )

  if (active) return (
     <div className="bg-[#41431B] rounded-[2.5rem] p-12 text-[#F8F3E1] space-y-10 min-h-[520px] relative overflow-hidden flex items-center justify-center border border-white/5 shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="text-center space-y-6 relative z-10">
           <motion.div
             animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="w-16 h-16 rounded-3xl border-2 border-[#AEB784] flex items-center justify-center mx-auto"
           >
              <Cpu size={32} className="text-[#AEB784]" />
           </motion.div>
           <p className="text-sm font-serif italic text-white/60">"NeuroRoute is now determining the optimal global cluster for your request..."</p>
        </div>
     </div>
  )

  return (
    <div className="bg-[#41431B] rounded-[2.5rem] p-10 text-[#F8F3E1] space-y-10 min-h-[520px] relative overflow-hidden shadow-2xl border border-white/5 group">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      <div className="space-y-8 relative z-10">
         <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-[#AEB784]">
                  <MessageCircle size={20} />
               </div>
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 italic">Input Analysis Complete</p>
            </div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-serif text-white hover:text-[#AEB784] transition-colors"
            >
              Selected: {decision.winner}
            </motion.h3>
         </div>

         <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-2 group-hover:bg-white/10 transition-colors">
               <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Latency Target</p>
               <h4 className="text-xl font-bold flex items-center gap-2">
                  <Clock size={16} className="text-[#AEB784]" />
                  {decision.latency}ms
               </h4>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-2 group-hover:bg-white/10 transition-colors">
               <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Efficiency Savings</p>
               <h4 className="text-xl font-bold flex items-center gap-2 text-green-400">
                  <PiggyBank size={16} />
                  {decision.savings}
               </h4>
            </div>
         </div>

         <div className="space-y-6 pt-4">
            <div className="flex justify-between items-center px-1">
               <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 italic">Routing Logic Scoring Matrix</p>
               <span className="p-1 px-3 rounded-full bg-green-500/20 text-green-400 border border-green-500/20 text-[8px] font-bold tracking-widest">Decision Score: 0.982</span>
            </div>
            <div className="space-y-8">
               {[
                 { label: "Cost Efficiency", health: decision.scores.cost, val: "Optimized" },
                 { label: "Latency Score", health: decision.scores.latency, val: "Fastest" },
                 { label: "Quality Match", health: decision.scores.quality, val: "Exact Fit" },
               ].map((score) => (
                 <div key={score.label} className="space-y-3">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                       <span className="opacity-60">{score.label}</span>
                       <span className="text-[#AEB784]">{score.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${score.health}%` }}
                          transition={{ delay: 0.2, duration: 1 }}
                          className="h-full bg-[#AEB784]"
                       />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="pt-10 border-t border-white/10 relative z-10 flex items-start gap-4">
            <Zap className="text-orange-400 mt-1" size={20} />
            <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed opacity-60">
              {decision.reason}
            </p>
         </div>
      </div>
    </div>
  )
}
