"use client"

import { motion } from "framer-motion"
import { 
  GitBranch, 
  Cpu, 
  Settings2, 
  Database, 
  Globe,
  MonitorCheck,
  Zap,
  Clock,
  Sparkles,
  Play,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Search
} from "lucide-react"
import { useState, useEffect } from "react"
import RoutingPipeline from "@/components/routing-pipeline"
import RoutingDecisionPanel from "@/components/routing-decision-panel"

export default function RouterVisualizer() {
  const [prompt, setPrompt] = useState("")
  const [comparing, setComparing] = useState(false)
  const [decision, setDecision] = useState(null)
  const [activeStep, setActiveStep] = useState(-1)

  const handleTestRouting = () => {
    if (!prompt) return
    setComparing(true)
    setDecision(null)
    setActiveStep(0)
    
    // Simulate pipeline steps
    const timer = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= 4) {
          clearInterval(timer)
          setDecision({
            winner: "Claude 3.5 Sonnet",
            latency: 184,
            cost: "$0.0032",
            savings: "$0.0014",
            reason: "NeuroRoute selected Claude because the prompt required high-reasoning capabilities while maintaining a cost-effective latency profile.",
            scores: { cost: 85, latency: 92, quality: 98 },
            comparisons: [
              { name: "OpenAI GPT-4o", latency: "112ms", cost: "$5.00/M", status: "Suboptimal" },
              { name: "Claude 3.5 Sonnet", latency: "184ms", cost: "$3.00/M", status: "Winner" },
              { name: "Llama 3 70B", latency: "85ms", cost: "$0.10/M", status: "Low Accuracy" },
            ]
          })
          setComparing(false)
          return 4
        }
        return prev + 1
      })
    }, 800)
  }

  return (
    <div className="space-y-10 h-full pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-4xl font-serif text-[#41431B]">Intelligent Routing Engine</h1>
            <p className="text-[#AEB784] text-sm mt-1">NeuroRoute performs full task analysis before connecting you to the optimal global cluster.</p>
         </div>
         <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-green-100 shadow-sm">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Routing Mesh: Online
            </span>
         </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-10">
         {/* Main Visualizer & Input - lg:col-span-2 for better balance with sidebar and pipeline */}
         <div className="lg:col-span-3 space-y-10">
            {/* Simulation Input Area */}
            <div className="bg-white rounded-[2.5rem] border border-[#E3DBBB] p-3 shadow-xl shadow-[#41431B]/5 relative overflow-hidden group">
               <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
               <div className="p-8 space-y-6 relative z-10">
                  <div className="flex items-center gap-4 text-[#AEB784] mb-2 px-1">
                     <Layers size={18} />
                     <p className="text-[10px] font-bold uppercase tracking-widest">Global Provider Simulator</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleTestRouting()}
                      placeholder="e.g., Explain the quantum computing implications on cryptography..." 
                      className="flex-grow bg-transparent text-xl font-medium text-[#41431B] outline-none placeholder:text-[#AEB784]/40 px-2"
                    />
                    <button 
                      onClick={handleTestRouting}
                      disabled={comparing || !prompt}
                      className="px-8 py-4 bg-[#41431B] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#AEB784] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#41431B]/20 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {comparing ? <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" /> : <Play size={16} fill="currentColor" />}
                      Start Analysis
                    </button>
                  </div>
               </div>
            </div>

            {/* Decision & Visual Outcome */}
            <div className="grid lg:grid-cols-2 gap-10">
               {/* Step-by-Step Explanation Sidebar */}
               <RoutingPipeline activeStep={activeStep} />

               {/* Right side shows the selected outcome or current simulation status */}
               <RoutingDecisionPanel decision={decision} active={comparing} />
            </div>
         </div>

         {/* Side Analysis - Sticky Sidebar for Matrix */}
         <div className="lg:col-span-1 space-y-8 h-full">
            <h3 className="text-xl font-serif text-[#41431B] px-2 flex items-center justify-between">
               Provider Matrix
               <MonitorCheck className="text-[#AEB784]" size={20} />
            </h3>
            
            <div className="bg-white rounded-[2.5rem] border border-[#E3DBBB] p-8 space-y-8 shadow-sm relative sticky top-6">
               <div className="space-y-6">
                  {decision ? (
                    <div className="space-y-6">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784] mb-3 border-b border-[#E3DBBB]/30 pb-4">Efficiency Comparisons</p>
                       <div className="space-y-4">
                          {decision.comparisons.map((c, i) => (
                            <div key={i} className={`p-5 rounded-3xl border transition-all ${
                               c.status === "Winner" ? "bg-green-50 border-green-200" : "bg-[#F8F3E1]/20 border-transparent opacity-60"
                            }`}>
                               <div className="flex items-center justify-between mb-3">
                                  <p className="text-sm font-bold text-[#41431B]">{c.name.split(' ')[0]}</p>
                                  <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                                     c.status === "Winner" ? "bg-green-500 text-white" : "bg-[#41431B]/10 text-[#41431B]"
                                  }`}>{c.status}</span>
                               </div>
                               <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#AEB784]">
                                  <span>{c.latency}</span>
                                  <span>{c.cost}</span>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 opacity-30 h-[400px]">
                       <div className="p-6 bg-[#F8F3E1] rounded-[2rem]">
                          <Search size={32} className="text-[#AEB784]" />
                       </div>
                       <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#AEB784]">Awaiting simulation data</p>
                    </div>
                  )}
               </div>

               <div className="pt-10 border-t border-[#E3DBBB]/30">
                  <button className="w-full py-5 rounded-[1.5rem] bg-[#41431B] hover:bg-[#AEB784] text-white text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#41431B]/20">
                     <Settings2 size={16} /> Global Preferences
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
