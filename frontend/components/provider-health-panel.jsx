"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Activity, 
  Globe, 
  ShieldCheck, 
  AlertCircle,
  XCircle,
  Cpu,
  Clock
} from "lucide-react"

const PROVIDERS_INITIAL = [
  { id: 'openai', name: "OpenAI", status: "healthy", latency: 210, region: "US-East" },
  { id: 'anthropic', name: "Anthropic", status: "healthy", latency: 320, region: "US-West" },
  { id: 'google', name: "Google", status: "degraded", latency: 500, region: "EU-West" },
  { id: 'meta', name: "Meta", status: "healthy", latency: 85, region: "Local" },
  { id: 'mistral', name: "Mistral", status: "healthy", latency: 130, region: "EU-Central" },
  { id: 'ollama', name: "Ollama", status: "healthy", latency: "local", region: "Edge" }
]

export default function ProviderHealthPanel({ isFailureActive = false }) {
  const [providers, setProviders] = useState(PROVIDERS_INITIAL)
  const [lastUpdated, setLastUpdated] = useState("just now")

  useEffect(() => {
    const interval = setInterval(() => {
      setProviders(prev => prev.map(p => {
        // If failover is active, keep OpenAI down
        if (isFailureActive && p.id === 'openai') {
          return { ...p, status: 'down', latency: 9999 }
        }

        // Randomly update latency if it's not "local"
        let newLatency = p.latency
        if (typeof p.latency === 'number') {
          const delta = Math.floor(Math.random() * 21) - 10 // -10 to +10
          newLatency = Math.max(50, p.latency + delta)
        }

        // Occasionally change status
        let newStatus = p.status
        const rand = Math.random()
        if (rand > 0.95) {
          newStatus = newStatus === 'healthy' ? 'degraded' : 'healthy'
        } else if (rand > 0.99) {
          newStatus = 'down'
        } else if (newStatus === 'down' && rand > 0.9) {
          newStatus = 'healthy'
        }

        return { ...p, latency: newLatency, status: newStatus }
      }))
      setLastUpdated("just now")
    }, 8000)

    const timeInterval = setInterval(() => {
      setLastUpdated("a few seconds ago")
    }, 15000)

    return () => {
      clearInterval(interval)
      clearInterval(timeInterval)
    }
  }, [isFailureActive]) // Re-run effect when isFailureActive changes

  // Immediate update when isFailureActive changes
  useEffect(() => {
    if (isFailureActive) {
      setProviders(prev => prev.map(p => 
        p.id === 'openai' ? { ...p, status: 'down', latency: 9999 } : p
      ))
    } else {
      setProviders(prev => prev.map(p => 
        p.id === 'openai' && p.status === 'down' && p.latency === 9999 
          ? { ...p, status: 'healthy', latency: 210 } 
          : p
      ))
    }
  }, [isFailureActive])

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-500'
      case 'degraded': return 'bg-yellow-500'
      case 'down': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <ShieldCheck size={14} className="text-green-600" />
      case 'degraded': return <AlertCircle size={14} className="text-yellow-600" />
      case 'down': return <XCircle size={14} className="text-red-600" />
      default: return null
    }
  }

  return (
    <div className="bg-white rounded-[1.5rem] border border-[#E3DBBB] p-4 shadow-sm hover:shadow-lg hover:shadow-[#41431B]/5 transition-all flex flex-col space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-[#F8F3E1] rounded-2xl text-[#41431B]">
              <Activity size={20} />
           </div>
           <div>
              <h3 className="text-xl font-serif text-[#41431B]">Provider Health</h3>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#AEB784]">Mesh Monitoring Active</p>
           </div>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[10px] font-bold text-[#AEB784] uppercase tracking-widest">{lastUpdated}</span>
           <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Global Live</span>
           </div>
        </div>
      </div>

      <div className="flex-grow space-y-4 pr-1">
        <AnimatePresence mode="popLayout">
          {providers.map((provider) => (
            <motion.div
              layout
              key={provider.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 bg-[#F8F3E1]/30 rounded-2xl border border-transparent hover:border-[#E3DBBB]/50 hover:bg-white transition-all flex items-center justify-between group cursor-default"
            >
              <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-xl bg-white border border-[#E3DBBB]/30 flex items-center justify-center text-[#41431B] shadow-sm group-hover:scale-110 transition-transform ${provider.status === 'down' ? 'grayscale opacity-50' : ''}`}>
                    <Cpu size={20} />
                 </div>
                 <div>
                    <h4 className={`text-sm font-bold transition-colors ${provider.status === 'down' ? 'text-red-600' : 'text-[#41431B] group-hover:text-[#AEB784]'}`}>{provider.name}</h4>
                    <p className="text-[10px] font-bold text-[#AEB784] opacity-60 uppercase tracking-widest">{provider.region}</p>
                 </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right hidden sm:block">
                   <p className="text-[9px] font-bold text-[#AEB784] uppercase tracking-widest mb-1">Latency</p>
                   <p className={`text-xs font-bold ${provider.status === 'down' ? 'text-red-400 font-mono' : 'text-[#41431B]'}`}>
                     {provider.status === 'down' ? 'TIMEOUT' : (typeof provider.latency === 'number' ? `${provider.latency}ms` : provider.latency)}
                   </p>
                </div>
                
                <div className="flex flex-col items-end gap-1.5 w-24">
                   <div className="flex items-center gap-2">
                      {getStatusIcon(provider.status)}
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${
                         provider.status === 'healthy' ? 'text-green-600' : 
                         provider.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                         {provider.status}
                      </span>
                   </div>
                   <div className="w-2 h-2 rounded-full relative">
                      <div className={`absolute inset-0 rounded-full ${getStatusColor(provider.status)}`} />
                      <div className={`absolute inset-0 rounded-full ${getStatusColor(provider.status)} ${provider.status === 'down' ? '' : 'animate-ping opacity-40'}`} />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="pt-3 border-t border-[#E3DBBB]/30">
        <button className="w-full py-2.5 rounded-xl bg-[#41431B] text-white text-[9px] font-bold uppercase tracking-widest hover:bg-[#AEB784] transition-all flex items-center justify-center gap-2 shadow-md">
           <Globe size={12} /> View Global Map
        </button>
      </div>
    </div>
  )
}
