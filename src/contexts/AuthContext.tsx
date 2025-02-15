"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true)
      // 将登录状态保存到本地存储
      localStorage.setItem('isAuthenticated', 'true')
      // 设置登录状态的过期时间（例如24小时后）
      const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000
      localStorage.setItem('authExpires', expiresAt.toString())
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    // 清除本地存储中的登录状态
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('authExpires')
  }

  // 检查登录状态是否过期
  useEffect(() => {
    const checkAuthExpiration = () => {
      const expiresAt = localStorage.getItem('authExpires')
      if (expiresAt) {
        const now = new Date().getTime()
        if (now > parseInt(expiresAt)) {
          logout()
        }
      }
    }

    // 初始检查
    checkAuthExpiration()

    // 每分钟检查一次登录状态
    const interval = setInterval(checkAuthExpiration, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return null // 或者返回一个加载指示器
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 