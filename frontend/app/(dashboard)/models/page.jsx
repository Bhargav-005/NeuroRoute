"use client"

import { motion } from "framer-motion"
import { 
  Search, 
  Cpu, 
  Zap, 
  Coins,
  Star,
  Info,
  ChevronRight,
  ShieldCheck,
  ZapOff
} from "lucide-react"
import { useState } from "react"

const models = [
  { name: "GPT-4o", provider: "OpenAI", cost: "$5.00/M", latency: "120ms", quality: "0.98", rating: 4.9, tags: ["Vision", "High Quality"], status: "Active" },
  { name: "Claude 3.5 Sonnet", provider: "Anthropic", cost: "$3.00/M", latency: "145ms", quality: "0.96", rating: 4.8, tags: ["Safe", "Long Context"], status: "Active" },
  { name: "Llama 3 70B", provider: "Meta", cost: "$0.10/M", latency: "85ms", quality: "0.92", rating: 4.5, tags: ["Open Source", "Fast"], status: "Active" },
  { name: "Gemini 1.5 Pro", provider: "Google", cost: "$7.00/M", latency: "180ms", quality: "0.94", rating: 4.7, tags: ["Multimodal", "Video"], status: "Degraded" },
  { name: "GPT-4o Mini", provider: "OpenAI", cost: "$0.15/M", latency: "50ms", quality: "0.88", rating: 4.4, tags: ["Cheap", "Ultra-Fast"], status: "Active" },
  { name: "Mistral Large 2", provider: "Mistral", cost: "$2.00/M", latency: "130ms", quality: "0.95", rating: 4.6, tags: ["Enterprise", "Code"], status: "Active" },
]

export default function ModelsGrid() {
  const [filter, setFilter] = useState("all")

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-4xl font-serif text-[#41431B]">Available Clusters</h1>
            <p className="text-[#AEB784] text-sm mt-1">Managed AI endpoints used automatically by NeuroRoute's real-time engine.</p>
         </div>
         
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 px-5 py-3.5 bg-white rounded-2xl border border-[#E3DBBB] min-w-[320px] shadow-sm">
               <Search size={18} className="text-[#AEB784]" />
               <input type="text" placeholder="Search models..." className="bg-transparent text-sm outline-none w-full placeholder:text-[#AEB784]/40 text-[#41431B] font-medium" />
            </div>
         </div>
      </div>

      {/* Info Banner */}
      <div className="bg-[#41431B] p-8 rounded-[2.5rem] text-[#F8F3E1] flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden group">
         <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
         <div className="flex items-center gap-6 relative z-10">
            <div className="h-16 w-16 bg-[#AEB784] rounded-2xl flex items-center justify-center text-[#41431B] shadow-2xl">
               <ShieldCheck size={32} />
            </div>
            <div>
               <h3 className="text-xl font-serif">Dynamic Selection Active</h3>
               <p className="text-sm font-medium opacity-60 leading-relaxed mt-1">NeuroRoute dynamically picks between 42+ models for zero execution friction.</p>
            </div>
         </div>
         <button className="px-8 py-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl text-[10px] uppercase font-bold tracking-widest relative z-10 flex items-center gap-2">
            Learn Selection Logic <ChevronRight size={14} />
         </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {models.map((model, i) => (
           <motion.div
             key={model.name}
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.05 }}
             className="bg-white p-8 rounded-[2.5rem] border border-[#E3DBBB] hover:shadow-2xl hover:shadow-[#41431B]/5 transition-all group relative overflow-hidden"
           >
              {/* Status Badge */}
              <div className={`absolute top-0 right-0 p-8 text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 ${
                 model.status === "Active" ? "text-green-500" : "text-orange-500"
              }`}>
                 <div className={`w-1.5 h-1.5 rounded-full ${model.status === "Active" ? "bg-green-500" : "bg-orange-500"} ${model.status === "Active" ? "animate-pulse" : ""}`} />
                 {model.status}
              </div>

              <div className="mb-8">
                 <div className="w-16 h-16 rounded-[1.5rem] bg-[#F8F3E1] flex items-center justify-center text-[#41431B] mb-6 group-hover:scale-110 transition-transform">
                    <Cpu size={32} />
                 </div>
                 <h3 className="text-2xl font-serif text-[#41431B] mb-1">{model.name}</h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-[#AEB784] opacity-80">Managed by NeuroRoute</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-[#F8F3E1]/40 p-4 rounded-2xl border border-transparent group-hover:bg-[#F8F3E1] group-hover:border-[#E3DBBB]/30 transition-all">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784] mb-1.5 flex items-center gap-2"><Coins size={12} /> Cost</p>
                    <p className="text-sm font-bold text-[#41431B]">{model.cost}</p>
                 </div>
                 <div className="bg-[#F8F3E1]/40 p-4 rounded-2xl border border-transparent group-hover:bg-[#F8F3E1] group-hover:border-[#E3DBBB]/30 transition-all">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784] mb-1.5 flex items-center gap-2"><Zap size={12} /> Latency</p>
                    <p className="text-sm font-bold text-[#41431B]">{model.latency}</p>
                 </div>
              </div>

              <div className="space-y-3 mb-10">
                 <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784] flex items-center gap-2">
                       <Star size={12} /> Quality Score
                    </span>
                    <span className="text-xs font-bold text-[#41431B]">{model.quality}</span>
                 </div>
                 <div className="h-1.5 w-full bg-[#F5F5F5] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${parseFloat(model.quality) * 100}%` }} className="h-full bg-[#41431B]" />
                 </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E3DBBB]/30">
                 {model.tags.map(tag => (
                   <span key={tag} className="px-3 py-1.5 bg-[#F8F3E1]/40 text-[#41431B]/60 text-[9px] font-bold uppercase tracking-[0.1em] rounded-lg">{tag}</span>
                 ))}
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  )
}
