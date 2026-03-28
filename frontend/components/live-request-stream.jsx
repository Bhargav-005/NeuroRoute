"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Zap, 
  Cpu, 
  Clock, 
  Sparkles, 
  ArrowUpRight,
  TrendingUp,
  ShieldAlert,
  Search
} from "lucide-react"

const MOCK_PROMPTS = [
  "Summarize this 50-page legal document accurately.",
  "Generate a React component for a data table with sorting.",
  "Translate this sentence into 10 different languages.",
  "Write a polite email to a customer who missed a payment.",
  "Analyze the sentiment of these 100 customer reviews.",
  "Explain the difference between SQL and NoSQL in simple terms.",
  "Draft a response to this customer complaint about shipping delays.",
  "Optimize this Python function for memory efficiency.",
  "Creatively rewrite this brand mission statement for a startup.",
  "Extract all entities and dates from this meeting transcript."
]

const MODELS = ["GPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro", "Llama 3 (70B)", "Mistral Large 2"]

export default function LiveRequestStream({ isFailureActive = false }) {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const generateRequest = () => {
      const complexity = ["simple", "medium", "complex", "expert"][Math.floor(Math.random() * 4)]
      
      // Filter out OpenAI (GPT) models if failover is active
      const availableModels = isFailureActive 
        ? MODELS.filter(m => !m.includes("GPT"))
        : MODELS

      const model = availableModels[Math.floor(Math.random() * availableModels.length)]
      const latency = Math.floor(Math.random() * 800) + 100
      const cost = (Math.random() * 0.05).toFixed(4)
      const savings = (cost * (Math.random() * 0.8 + 0.2)).toFixed(4)
      const credits = Math.floor(Math.random() * 500) + 50

      return {
        id: Math.random().toString(36).substr(2, 9),
        prompt: MOCK_PROMPTS[Math.floor(Math.random() * MOCK_PROMPTS.length)],
        complexity,
        model,
        latency,
        cost,
        savings,
        credits,
        timestamp: "just now",
        isFailover: isFailureActive // Mark if it was a failover route
      }
    }

    // Set initial data
    setRequests(Array.from({ length: 5 }, generateRequest))

    const interval = setInterval(() => {
      setRequests((prev) => [generateRequest(), ...prev.slice(0, 19)])
    }, 3000)

    return () => clearInterval(interval)
  }, [isFailureActive])

  const getComplexityStyle = (complexity) => {
    switch (complexity) {
      case "simple": return "bg-green-50 text-green-600 border-green-100"
      case "medium": return "bg-blue-50 text-blue-600 border-blue-100"
      case "complex": return "bg-orange-50 text-orange-600 border-orange-100"
      case "expert": return "bg-purple-50 text-purple-600 border-purple-100"
      default: return ""
    }
  }

  return (
    <div className="bg-white rounded-[1.5rem] border border-[#E3DBBB] p-4 shadow-sm hover:shadow-lg hover:shadow-[#41431B]/5 transition-all flex flex-col space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-[#F8F3E1] rounded-2xl text-[#41431B]">
              <TrendingUp size={20} />
           </div>
           <div>
              <h3 className="text-xl font-serif text-[#41431B]">Live Request Stream</h3>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#AEB784]">Real-time Decision Engine</p>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <Search size={16} className="text-[#AEB784] opacity-40" />
           <span className="text-[10px] font-bold text-[#AEB784] uppercase tracking-widest">Active Search</span>
        </div>
      </div>

      <div className="flex-grow space-y-4 overflow-y-auto no-scrollbar min-h-0 pr-1">
        <AnimatePresence mode="popLayout" initial={false}>
          {requests.map((req) => (
            <motion.div
              layout
              key={req.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              className={`p-3 bg-[#F8F3E1]/30 rounded-2xl border border-transparent hover:border-[#E3DBBB]/50 hover:bg-white transition-all flex flex-col gap-3 group cursor-default relative overflow-hidden`}
            >
              {req.isFailover && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-red-50 border-b border-l border-red-100 rounded-bl-xl text-[8px] font-bold text-red-600 uppercase tracking-widest flex items-center gap-1.5 z-10">
                   <ShieldAlert size={10} /> Failover Route
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                 <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-bold text-[#41431B] leading-relaxed group-hover:text-[#AEB784] transition-colors line-clamp-2">
                      "{req.prompt}"
                    </p>
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border shrink-0 ${getComplexityStyle(req.complexity)}`}>
                      {req.complexity}
                    </span>
                 </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-[#E3DBBB]/20">
                <div className="space-y-1">
                   <p className="text-[9px] font-bold text-[#AEB784] uppercase tracking-widest">Routed Model</p>
                   <div className="flex items-center gap-2">
                      <Cpu size={12} className={req.isFailover ? 'text-red-400' : 'text-[#AEB784]'} />
                      <p className={`text-xs font-bold ${req.isFailover ? 'text-red-600' : 'text-[#41431B]'}`}>{req.model}</p>
                   </div>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] font-bold text-[#AEB784] uppercase tracking-widest">Latency</p>
                   <div className="flex items-center gap-2">
                      <Clock size={12} className="text-[#AEB784]" />
                      <p className="text-xs font-bold text-[#41431B]">{req.latency}ms</p>
                   </div>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] font-bold text-[#AEB784] uppercase tracking-widest">Economics</p>
                   <p className="text-xs font-bold text-green-600">-${req.savings}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-[#41431B] text-white rounded-xl text-[10px] font-bold shadow-lg shadow-[#41431B]/20">
                    <Sparkles size={10} fill="currentColor" /> {req.credits}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="pt-4 border-t border-[#E3DBBB]/30 flex justify-between items-center text-[10px] font-bold text-[#AEB784] uppercase tracking-widest">
         <p>Showing 20 of 2.1k daily requests</p>
         <div className="flex items-center gap-1 text-green-600">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            LIVE
         </div>
      </div>
    </div>
  )
}
