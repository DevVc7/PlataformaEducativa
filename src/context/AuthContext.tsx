"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { AuthState } from "../types"
import { loginService, logoutService, getUserService } from "../services/authService"

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")

      if (token) {
        getUserService()
          .then((user) => {
            setAuthState({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          })
          .catch(() => {
            localStorage.removeItem("token")
            setAuthState({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            })
          })
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      }
    }
  }, [])

  const login = async (username: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const { user, token } = await loginService(username, password)
      localStorage.setItem("token", token)

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Error de inicio de sesión",
      }))
      throw error
    }
  }

  const logout = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      await logoutService()
      localStorage.removeItem("token")

      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Error al cerrar sesión",
      }))
    }
  }

  const forgotPassword = async (email: string) => {
    // Implementación simulada
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Solicitud de recuperación para: ${email}`)
        resolve()
      }, 1000)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(
      "useAuth debe ser usado dentro de un AuthProvider. Asegúrate de que el componente que usa useAuth esté envuelto por AuthProvider.",
    )
  }
  return context
}
