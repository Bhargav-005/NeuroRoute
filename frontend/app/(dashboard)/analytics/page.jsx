"use client"

import { motion } from "framer-motion"
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Calendar,
  ChevronDown,
  Info,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  DollarSign,
  ArrowUpRight,
  MousePointer2,
  Filter
} from "lucide-react"

const COST_SAVINGS_DATA = [45, 52, 48, 65, 72, 68, 85, 92, 88, 105, 112, 128]
const LATENCY_DATA = [180, 165, 172, 150, 142, 148, 130, 122, 128, 115, 108, 98]
const ACCURACY_DATA = [72, 75, 78, 82, 85, 84, 88, 91, 93, 94, 96, 98]

const LineChart = ({ data, color, max, label }) => {
  const points = data.map((val, i) => `${(i / (data.length - 1)) * 100},${(1 - val / max) * 100}`).join(" ")
  
  return (
    <div className="relative h-64 w-full group/chart pt-8">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        {/* Baseline Line */}
        <line x1="0" y1="90" x2="100" y2="90" stroke="#E3DBBB" strokeWidth="0.5" strokeDasharray="2 2" />
        
        {/* Area */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          d={`M 0 100 L ${points} L 100 100 Z`}
          fill={color}
        />
        
        {/* Line */}
        <motion.polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          points={points}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* High Points Dots */}
        {data.map((val, i) => (
          <motion.circle
            key={i}
            cx={(i / (data.length - 1)) * 100}
            cy={(1 - val / max) * 100}
            r="1.2"
            fill={color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="group-hover/chart:r-2 transition-all"
          />
        ))}
      </svg>
      
      {/* Tooltip Simulation */}
      <div className="absolute top-0 right-0 p-4 bg-white border border-[#E3DBBB] rounded-2xl shadow-xl shadow-[#41431B]/5 opacity-0 group-hover/chart:opacity-100 transition-opacity">
         <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784] mb-1">{label}</p>
         <p className="text-xl font-serif text-[#41431B]">{data[data.length - 1]}% Optimized</p>
      </div>
    </div>
  )
}

export default function AnalyticsView() {
  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-4xl font-serif text-[#41431B]">Efficiency Insights</h1>
            <p className="text-[#AEB784] text-sm mt-1">NeuroRoute's impact on cost, latency, and token optimization.</p>
         </div>
         
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#E3DBBB] text-xs font-bold uppercase tracking-widest text-[#41431B] hover:bg-[#F5F5F5] transition-all shadow-sm group">
               <Filter size={16} className="text-[#AEB784] group-hover:text-[#41431B] transition-colors" /> Last 30 Days <ChevronDown size={14} />
            </button>
            <button className="px-5 py-3 rounded-2xl bg-[#41431B] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#AEB784] transition-all shadow-lg shadow-[#41431B]/10">Download Efficiency Report</button>
         </div>
      </div>

      {/* Hero Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
         {[
           { label: "Cost Saved vs Naive", icon: DollarSign, val: "$4,204.50", desc: "Automated routing efficiency", color: "text-green-600 bg-green-50" },
           { label: "Latency Improv.", icon: Zap, val: "-142ms", desc: "Global cluster optimization", color: "text-blue-600 bg-blue-50" },
           { label: "Token Efficiency", icon: Sparkles, val: "94.2%", desc: "Optimal model allocation", color: "text-orange-600 bg-orange-50" },
         ].map((card, i) => (
           <motion.div 
             key={i} 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white p-10 rounded-[2.5rem] border border-[#E3DBBB] hover:shadow-xl hover:shadow-[#41431B]/5 transition-all text-center group"
           >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${card.color}`}>
                 <card.icon size={28} />
              </div>
              <h3 className="text-4xl font-serif text-[#41431B] mb-2">{card.val}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784] mb-4">{card.label}</p>
              <p className="text-xs font-medium text-[#AEB784] opacity-60 leading-relaxed px-4">{card.desc}</p>
           </motion.div>
         ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
         {/* Cost Saved Chart */}
         <div className="bg-white rounded-[2.5rem] p-12 border border-[#E3DBBB] shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-16">
               <div className="space-y-2 px-1">
                  <h3 className="text-2xl font-serif text-[#41431B]">Cost Saved vs Baseline</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#AEB784] opacity-60">NeuroRoute Efficiency vs GPT-4o Baseline</p>
               </div>
               <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-sm">
                  <TrendingUp size={14} /> +32% Profitability
               </div>
            </div>
            <LineChart data={COST_SAVINGS_DATA} color="#AEB784" max={150} label="Cost Efficiency" />
            <div className="flex justify-between mt-10 px-4 text-[10px] font-bold uppercase tracking-widest text-[#AEB784] opacity-40 italic">
               <span>Week 1 (Baseline)</span>
               <span>Week 4 (Active Routing)</span>
            </div>
         </div>

         {/* Latency Chart */}
         <div className="bg-white rounded-[2.5rem] p-12 border border-[#E3DBBB] shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-16">
               <div className="space-y-2 px-1">
                  <h3 className="text-2xl font-serif text-[#41431B]">Latency Improvement</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#AEB784] opacity-60">Global Cluster Access Times (ms)</p>
               </div>
               <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-sm">
                   <Zap size={14} /> -142ms Avg Latency
               </div>
            </div>
            <LineChart data={LATENCY_DATA} color="#41431B" max={200} label="Network Speed" />
            <div className="flex justify-between mt-10 px-4 text-[10px] font-bold uppercase tracking-widest text-[#AEB784] opacity-40 italic">
               <span>Week 1 (Congested)</span>
               <span>Week 4 (Optimized Path)</span>
            </div>
         </div>

         {/* Accuracy / Routing Success Chart */}
         <div className="lg:col-span-2 bg-[#41431B] rounded-[3rem] p-12 text-[#F8F3E1] shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="max-w-md space-y-6">
                  <h3 className="text-4xl font-serif">Self-Healing Infrastructure</h3>
                  <p className="text-sm leading-relaxed opacity-60 font-medium">NeuroRoute's accuracy and stability improve every hour. The system identifies seabed cable latency spikes and provider downtime instantly.</p>
                  
                  <div className="grid grid-cols-2 gap-6 pt-4">
                     <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 space-y-2">
                        <Activity className="text-blue-400" size={24} />
                        <h4 className="text-xl font-bold">100%</h4>
                        <p className="text-[9px] font-bold uppercase opacity-40 tracking-widest">Uptime Index</p>
                     </div>
                     <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 space-y-2">
                        <ShieldCheck className="text-green-400" size={24} />
                        <h4 className="text-xl font-bold">98%</h4>
                        <p className="text-[9px] font-bold uppercase opacity-40 tracking-widest">Routing Accuracy</p>
                     </div>
                  </div>
               </div>
               <div className="flex-grow w-full max-w-xl">
                  <LineChart data={ACCURACY_DATA} color="#AEB784" max={100} label="System Intelligence" />
                  <div className="flex justify-between mt-10 px-4 text-[10px] font-bold uppercase tracking-widest text-white/40 italic">
                     <span>Historical Baseline</span>
                     <span>Current Stability Peak</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
