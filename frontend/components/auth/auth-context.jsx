"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  loading: true
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedUser = localStorage.getItem("neuroroute_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!loading) {
      // Protect (dashboard) routes
      const isPublicRoute = pathname.startsWith("/auth") || pathname === "/"
      if (!user && !isPublicRoute) {
        router.push("/auth/login")
      }
    }
  }, [user, loading, pathname, router])

  const login = (email) => {
    const newUser = { email, name: email.split("@")[0] }
    setUser(newUser)
    localStorage.setItem("neuroroute_user", JSON.stringify(newUser))
    router.push("/dashboard")
  }

  const signup = (email, name) => {
    const newUser = { email, name: name || email.split("@")[0] }
    setUser(newUser)
    localStorage.setItem("neuroroute_user", JSON.stringify(newUser))
    router.push("/auth/onboarding")
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("neuroroute_user")
    router.push("/auth/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
