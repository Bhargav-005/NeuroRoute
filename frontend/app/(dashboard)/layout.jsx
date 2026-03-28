"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-context"
import { 
  LayoutDashboard, 
  GitBranch, 
  Cpu, 
  BarChart3, 
  FlaskConical, 
  Settings, 
  Search, 
  Bell, 
  LogOut,
  User,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const { user, logout, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)

  if (loading) return null

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Router", href: "/router", icon: GitBranch },
    { name: "Models", href: "/models", icon: Cpu },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Playground", href: "/playground", icon: FlaskConical },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#F8F3E1] flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-72 bg-[#41431B] text-[#F8F3E1] z-50 flex flex-col p-8 border-r border-[#41431B]/10 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-12">
              <Link href="/" className="text-2xl font-serif tracking-tight">NeuroRoute</Link>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-grow space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                      isActive 
                        ? "bg-[#AEB784] text-[#41431B] font-bold shadow-lg" 
                        : "hover:bg-white/5 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm font-medium uppercase tracking-widest">{item.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-nav"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-[#41431B]"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="pt-8 mt-auto border-t border-white/10">
               <button 
                 onClick={logout}
                 className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-red-500/10 hover:text-red-400 transition-all opacity-60 hover:opacity-100 w-full text-left"
               >
                 <LogOut size={20} />
                 <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
               </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className={`flex-grow flex flex-col transition-all duration-300 ${sidebarOpen ? "lg:pl-72" : "pl-0"}`}>
        {/* Top Navbar */}
        <header className="h-20 border-b border-[#E3DBBB] bg-[#F8F3E1]/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             {!sidebarOpen && (
               <button 
                 onClick={() => setSidebarOpen(true)}
                 className="p-2.5 rounded-xl hover:bg-[#E3DBBB] transition-colors text-[#41431B]"
               >
                 <Menu size={20} />
               </button>
             )}
             <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-white rounded-2xl border border-[#E3DBBB] min-w-[320px]">
                <Search size={18} className="text-[#AEB784]" />
                <input 
                  type="text" 
                  placeholder="Search infrastructure..." 
                  className="bg-transparent text-sm outline-none w-full placeholder:text-[#AEB784]/60 text-[#41431B]" 
                />
             </div>
          </div>

          <div className="flex items-center gap-6">
             <button className="relative p-2.5 rounded-xl hover:bg-[#E3DBBB] transition-colors text-[#41431B]">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-400 border border-white" />
             </button>
             
             <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-2xl bg-white border border-[#E3DBBB] hover:shadow-sm transition-all"
                >
                   <div className="w-8 h-8 rounded-full bg-[#AEB784] flex items-center justify-center text-[#41431B]">
                      <User size={18} />
                   </div>
                   <div className="hidden sm:block text-left">
                      <p className="text-[10px] font-bold uppercase tracking-tighter text-[#AEB784]">Pro Account</p>
                      <p className="text-xs font-bold text-[#41431B]">{user?.name || "User"}</p>
                   </div>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-[#E3DBBB] p-2 overflow-hidden"
                    >
                       <Link href="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F5F5F5] text-sm font-bold text-[#41431B] transition-colors">
                          <Settings size={16} /> Settings
                       </Link>
                       <hr className="my-1 border-[#E3DBBB]/20" />
                       <button 
                         onClick={() => { logout(); setProfileOpen(false); }}
                         className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50/50 text-red-500 text-sm font-bold transition-colors w-full text-left"
                       >
                          <LogOut size={16} /> Logout
                       </button>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-grow p-8">
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4 }}
           >
             {children}
           </motion.div>
        </main>
      </div>
    </div>
  )
}
