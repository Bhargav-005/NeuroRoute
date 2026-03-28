"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  FlaskConical, 
  Settings2, 
  Zap, 
  Play,
  Share2,
  Trash2,
  Cpu,
  Clock,
  Sparkles,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  PiggyBank,
  TrendingUp,
  CpuChip
} from "lucide-react"
import { useState } from "react"

export default function Playground() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(null)

  const handleRoute = () => {
    if (!prompt) return
    setLoading(true)
    setResponse("")
    setMetadata(null)
    
    setTimeout(() => {
      setResponse("NeuroRoute analysis complete. Based on your prompt, I've determined that the optimal routing path is through the Claude 3.5 Sonnet cluster. This task required complex reasoning and precise instruction following, which Claude handles most efficiently at this latency profile.")
      setMetadata({ 
        model: "Claude 3.5 Sonnet", 
        latency: "184ms", 
        cost: "$0.0032", 
        savings: "$0.0014",
        credits: 450,
        route: "Reasoning Optimized",
        reason: "NeuroRoute selected Claude because the prompt was classified as high-complexity, requiring deep reasoning and structural analysis while maintaining a mid-range cost profile." 
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-4xl font-serif text-[#41431B]">Provider Playground</h1>
            <p className="text-[#AEB784] text-sm mt-1">Test your prompts against NeuroRoute's real-time intelligent routing clusters.</p>
         </div>
         <div className="flex items-center gap-4">
            <button className="p-4 rounded-[1.5rem] bg-white border border-[#E3DBBB] text-[#AEB784] hover:text-[#41431B] hover:shadow-md transition-all">
               <Share2 size={24} />
            </button>
            <button 
              onClick={handleRoute}
              disabled={loading || !prompt}
              className="px-8 py-4 rounded-[1.5rem] bg-[#41431B] text-white flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:bg-[#AEB784] transition-all shadow-xl shadow-[#41431B]/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
               {loading ? <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" /> : <Play size={20} fill="currentColor" />}
               Route Prompt
            </button>
         </div>
      </div>

      <div className="flex-grow grid lg:grid-cols-2 gap-10 min-h-0">
         {/* Left Side: Input & Strategy */}
         <div className="flex flex-col space-y-8 overflow-y-auto pr-2 no-scrollbar">
            <div className="bg-white rounded-[2.5rem] border border-[#E3DBBB] flex-grow flex flex-col p-10 shadow-xl shadow-[#41431B]/5 relative overflow-hidden group">
               <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#AEB784] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
               <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl font-serif text-[#41431B]">Prompt Context</h3>
                  <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#F8F3E1] text-[#41431B] rounded-2xl font-bold text-[10px] uppercase tracking-widest border border-[#E3DBBB]/30 shadow-sm">
                     <Sparkles size={12} fill="currentColor" /> Strategy: Balanced
                  </div>
               </div>
               <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask anything. NeuroRoute clusters will handle the complexity automatically..."
                  className="flex-grow bg-transparent text-[#41431B] text-xl outline-none resize-none placeholder:opacity-30 font-medium leading-relaxed"
               />
            </div>

            {/* Parameter Sliders */}
            <div className="bg-white rounded-[2.5rem] border border-[#E3DBBB] p-10 shadow-sm grid grid-cols-2 gap-10 relative overflow-hidden">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center px-1">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784]">Temperature</label>
                     <span className="text-xs font-bold text-[#41431B]">0.7</span>
                  </div>
                  <input type="range" className="w-full accent-[#41431B] h-1.5 bg-[#F8F3E1] rounded-full appearance-none cursor-pointer" />
               </div>
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center px-1">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784]">Max Tokens</label>
                     <span className="text-xs font-bold text-[#41431B]">2.5k</span>
                  </div>
                  <input type="range" className="w-full accent-[#41431B] h-1.5 bg-[#F8F3E1] rounded-full appearance-none cursor-pointer" />
               </div>
            </div>
         </div>

         {/* Right Side: Response & Live Logic */}
         <div className="flex flex-col space-y-8 overflow-y-auto pr-2 no-scrollbar">
            <div className="bg-[#41431B] rounded-[2.5rem] min-h-[400px] flex flex-col p-12 text-[#F8F3E1] relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               
               <div className="flex items-center gap-4 mb-12 relative z-10">
                  <div className="p-3 bg-white/10 rounded-2xl">
                     <Zap size={24} className="text-[#AEB784]" />
                  </div>
                  <div>
                     <h3 className="text-2xl font-serif">Engine Output</h3>
                     {loading && <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 animate-pulse mt-1">Live routing active...</div>}
                  </div>
               </div>

               <div className="flex-grow relative z-10 overflow-y-auto pr-4 no-scrollbar">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                         <div className="h-6 w-full bg-white/5 rounded-2xl animate-pulse" />
                         <div className="h-6 w-5/6 bg-white/5 rounded-2xl animate-pulse delay-75" />
                         <div className="h-6 w-4/6 bg-white/5 rounded-2xl animate-pulse delay-150" />
                      </motion.div>
                    ) : (
                      <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl leading-relaxed text-white/80 font-medium whitespace-pre-wrap">
                        {response || "Ready to evaluate. Enter your prompt and click Route to see NeuroRoute's path selection clusters in action. No manual provider setup required."}
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>

            {/* Routing Explanation Section */}
            <AnimatePresence>
              {metadata && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2.5rem] border border-[#E3DBBB] p-10 shadow-xl shadow-[#41431B]/5 relative overflow-hidden group space-y-10"
                >
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  
                  <div className="flex items-center justify-between border-b border-[#E3DBBB]/30 pb-6">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 rounded-2xl text-green-600">
                           <ShieldCheck size={20} />
                        </div>
                        <h3 className="text-xl font-serif text-[#41431B]">Routing Explanation</h3>
                     </div>
                     <div className="flex items-center gap-2 px-4 py-2 bg-[#41431B] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        <Sparkles size={12} fill="currentColor" /> {metadata.credits} Credits Earned
                     </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                    {[
                      { label: "Selected Model", value: metadata.model, icon: Cpu, color: "text-[#41431B]" },
                      { label: "Latency Improv.", value: metadata.latency, icon: Clock, color: "text-green-600" },
                      { label: "Cost Offset", value: metadata.cost, icon: DollarSign, color: "text-[#41431B]" },
                      { label: "Savings ACHIEVED", value: metadata.savings, icon: PiggyBank, color: "text-blue-600" },
                    ].map((item, i) => (
                      <div key={item.label} className="space-y-2">
                        <div className="flex items-center gap-2 text-[#AEB784]">
                           <item.icon size={14} />
                           <p className="text-[9px] font-bold uppercase tracking-widest leading-none">{item.label}</p>
                        </div>
                        <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-[#F8F3E1]/40 rounded-3xl border border-[#E3DBBB]/30 space-y-3 relative group-hover:bg-[#F8F3E1]/60 transition-colors">
                     <div className="flex items-center gap-2 text-[#41431B]">
                        <TrendingUp size={16} />
                        <h4 className="text-[10px] font-bold uppercase tracking-widest">Decision Reasoning</h4>
                     </div>
                     <p className="text-xs font-medium text-[#AEB784] leading-relaxed">
                       {metadata.reason}
                     </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  )
}
