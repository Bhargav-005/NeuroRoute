"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Zap, 
  Target, 
  Rocket, 
  ChevronRight, 
  CheckCircle2, 
  Coins, 
  ShieldCheck,
  Sparkles
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [preference, setPreference] = useState("balanced")
  const router = useRouter()

  const handleComplete = () => {
    setStep(3) // Success state
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  const preferences = [
    { 
      id: "cost", 
      name: "Cost Optimized", 
      desc: "Prioritize lowest execution cost for every request.", 
      icon: Coins,
      color: "bg-green-50 text-green-600"
    },
    { 
      id: "balanced", 
      name: "Balanced", 
      desc: "Optimal trade-off between speed and cost (Recommended).", 
      icon: Target,
      color: "bg-blue-50 text-blue-600"
    },
    { 
      id: "performance", 
      name: "Performance First", 
      desc: "Lowest possible latency regardless of provider cost.", 
      icon: Zap,
      color: "bg-orange-50 text-orange-600"
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8F3E1] flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-[#41431B]/5 border border-[#E3DBBB] space-y-10"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#F8F3E1] rounded-2xl flex items-center justify-center mx-auto text-[#41431B]">
                   <Sparkles size={32} />
                </div>
                <h1 className="text-3xl font-serif text-[#41431B]">Zero-Setup Intelligence</h1>
                <p className="text-[#AEB784] font-medium leading-relaxed px-4">
                  NeuroRoute is ready. Choose your global routing preference to start optimizing instantly.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784] px-1 text-center">Select Strategy</p>
                <div className="space-y-3">
                  {preferences.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setPreference(item.id)}
                      className={`w-full p-6 rounded-3xl border-2 text-left transition-all flex items-center gap-5 group ${
                        preference === item.id 
                          ? "border-[#41431B] bg-[#41431B] text-white" 
                          : "border-[#E3DBBB]/30 hover:border-[#AEB784] bg-white text-[#41431B]"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                        preference === item.id ? "bg-white/10 text-white" : item.color
                      }`}>
                         <item.icon size={24} />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-sm uppercase tracking-wider">{item.name}</h3>
                        <p className={`text-xs mt-1 leading-snug ${preference === item.id ? "opacity-60" : "text-[#AEB784]"}`}>{item.desc}</p>
                      </div>
                      {preference === item.id && <CheckCircle2 size={24} className="text-[#AEB784]" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-5 bg-[#41431B] text-white rounded-3xl text-xs font-bold uppercase tracking-widest hover:bg-[#AEB784] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#41431B]/10"
              >
                Set Strategy <ChevronRight size={16} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-[#41431B]/5 border border-[#E3DBBB] space-y-10"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto text-green-600">
                   <ShieldCheck size={32} />
                </div>
                <h1 className="text-3xl font-serif text-[#41431B]">Ready for Traffic</h1>
                <p className="text-[#AEB784] font-medium leading-relaxed px-4">
                  No API keys or provider tokens required. NeuroRoute handles 100% of the orchestration across OpenAI, Anthropic, and Llama clusters.
                </p>
              </div>

              <div className="bg-[#F8F3E1]/50 p-8 rounded-3xl space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-white rounded-xl border border-[#E3DBBB] flex items-center justify-center text-[#41431B]">
                       <Zap size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784]">Network Connected</p>
                       <p className="text-sm font-bold text-[#41431B]">Global endpoints active</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-white rounded-xl border border-[#E3DBBB] flex items-center justify-center text-[#41431B]">
                       <Rocket size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784]">Performance</p>
                       <p className="text-sm font-bold text-[#41431B]">Automatic failover enabled</p>
                    </div>
                 </div>
              </div>

              <button
                onClick={handleComplete}
                className="w-full py-5 bg-[#41431B] text-white rounded-3xl text-xs font-bold uppercase tracking-widest hover:bg-[#AEB784] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#41431B]/10"
              >
                Start Routing Instantly <ChevronRight size={16} />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-8"
            >
               <div className="w-24 h-24 bg-[#41431B] rounded-[2.5rem] flex items-center justify-center mx-auto text-[#F8F3E1] shadow-2xl">
                  <CheckCircle2 size={48} />
               </div>
               <div className="space-y-4">
                 <h2 className="text-4xl font-serif text-[#41431B]">Deploying Insights</h2>
                 <p className="text-[#AEB784] text-lg">Your intelligent routing playground is ready.</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
