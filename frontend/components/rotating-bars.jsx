"use client"

import { useEffect, useRef } from "react"

export default function RotatingBars() {
  const canvasRef = useRef(null)
  const rotationRef = useRef(0)
  const animationIdRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let bars = []

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initBars(rect.width, rect.height)
    }

    const initBars = (width, height) => {
      bars = []
      const barCount = 120
      const centerX = width / 2
      const centerY = height / 2
      const maxRadius = Math.min(width, height) * 0.45

      for (let i = 0; i < barCount; i++) {
        const angle = (Math.PI * 2 * i) / barCount + Math.random() * 0.3
        const radiusOffset = 0.3 + Math.random() * 0.7
        const radius = maxRadius * radiusOffset
        
        bars.push({
          angle,
          radius,
          length: 8 + Math.random() * 40,
          width: 2 + Math.random() * 4,
          opacity: 0.15 + Math.random() * 0.5,
          speed: 0.0003 + Math.random() * 0.0005,
          centerX,
          centerY,
        })
      }
    }

    const draw = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return

      ctx.clearRect(0, 0, rect.width, rect.height)

      rotationRef.current += 0.001

      bars.forEach((bar) => {
        const currentAngle = bar.angle + rotationRef.current * (1 + bar.speed * 100)
        const x = bar.centerX + Math.cos(currentAngle) * bar.radius
        const y = bar.centerY + Math.sin(currentAngle) * bar.radius

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(currentAngle + Math.PI / 2)
        
        ctx.fillStyle = `rgba(57, 62, 70, ${bar.opacity})`
        ctx.fillRect(-bar.width / 2, -bar.length / 2, bar.width, bar.length)
        
        ctx.restore()
      })

      animationIdRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}
