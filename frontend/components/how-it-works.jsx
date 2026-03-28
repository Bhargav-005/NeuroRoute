"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Sparkles, Zap, Cpu, Globe } from "lucide-react"

const steps = [
  {
    icon: <Sparkles size={24} />,
    title: "Zero-Setup SDK",
    description: "Install our client and start routing instantly. No provider API keys or custom infrastructure required.",
  },
  {
    icon: <Zap size={24} />,
    title: "Real-time Pathfinding",
    description: "NeuroRoute analyzes cost, latency, and quality across 42+ global model clusters in milliseconds.",
  },
  {
    icon: <Globe size={24} />,
    title: "Automated Execution",
    description: "The optimal model is selected and executed automatically. You only pay for what you use.",
  },
]

const codeExamples = {
  js: `import { NeuroRoute } from '@neuroroute/sdk'

const nr = new NeuroRoute('nr_live_8kH2m9s...')

// Automatically routes to the best model
const response = await nr.route({
  prompt: "Analyze this dataset for anomalies",
  strategy: 'balanced' // cost, speed, or quality
})`,
  python: `from neuroroute import NeuroRoute

nr = NeuroRoute("nr_live_8kH2m9s...")

# Balanced routing across all clusters
response = nr.route(
    prompt="Analyze this dataset for anomalies",
    strategy="balanced"
)`,
  curl: `curl -X POST https://api.neuroroute.com/v1/route \\
  -H "Authorization: Bearer nr_live_8kH2m9s..." \\
  -d '{
    "prompt": "Analyze this dataset",
    "strategy": "balanced"
  }'`,
}

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState("js")

  return (
    <section id="how-it-works" className="py-32 lg:py-48 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Steps */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl lg:text-7xl font-serif text-[#222831] tracking-tight mb-6">
                Intelligence
                <br />
                without friction
              </h2>
              <p className="text-[#393E46] text-lg max-w-sm font-medium opacity-60 italic">
                A seamless abstraction layer for global AI infrastructure.
              </p>
            </motion.div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex gap-8 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-[#F5F5F5] rounded-2xl flex items-center justify-center text-[#222831] group-hover:bg-[#222831] group-hover:text-white transition-all">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#222831] mb-2 uppercase tracking-widest text-[13px]">
                      {step.title}
                    </h3>
                    <p className="text-[#393E46] leading-relaxed max-w-sm text-sm font-medium opacity-70">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Code Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="bg-[#222831] rounded-[2.5rem] overflow-hidden shadow-2xl relative"
          >
            <div className="h-2 w-full bg-gradient-to-r from-[#222831] via-[#AEB784] to-[#222831] opacity-40" />
            {/* Tabs */}
            <div className="flex bg-[#1a1f26] px-6">
              {[
                { key: "js", label: "NODE.JS" },
                { key: "python", label: "PYTHON" },
                { key: "curl", label: "CURL" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative ${
                    activeTab === tab.key
                      ? "text-white"
                      : "text-[#393E46] hover:text-[#D0D0D0]"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div 
                      layoutId="active-tab" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Code */}
            <div className="p-12 overflow-x-auto min-h-[400px] flex items-start">
              <pre className="text-sm font-mono text-[#EAEAEA] leading-relaxed w-full whitespace-pre-wrap">
                <code className="block">{codeExamples[activeTab]}</code>
              </pre>
            </div>
            
            <div className="absolute bottom-6 right-8 opacity-20 flex items-center gap-3">
               <Cpu size={16} className="text-white" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-white">SDK Production Ready</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
