"use client"

import { AuthProvider } from "@/src/context/AuthContext"
import type { ReactNode } from "react"

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
