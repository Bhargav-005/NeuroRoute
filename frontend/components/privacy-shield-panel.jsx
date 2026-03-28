"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Mail, 
  Phone, 
  User,
  Clock,
  AlertTriangle,
  Fingerprint
} from "lucide-react"

const MOCK_PII_SAMPLES = [
  { prompt: "My email is support@neuroroute.com, please contact me.", types: ["email"] },
  { prompt: "Call me at +1-555-0199 for the details.", types: ["phone"] },
  { prompt: "Is my SSN 123-45-6789 stored safely?", types: ["id"] },
  { prompt: "My home address is 123 AI Lane, Silicon Valley.", types: ["address"] },
  { prompt: "Send the invoice to accounts-payable@corp.com.", types: ["email"] },
  { prompt: "Reach out to my personal line at (555) 987-6543.", types: ["phone"] },
  { prompt: "Here is my private key: 0xAbCdEf123456...", types: ["key"] },
]

export default function PrivacyShieldPanel() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    // Initial data
    const initialEvents = MOCK_PII_SAMPLES.slice(0, 3).map((item, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      ...item,
      action: "System Default: Routed to Secure Cluster",
      timestamp: `${i * 2 + 1}m ago`
    }))
    setEvents(initialEvents)

    const interval = setInterval(() => {
      const sample = MOCK_PII_SAMPLES[Math.floor(Math.random() * MOCK_PII_SAMPLES.length)]
      const newEvent = {
        id: Math.random().toString(36).substr(2, 9),
        ...sample,
        action: "Privacy-Aware: Routed to Local Model",
        timestamp: "just now"
      }
      setEvents(prev => [newEvent, ...prev.slice(0, 9)])
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email': return <Mail size={12} />
      case 'phone': return <Phone size={12} />
      case 'id': return <Fingerprint size={12} />
      case 'address': return <User size={12} />
      default: return <EyeOff size={12} />
    }
  }

  const getTypeStyle = (type) => {
    switch (type) {
      case 'email': return 'bg-yellow-50 text-yellow-600 border-yellow-100'
      case 'phone': return 'bg-orange-50 text-orange-600 border-orange-100'
      case 'id': return 'bg-red-50 text-red-600 border-red-100'
      default: return 'bg-blue-50 text-blue-600 border-blue-100'
    }
  }

  return (
    <div className="bg-white rounded-[1.5rem] border border-[#E3DBBB] p-4 shadow-sm hover:shadow-lg hover:shadow-[#41431B]/5 transition-all flex flex-col space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-[#41431B] rounded-2xl text-white shadow-lg">
              <ShieldCheck size={20} />
           </div>
           <div>
              <h3 className="text-xl font-serif text-[#41431B]">Privacy Shield</h3>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#AEB784]">Autonomous Data Protection</p>
           </div>
        </div>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-xl text-[9px] font-bold uppercase tracking-widest border border-green-100">
              <Lock size={12} /> Secure Cluster Active
           </div>
        </div>
      </div>

      <div className="flex-grow space-y-4 overflow-y-auto no-scrollbar min-h-0 pr-1">
        <AnimatePresence mode="popLayout" initial={false}>
          {events.map((event) => (
            <motion.div
              layout
              key={event.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-3.5 bg-[#F8F3E1]/30 rounded-2xl border border-transparent hover:border-[#E3DBBB]/50 hover:bg-white transition-all flex flex-col gap-3 group cursor-default"
            >
              <div className="flex items-start justify-between gap-4">
                 <p className="text-sm font-bold text-[#41431B] truncate group-hover:text-[#AEB784] transition-colors">
                    "{event.prompt}"
                 </p>
                 <span className="text-[9px] font-bold text-[#AEB784] uppercase tracking-widest opacity-40 translate-y-1">{event.timestamp}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {event.types.map(type => (
                    <span 
                      key={type} 
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${getTypeStyle(type)} shadow-sm`}
                    >
                      {getTypeIcon(type)} {type === 'id' ? 'PII Detected' : type}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-green-600">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Lock size={12} />
                  </motion.div>
                  <span className="text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">Local Route Active</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="pt-3 border-t border-[#E3DBBB]/30">
        <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/50 flex items-start gap-4">
           <AlertTriangle className="text-blue-600 mt-0.5 flex-shrink-0" size={14} />
           <p className="text-[9px] text-blue-600 font-medium leading-relaxed">
             NeuroRoute automatically detects PII and secrets to ensure your data stays within local/private compliance clusters.
           </p>
        </div>
      </div>
    </div>
  )
}
