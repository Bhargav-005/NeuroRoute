"use client"

import { motion } from "framer-motion"
import { 
  MessageSquare, 
  Search, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  ArrowDown 
} from "lucide-react"

const PIPELINE_STEPS = [
  { 
    id: "input", 
    title: "Prompt Input", 
    desc: "Capturing user request and context", 
    icon: MessageSquare 
  },
  { 
    id: "classify", 
    title: "Complexity Classifier", 
    desc: "Identifying task requirements & difficulty", 
    icon: Search 
  },
  { 
    id: "privacy", 
    title: "Privacy Scanner", 
    desc: "Detecting PII and sensitive tokens", 
    icon: ShieldCheck 
  },
  { 
    id: "score", 
    title: "Routing Scorer", 
    desc: "Evaluating cost vs latency vs quality", 
    icon: Activity 
  },
  { 
    id: "select", 
    title: "Provider Selection", 
    desc: "Connecting to the optimal global node", 
    icon: Cpu 
  }
]

export default function RoutingPipeline({ activeStep = -1 }) {
  return (
    <div className="bg-white rounded-[2.5rem] border border-[#E3DBBB] p-10 shadow-sm space-y-8 h-full">
      <div className="flex items-center justify-between px-2">
         <h3 className="text-xl font-serif text-[#41431B]">Routing Pipeline</h3>
         <span className="text-[10px] font-bold text-[#AEB784] uppercase tracking-widest">Decision Process</span>
      </div>

      <div className="space-y-4 relative">
        {PIPELINE_STEPS.map((step, i) => (
          <div key={step.id} className="relative">
            <motion.div
              animate={{
                opacity: activeStep >= i ? 1 : 0.4,
                scale: activeStep === i ? 1.02 : 1,
                backgroundColor: activeStep === i ? "#F8F3E1" : "transparent"
              }}
              className={`p-6 rounded-3xl border transition-all flex items-center gap-6 ${
                activeStep === i ? "border-[#AEB784] shadow-lg shadow-[#AEB784]/5" : "border-transparent"
              }`}
            >
              <div className={`p-4 rounded-2xl flex items-center justify-center ${
                activeStep >= i ? "bg-[#41431B] text-white" : "bg-[#F8F3E1] text-[#AEB784]"
              }`}>
                <step.icon size={20} />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${activeStep >= i ? "text-[#41431B]" : "text-[#AEB784]"}`}>
                  {step.title}
                </h4>
                <p className="text-[10px] font-medium text-[#AEB784] mt-1 uppercase tracking-widest">
                  {step.desc}
                </p>
              </div>

              {activeStep === i && (
                <motion.div
                  className="ml-auto w-2 h-2 rounded-full bg-[#AEB784]"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {i < PIPELINE_STEPS.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown size={14} className={`${activeStep > i ? "text-[#AEB784]" : "text-[#E3DBBB]/30"}`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
