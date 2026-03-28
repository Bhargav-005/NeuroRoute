"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Cpu, DollarSign, Activity, Award, Sparkles, ShieldCheck } from "lucide-react"

const reasons = [
  {
    icon: Sparkles,
    title: "Zero Setup Infrastructure",
    description: "Connect to 42+ models instantly. No API keys, no provider tokens, and no manual endpoint orchestration required.",
  },
  {
    icon: DollarSign,
    title: "Automated Cost Control",
    description: "Automatically reduce token overhead by routing simpler requests to hyper-efficient, lower-cost clusters.",
  },
  {
    icon: Activity,
    title: "Global Latency Mesh",
    description: "Minimize wait times by dynamically routing prompts to the geographically nearest, fastest available endpoints.",
  },
  {
    icon: ShieldCheck,
    title: "Quality-First Engine",
    description: "Maintain peak response quality for complex tasks by ensuring they reach high-reasoning models automatically.",
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-32 lg:py-48 bg-[#F9F9F9]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 lg:mb-32 space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-px bg-[#222831]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#393E46]">CORE VALUE</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-serif text-[#222831] leading-tight tracking-tight">
            The intelligent layer
            <br /> 
            between users and AI.
          </h2>
          <p className="text-[#393E46] text-xl max-w-2xl leading-relaxed font-medium opacity-60">
            NeuroRoute removes the complexity of managing countless LLM providers 
            by automating every routing decision in real-time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              className="bg-white p-10 rounded-[2.5rem] border border-[#EAEAEA] hover:border-[#222831] hover:shadow-2xl hover:shadow-[#222831]/5 transition-all group cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F5F5F5] flex items-center justify-center text-[#222831] mb-8 group-hover:bg-[#222831] group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
                <reason.icon size={28} />
              </div>
              <h3 className="text-sm font-bold text-[#222831] mb-4 uppercase tracking-widest leading-relaxed">
                {reason.title}
              </h3>
              <p className="text-[#393E46] text-sm leading-relaxed opacity-70 font-medium">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
