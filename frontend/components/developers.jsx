"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Copy, Check, Terminal, Code2, Database, ShieldCheck, Sparkles, Cpu } from "lucide-react"

const codeSnippet = `// Zero-Setup Routing
import { NeuroRoute } from '@neuroroute/sdk'

const nr = new NeuroRoute('nr_live_...')

// NeuroRoute handles the complexity auto-selection
const result = await nr.route({
  prompt: "Synthesize these architectural records",
  strategy: 'balanced' // cost-optimized by default
})

console.log(result.model)    // "gpt-4o"
console.log(result.latency)  // 112ms`

const developerFeatures = [
  {
    icon: Sparkles,
    title: "Zero-Setup Infrastructure",
    description: "One SDK for 42+ models. No provider API keys, no configuration. Start routing in 3 lines of code.",
  },
  {
    icon: Database,
    title: "Enterprise Grade Mesh",
    description: "Native support for low-latency streaming and server-sent events across all global clusters.",
  },
]

export default function Developers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="developers" className="py-32 lg:py-48 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-24 lg:mb-32 space-y-8"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-px bg-[#222831]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#393E46]">DEVELOPER EMPOWERMENT</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-serif text-[#222831] leading-tight tracking-tight">
                Built for
                <br /> 
                engineering velocity.
              </h2>
            </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-stretch mb-32">
          {/* Code Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="relative bg-[#222831] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-10 py-6 border-b border-[#393E46] bg-[#1a1f26]">
              <div className="flex items-center gap-3">
                <Terminal size={18} className="text-[#393E46]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#393E46]">implementation.js</span>
              </div>
              <button
                onClick={copyCode}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#393E46] hover:text-[#D0D0D0] transition-colors"
              >
                {copied ? "Copied" : "Copy Source"}
              </button>
            </div>

            <div className="p-12 overflow-x-auto bg-[#222831] flex-grow">
              <pre className="text-sm font-mono text-[#EAEAEA] leading-relaxed">
                <code>{codeSnippet}</code>
              </pre>
            </div>
            
            <div className="p-10 bg-[#1a1f26]/50 flex items-center justify-between border-t border-[#393E46]/30">
               <div className="flex items-center gap-4">
                  <Cpu size={20} className="text-[#393E46]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#393E46]">Managed Cluster SDK</span>
               </div>
               <div className="text-[9px] font-bold uppercase tracking-widest text-[#393E46]">v1.4.2 Released</div>
            </div>
          </motion.div>

          {/* Feature List */}
          <div className="flex flex-col justify-center space-y-16 py-8">
            {developerFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                className="flex gap-8 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#F5F5F5] flex items-center justify-center text-[#222831] flex-shrink-0 group-hover:bg-[#222831] group-hover:text-white transition-all transform group-hover:rotate-6">
                  <feature.icon size={32} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#222831] mb-3 uppercase tracking-widest leading-relaxed">{feature.title}</h3>
                  <p className="text-[#393E46] leading-relaxed text-sm font-medium opacity-60 max-w-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pt-24 border-t border-[#EAEAEA] flex flex-col lg:flex-row lg:items-center justify-between gap-12"
        >
          <div className="flex items-center gap-8">
            <div className="p-4 bg-[#F5F5F5] rounded-2xl">
               <ShieldCheck size={40} className="text-[#222831]" />
            </div>
            <div>
              <h4 className="text-2xl font-serif text-[#222831] mb-1">State-of-the-art security</h4>
              <p className="text-sm font-medium text-[#393E46] opacity-60">Architected for the highest global data privacy standards.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-12">
            {[
              { label: "SOC2 Compliant", status: "Verified" },
              { label: "End-to-End Encryption", status: "Active" },
              { label: "Zero Data Retention", status: "Default" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#222831]">
                    <Check size={14} className="text-green-500" strokeWidth={3} /> {s.label}
                 </div>
                 <span className="text-[9px] font-bold text-[#AEB784] uppercase tracking-tighter pl-6">{s.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
