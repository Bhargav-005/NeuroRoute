"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-context"

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const { signup, login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(formData.email, formData.name)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-10"
    >
      <div className="space-y-3">
        <h1 className="text-4xl lg:text-5xl font-serif text-[#41431B]">Create your account</h1>
        <p className="text-[#AEB784] font-medium opacity-80">Start optimizing your AI routing in minutes</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-[#41431B] mb-2 px-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full h-14 px-6 rounded-2xl bg-white border border-[#E3DBBB] focus:border-[#AEB784] focus:ring-1 focus:ring-[#AEB784] outline-none transition-all placeholder:opacity-40 text-[#41431B]"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-[#41431B] mb-2 px-1">Email</label>
            <input
              type="email"
              required
              className="w-full h-14 px-6 rounded-2xl bg-white border border-[#E3DBBB] focus:border-[#AEB784] focus:ring-1 focus:ring-[#AEB784] outline-none transition-all placeholder:opacity-40 text-[#41431B]"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-[#41431B] mb-2 px-1">Password</label>
            <input
              type="password"
              required
              className="w-full h-14 px-6 rounded-2xl bg-white border border-[#E3DBBB] focus:border-[#AEB784] focus:ring-1 focus:ring-[#AEB784] outline-none transition-all placeholder:opacity-40 text-[#41431B]"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-14 rounded-full bg-[#41431B] text-white font-bold uppercase tracking-widest text-xs shadow-lg shadow-[#41431B]/10 hover:bg-[#AEB784] transition-colors"
          >
            Create Account
          </motion.button>

          <div className="relative flex items-center justify-center py-2">
            <span className="absolute w-full h-px bg-[#E3DBBB] opacity-30" />
            <span className="relative px-4 bg-[#F8F3E1] text-[10px] font-bold uppercase tracking-widest text-[#AEB784]">or continue with</span>
          </div>

          <motion.button
            type="button"
            onClick={() => login("google_user@gmail.com")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-14 rounded-full bg-white border border-[#E3DBBB] text-[#41431B] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#F5F5F5] transition-colors shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </motion.button>
        </div>
      </form>

      <div className="text-center pt-8">
         <p className="text-sm text-[#41431B]">
           Already have an account? <Link href="/auth/login" className="font-bold text-[#AEB784] hover:text-[#41431B] transition-colors">Login</Link>
         </p>
      </div>
    </motion.div>
  )
}
