"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface User {
  email: string;
  username: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for user in local storage on initial load
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    // Mock authentication logic
    if (email === "test@example.com" && password === "password") {
      const user: User = {
        email: email,
        username: "TestUser",
      }
      setCurrentUser(user)
      localStorage.setItem("user", JSON.stringify(user)) // Store user in local storage
      return user
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const logout = async (): Promise<void> => {
    setCurrentUser(null)
    localStorage.removeItem("user") // Remove user from local storage
  }

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 