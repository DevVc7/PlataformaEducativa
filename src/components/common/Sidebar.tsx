"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/src/context/AuthContext"
import { cn } from "@/lib/utils"
import { BookOpen, Calculator, BarChart, Users, FileText, Home, Award } from "lucide-react"

const Sidebar = () => {
  const { user } = useAuth()
  const location = useLocation()
  const isAdmin = user?.role === "administrador"

  const studentLinks = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Matemática", href: "/questions/matematica", icon: Calculator },
    { name: "Comunicación", href: "/questions/comunicacion", icon: BookOpen },
    { name: "Evaluaciones", href: "/results", icon: Award },
  ]

  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Alumnos", href: "/admin/students", icon: Users },
    { name: "Preguntas", href: "/admin/questions", icon: FileText },
    { name: "Reportes", href: "/admin/reports", icon: BarChart },
  ]

  const links = isAdmin ? adminLinks : studentLinks

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {isAdmin ? "Panel de Administrador" : "Panel de Alumno"}
          </h2>
          <p className="text-sm text-gray-500">
            {isAdmin ? "Gestión de la plataforma" : `Alumno de ${user?.grade} grado`}
          </p>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const isActive =
              location.pathname === link.href || (link.href !== "/dashboard" && location.pathname.startsWith(link.href))

            return (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <link.icon className={cn("mr-3 h-5 w-5", isActive ? "text-blue-500" : "text-gray-400")} />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
