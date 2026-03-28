"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-context"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Live Routing", href: "/#features" },
    { name: "Global Map", href: "/#how-it-works" },
    { name: "Developers", href: "/#developers" },
    { name: "Efficiency Tiers", href: "/#pricing" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-[#EAEAEA] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#222831] rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg">
               <Sparkles size={16} fill="currentColor" />
            </div>
            <span className="text-xl font-serif text-[#222831] tracking-tight">NeuroRoute</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#393E46] font-bold hover:text-[#222831] transition-colors text-[10px] uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-8">
            {user ? (
               <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                 <Link
                   href="/dashboard"
                   className="bg-[#222831] text-white px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#393E46] transition-all shadow-xl shadow-[#222831]/20"
                 >
                   Open Dashboard
                 </Link>
               </motion.div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-[#393E46] font-bold hover:text-[#222831] transition-colors text-[10px] uppercase tracking-widest px-4 py-2"
                >
                  Sign In
                </Link>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/auth/signup"
                    className="bg-[#222831] text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#393E46] transition-all shadow-xl shadow-[#222831]/20"
                  >
                    Start Routing
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#222831]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:hidden py-8 absolute top-full left-0 right-0 border-t border-[#EAEAEA] bg-white h-[calc(100vh-80px)] px-6"
          >
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#222831] font-bold text-2xl"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-[#EAEAEA]" />
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#222831] text-white py-6 rounded-3xl text-sm font-bold uppercase tracking-widest text-center shadow-lg shadow-[#222831]/10"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#222831] font-bold text-2xl py-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-[#222831] text-white py-6 rounded-3xl text-sm font-bold uppercase tracking-widest text-center shadow-lg shadow-[#222831]/10"
                  >
                    Start Routing Instantly
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
