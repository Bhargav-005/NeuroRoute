"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  Zap, 
  PiggyBank, 
  ShieldCheck, 
  Cpu, 
  ArrowUpRight,
  Clock,
  Sparkles,
  Play,
  TrendingUp,
  AlertCircle,
  ShieldAlert,
  Power,
  RotateCcw
} from "lucide-react"
import { useState } from "react"
import LiveRequestStream from "@/components/live-request-stream"
import ProviderHealthPanel from "@/components/provider-health-panel"
import PrivacyShieldPanel from "@/components/privacy-shield-panel"
import CreditWalletPanel from "@/components/credit-wallet-panel"

export default function Dashboard() {
  const [prompt, setPrompt] = useState("")
  const [routing, setRouting] = useState(false)
  const [result, setResult] = useState(null)
  const [isFailureActive, setIsFailureActive] = useState(false)

  const handleQuickRoute = () => {
    if (!prompt) return
    setRouting(true)
    setResult(null)
    setTimeout(() => {
      // Simulate rerouting if failure is active
      const model = isFailureActive ? "Claude 3.5 Sonnet (Anthropic)" : "GPT-4o (OpenAI)"
      setResult({
        model,
        latency: "112ms",
        cost: "$0.0012",
        quality: "0.98",
        reason: isFailureActive ? "OpenAI down: Automatic Failover to Claude" : "Lowest latency + High Quality match"
      })
      setRouting(false)
    }, 1500)
  }

  const statusStats = [
    { label: "Optimal Routing", value: "94.2%", icon: TrendingUp, color: "text-green-600 bg-green-50" },
    { label: "Active Models", value: isFailureActive ? "11/12" : "12/12", icon: Cpu, color: "text-blue-600 bg-blue-50" },
    { label: "Cost Savings", value: "$4.2k", icon: PiggyBank, color: "text-orange-600 bg-orange-50" },
    { label: "Avg Latency", value: isFailureActive ? "142ms" : "128ms", icon: Zap, color: "text-purple-600 bg-purple-50" },
  ]

  return (
    <div className="space-y-4 pb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-serif text-[#41431B]">AI Control Center</h1>
            <p className="text-[#AEB784] text-[10px]">NeuroRoute is automatically optimizing your requests in real-time.</p>
         </div>
         <div className="flex items-center gap-4">
            <AnimatePresence mode="wait">
              {isFailureActive && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 px-6 py-2.5 bg-red-50 text-red-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-red-100 shadow-sm animate-pulse"
                >
                  <ShieldAlert size={16} /> Failover Protocol Active
                </motion.div>
              )}
            </AnimatePresence>
            <button 
               onClick={() => setIsFailureActive(!isFailureActive)}
               className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg border outline-none ${
                  isFailureActive 
                  ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' 
                  : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100'
               }`}
            >
               {isFailureActive ? <RotateCcw size={14} /> : <Power size={14} />}
               {isFailureActive ? 'Restore System' : 'Simulate Failure'}
            </button>
            <span className="flex items-center gap-2 px-6 py-2.5 bg-green-50 text-green-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-green-100 shadow-sm">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Optimization Active
            </span>
         </div>
      </div>

      {/* Quick Prompt Box */}
      <div className="bg-white p-1 rounded-[1.5rem] border border-[#E3DBBB] shadow-lg shadow-[#41431B]/5 relative group overflow-hidden">
         <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="p-4 space-y-3 relative z-10">
            <div className="flex items-center gap-3 text-[#AEB784] mb-0.5 px-1">
               <Sparkles size={14} />
               <p className="text-[9px] font-bold uppercase tracking-widest">Quick Prompt Routing</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
               <input 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type a task to route intelligently..." 
                className="flex-grow bg-transparent text-lg font-medium text-[#41431B] outline-none placeholder:text-[#AEB784]/40 px-2"
              />
              <button 
                onClick={handleQuickRoute}
                disabled={routing || !prompt}
                className="px-6 py-2.5 bg-[#41431B] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#AEB784] transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
              >
                {routing ? <div className="w-3 h-3 rounded-full border-2 border-white/20 border-t-white animate-spin" /> : <Play size={14} fill="currentColor" />}
                Route Instantly
              </button>
            </div>

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-6 border-t border-[#E3DBBB]/30 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784]">Selected Model</p>
                  <p className={`text-sm font-bold ${isFailureActive ? 'text-red-500' : 'text-[#41431B]'}`}>{result.model}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784]">Efficiency Latency</p>
                  <p className="text-sm font-bold text-green-600">{result.latency}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784]">Estimated Cost</p>
                  <p className="text-sm font-bold text-[#41431B]">{result.cost}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784]">Reasoning</p>
                  <p className={`text-sm font-bold ${isFailureActive ? 'text-red-600 font-medium' : 'text-[#41431B]'}`}>{result.reason}</p>
                </div>
              </motion.div>
            )}
          </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statusStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-white p-4 rounded-2xl shadow-sm border transition-all group overflow-hidden relative ${
               isFailureActive && (stat.label === "Active Models" || stat.label === "Avg Latency")
               ? 'border-red-200'
               : 'border-[#E3DBBB]'
            }`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 text-[#41431B] pointer-events-none group-hover:scale-110 transition-transform">
               <stat.icon size={40} />
            </div>
            <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isFailureActive && (stat.label === "Active Models" || stat.label === "Avg Latency")
                  ? 'bg-red-50 text-red-600'
                  : stat.color
               }`}>
                  <stat.icon size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784] mb-0.5">{stat.label}</p>
                  <h3 className={`text-3xl font-serif ${
                     isFailureActive && (stat.label === "Active Models" || stat.label === "Avg Latency")
                     ? 'text-red-600'
                     : 'text-[#41431B]'
                  }`}>{stat.value}</h3>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 pt-1">
         {/* Live Request Stream & Privacy Shield (Central Focus) */}
         <div className="lg:col-span-2 space-y-4">
            <LiveRequestStream isFailureActive={isFailureActive} />
            <PrivacyShieldPanel />
         </div>

         {/* Sidebar Panels */}
         <div className="space-y-6">
            {/* Credit Wallet Panel - Prominent Placement */}
            <CreditWalletPanel />

            {/* Provider Health Panel */}
            <ProviderHealthPanel isFailureActive={isFailureActive} />

            {/* Routing Preference Highlight */}
            <div className="space-y-4">
               <h3 className="text-base font-serif text-[#41431B] px-1 flex items-center justify-between">
                  Routing Logic
                  <ShieldCheck className="text-[#AEB784]" size={16} />
               </h3>
               <div className="bg-[#41431B] rounded-[1.5rem] p-6 text-[#F8F3E1] space-y-4 relative overflow-hidden shadow-xl">
                  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  
                  <div className="space-y-3 relative z-10">
                     <div className="space-y-0.5">
                        <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Active Strategy</p>
                        <h3 className="text-xl font-serif">Balanced (Core)</h3>
                     </div>
                     <p className="text-[10px] leading-relaxed opacity-60 font-medium">NeuroRoute is currently managing 100% of your provider traffic. No API keys or manual tokens required.</p>
                     
                     <div className="space-y-4 pt-4">
                        {[
                        { label: "Cost Offset", health: 92, val: "$4,204 saved" },
                        { label: "Stability Index", health: 100, val: "100% uptime" },
                        { label: "Failover Rate", health: 12, val: "0% data loss" },
                        ].map((model) => (
                        <div key={model.label} className="space-y-2">
                           <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest">
                              <span className="opacity-60">{model.label}</span>
                              <span className="text-[#AEB784]">{model.val}</span>
                           </div>
                           <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                              <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${model.health}%` }}
                                 className="h-full bg-[#AEB784]"
                              />
                           </div>
                        </div>
                        ))}
                     </div>
                  </div>
                  
                  <AnimatePresence>
                    {!isFailureActive ? (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 border-t border-white/10 relative z-10"
                      >
                         <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3 border border-white/5 hover:bg-white/10 transition-colors">
                            <AlertCircle className="text-orange-400" size={18} />
                            <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">System successfully bypassed US-East latency spike.</p>
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 border-t border-white/10 relative z-10"
                      >
                         <div className="bg-red-500/20 p-4 rounded-2xl flex items-center gap-3 border border-red-500/30 transition-colors">
                            <ShieldAlert className="text-red-400" size={18} />
                            <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed text-red-100">OpenAI Failure Detected. 100% traffic rerouted to Claude 3.5.</p>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
