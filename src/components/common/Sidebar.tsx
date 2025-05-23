"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/src/context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { BookOpen, Calculator, BarChart, Users, Home, Award, Brain, Rocket, Crown, Zap, Target } from "lucide-react"

const Sidebar = () => {
  const { user } = useAuth()
  const location = useLocation()
  const isAdmin = user?.role === "administrador"

  const studentLinks = [
    {
      name: "Mi Aventura",
      href: "/dashboard",
      icon: Rocket,
      color: "from-purple-400 to-pink-400",
      emoji: "🚀",
    },
    {
      name: "Matemática",
      href: "/questions/matematica",
      icon: Calculator,
      color: "from-green-400 to-emerald-500",
      emoji: "🔢",
    },
    {
      name: "Comunicación",
      href: "/questions/comunicacion",
      icon: BookOpen,
      color: "from-orange-400 to-amber-500",
      emoji: "📚",
    },
    {
      name: "Mis Logros",
      href: "/results",
      icon: Award,
      color: "from-yellow-400 to-orange-500",
      emoji: "🏆",
    },
    {
      name: "Desafíos",
      href: "/challenges",
      icon: Target,
      color: "from-red-400 to-pink-500",
      emoji: "🎯",
    },
  ]

  const adminLinks = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
      color: "from-blue-400 to-purple-500",
      emoji: "🏠",
    },
    {
      name: "Alumnos",
      href: "/admin/students",
      icon: Users,
      color: "from-green-400 to-blue-500",
      emoji: "👥",
    },
    {
      name: "Preguntas",
      href: "/admin/questions",
      icon: Brain,
      color: "from-purple-400 to-pink-500",
      emoji: "🧠",
    },
    {
      name: "Reportes",
      href: "/admin/reports",
      icon: BarChart,
      color: "from-orange-400 to-red-500",
      emoji: "📊",
    },
  ]

  const links = isAdmin ? adminLinks : studentLinks

  const SidebarItem = ({ link, index }: { link: any; index: number }) => {
    const isActive =
      location.pathname === link.href || (link.href !== "/dashboard" && location.pathname.startsWith(link.href))

    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="relative"
      >
        <Link to={link.href}>
          <motion.div
            className={cn("sidebar-item group relative overflow-hidden", isActive ? "active" : "")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Fondo animado */}
            <motion.div
              className={cn(
                "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
                `bg-gradient-to-r ${link.color}`,
              )}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            />

            {/* Icono animado */}
            <motion.div
              className={cn(
                "relative z-10 flex items-center justify-center w-12 h-12 rounded-xl mr-4 transition-all duration-300",
                isActive ? "bg-white/20 backdrop-blur-sm" : `bg-gradient-to-br ${link.color} text-white`,
              )}
              whileHover={{ rotate: 10 }}
            >
              <span className="text-xl">{link.emoji}</span>
            </motion.div>

            {/* Texto */}
            <div className="relative z-10 flex-1">
              <motion.h3
                className={cn(
                  "font-bold text-lg transition-colors duration-300",
                  isActive ? "text-white" : "text-gray-700",
                )}
              >
                {link.name}
              </motion.h3>
            </div>

            {/* Efecto brillante */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-2xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </motion.div>
        </Link>
      </motion.div>
    )
  }

  return (
    <aside className="w-80 sidebar-magical min-h-[calc(100vh-64px)] rounded-tr-3xl rounded-br-3xl relative">
      {/* Header mágico */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="p-6 relative z-10">
        <motion.div className="magical-card p-6 text-center relative overflow-hidden" whileHover={{ scale: 1.02 }}>
          {/* Efecto de estrellas */}
          <div className="absolute inset-0 star-field" />

          {/* Avatar del usuario */}
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-2xl relative"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            {isAdmin ? "👨‍🏫" : "🧙‍♂️"}
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              ✨
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-xl font-bold text-rainbow mb-2"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            {isAdmin ? "¡Hola Maestro!" : "¡Hola Explorador!"}
          </motion.h2>

          <p className="text-sm text-gray-600 font-medium">
            {isAdmin ? "Panel de Control Mágico" : `Aventurero de ${user?.grade} grado`}
          </p>
        </motion.div>
      </motion.div>

      {/* Navegación */}
      <nav className="px-4 space-y-3 relative z-10">
        <AnimatePresence>
          {links.map((link, index) => (
            <SidebarItem key={link.name} link={link} index={index} />
          ))}
        </AnimatePresence>
      </nav>

      {/* Panel de puntos para estudiantes */}
      {!isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mx-4 mt-8 relative z-10"
        >
          <motion.div className="magical-card p-6 relative overflow-hidden" whileHover={{ scale: 1.02 }}>
            {/* Efecto de brillo */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{ x: [-100, 400] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
            />

            <div className="relative z-10">
              <motion.h3
                className="font-bold text-purple-600 flex items-center text-lg mb-3"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Crown className="w-6 h-6 mr-2 text-yellow-500" />
                Mis Puntos Mágicos
              </motion.h3>

              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="text-4xl font-bold text-rainbow"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  {user?.points || 0}
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Zap className="w-8 h-8 text-yellow-500" />
                </motion.div>
              </div>

              {/* Barra de progreso hacia el siguiente nivel */}
              <div className="mb-3">
                <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                  <span>Nivel {Math.floor((user?.points || 0) / 100) + 1}</span>
                  <span>Siguiente: {100 - ((user?.points || 0) % 100)} pts</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(user?.points || 0) % 100}%` }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </div>
              </div>

              <motion.p
                className="text-xs text-gray-600 text-center"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                ¡Sigue aprendiendo para conseguir más puntos! ⭐
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Decoraciones flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 right-4 text-yellow-400 text-lg"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          ⭐
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-4 text-pink-400 text-sm"
          animate={{
            y: [0, -15, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-2 text-purple-400 text-xs"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: 2,
          }}
        >
          💫
        </motion.div>
      </div>
    </aside>
  )
}

export default Sidebar
