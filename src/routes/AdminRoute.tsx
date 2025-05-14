"use client"

import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const AdminRoute = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>
  }

  if (user?.role !== "administrador") {
    return <Navigate to="/dashboard" />
  }

  return <Outlet />
}

export default AdminRoute
