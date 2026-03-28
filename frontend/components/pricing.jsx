"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Check, Sparkles, Zap, ShieldCheck } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Growth",
    price: "$0",
    period: "forever",
    description: "Ideal for early builders and rapid prototyping.",
    features: [
      "1,000 requests/mo",
      "Automated Cost Routing",
      "Community Dashboard",
      "Zero Key Management",
    ],
    cta: "Start Free",
    href: "/auth/signup",
    highlighted: false,
    icon: Sparkles
  },
  {
    name: "Performance",
    price: "$49",
    period: "/month",
    description: "Scale your production workload with zero configuration.",
    features: [
      "100k requests/mo",
      "Priority Latency Routing",
      "Global Health Strategy",
      "Advanced Efficiency Metrics",
    ],
    cta: "Get Performance",
    href: "/auth/signup",
    highlighted: true,
    icon: Zap
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    description: "Unlimited infrastructure for global enterprise teams.",
    features: [
      "Unlimited requests",
      "Dedicated Global Nodes",
      "Custom Routing Policies",
      "Enterprise Grade Compliance",
    ],
    cta: "Contact Sales",
    href: "#",
    highlighted: false,
    icon: ShieldCheck
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="pricing" className="py-32 lg:py-48 bg-[#F9F9F9]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-24 lg:mb-32 space-y-8 text-center"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="w-10 h-px bg-[#222831]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#393E46]">EFFICIENCY TIERS</span>
                <span className="w-10 h-px bg-[#222831]" />
              </div>
              <h2 className="text-5xl lg:text-7xl font-serif text-[#222831] leading-tight tracking-tight">
                Simple, transparent
                <br /> 
                efficiency.
              </h2>
            </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              className={`p-12 lg:p-14 rounded-[3rem] flex flex-col h-full bg-white border transition-all ${
                plan.highlighted ? "border-[#222831] shadow-2xl relative scale-105 z-10" : "border-[#EAEAEA] hover:border-[#D0D0D0]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 rounded-full bg-[#222831] text-white text-[9px] font-bold uppercase tracking-[0.2em] shadow-xl">
                  Recommended Logic
                </div>
              )}

              <div className="mb-12">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${plan.highlighted ? "bg-[#222831] text-white" : "bg-[#F5F5F5] text-[#222831]"}`}>
                   <plan.icon size={28} />
                </div>
                <h3 className="text-sm font-bold text-[#222831] mb-6 uppercase tracking-[0.2em]">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl lg:text-6xl font-serif text-[#222831]">{plan.price}</span>
                  <span className="text-xs font-bold text-[#393E46] opacity-40 uppercase tracking-widest">{plan.period}</span>
                </div>
                <p className="text-sm text-[#393E46] leading-relaxed font-medium opacity-60 min-h-[48px]">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-6 mb-12 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-xs font-bold text-[#222831] uppercase tracking-wider">
                    <Check size={18} className={plan.highlighted ? "text-[#AEB784]" : "text-[#D0D0D0]"} strokeWidth={3} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href={plan.href}
                className={`w-full py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all text-center flex items-center justify-center ${
                plan.highlighted 
                  ? "bg-[#222831] text-white hover:bg-[#393E46] shadow-xl shadow-[#222831]/20" 
                  : "bg-white border border-[#222831] text-[#222831] hover:bg-[#F9F9F9]"
              }`}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
