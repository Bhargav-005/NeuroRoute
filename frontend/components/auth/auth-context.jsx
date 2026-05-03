"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  googleSignIn: () => {},
  logout: () => {},
  loading: true
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for stored token and user on mount
    const storedToken = localStorage.getItem("neuroroute_token")
    const storedUser = localStorage.getItem("neuroroute_user")
    
    if (storedToken && storedUser) {
      setToken(storedToken)
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

  const googleSignIn = async (googleToken) => {
    try {
      setLoading(true)
      
      // Send Google token to backend
      const response = await fetch("http://localhost:8000/auth/google-signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: googleToken }),
      })

      if (!response.ok) {
        throw new Error("Failed to sign in with Google")
      }

      const data = await response.json()
      
      // Store JWT token and user info
      const jwtToken = data.access_token
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        picture_url: data.user.picture_url,
      }

      setToken(jwtToken)
      setUser(userData)
      localStorage.setItem("neuroroute_token", jwtToken)
      localStorage.setItem("neuroroute_user", JSON.stringify(userData))
      
      console.log("Google Sign-In successful!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Google Sign-In failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const login = (email) => {
    const newUser = { email, name: email.split("@")[0] }
    setUser(newUser)
    localStorage.setItem("neuroroute_user", JSON.stringify(newUser))
    router.push("/dashboard")
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("neuroroute_token")
    localStorage.removeItem("neuroroute_user")
    router.push("/auth/login")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, googleSignIn, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
