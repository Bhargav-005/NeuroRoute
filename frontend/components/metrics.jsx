"use client"

import { motion, useSpring, useMotionValue } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

function formatNumber(current, value, prefix, suffix) {
  if (value >= 1000000000) {
    return `${prefix}${(current / 1000000000).toFixed(1)}B${suffix}`
  } else if (value >= 1000000) {
    return `${prefix}${(current / 1000000).toFixed(1)}M${suffix}`
  } else if (value >= 1000) {
    return `${prefix}${(current / 1000).toFixed(1)}K${suffix}`
  } else if (value % 1 !== 0) {
    return `${prefix}${current.toFixed(1)}${suffix}`
  } else {
    return `${prefix}${Math.floor(current)}${suffix}`
  }
}

function AnimatedNumber({ value, suffix = "", prefix = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [mounted, setMounted] = useState(false)
  const [displayValue, setDisplayValue] = useState(formatNumber(0, value, prefix, suffix))
  
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { 
    mass: 1,
    stiffness: 75,
    damping: 15,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const unsubscribe = spring.on("change", (current) => {
      setDisplayValue(formatNumber(current, value, prefix, suffix))
    })
    return unsubscribe
  }, [spring, value, prefix, suffix, mounted])

  useEffect(() => {
    if (isInView && mounted) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value, mounted])

  return (
    <span ref={ref} suppressHydrationWarning>
      {displayValue}
    </span>
  )
}

const metrics = [
  { value: 42, label: "Avg latency (ms)", suffix: "ms", prefix: "" },
  { value: 42, label: "Cost reduction (%)", suffix: "%", prefix: "" },
  { value: 500000000, label: "Requests routed", suffix: "+", prefix: "" },
  { value: 99.99, label: "System uptime", suffix: "%", prefix: "" },
]

export default function Metrics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl xl:text-6xl font-serif text-[#222831] mb-4">
                <AnimatedNumber 
                  value={metric.value} 
                  suffix={metric.suffix}
                  prefix={metric.prefix}
                />
              </div>
              <div className="text-sm px-4 lg:text-base font-medium text-[#393E46] uppercase tracking-wider">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
