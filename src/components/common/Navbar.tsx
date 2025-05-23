"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/src/context/AuthContext"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Bell, Search, Menu, X, LogOut, Settings, User, Crown, Sparkles, Trophy, Star, Zap, Heart } from "lucide-react"

interface NavbarProps {
  onToggleSidebar?: () => void
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(3)
  const [showSearch, setShowSearch] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  const FloatingElement = ({ children, delay = 0 }: any) => (
    <motion.div
      className="absolute"
      animate={{
        y: [0, -8, 0],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )

  if (!user) return null

  const isAdmin = user.role === "administrador"

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 h-16"
    >
      {/* Fondo con efecto glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/90 via-blue-500/90 to-pink-500/90 backdrop-blur-lg border-b border-white/20" />

      {/* Efectos decorativos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0}>
          <Star className="top-2 left-20 text-yellow-300 w-4 h-4" />
        </FloatingElement>
        <FloatingElement delay={1}>
          <Sparkles className="top-3 right-32 text-pink-300 w-3 h-3" />
        </FloatingElement>
        <FloatingElement delay={2}>
          <Heart className="top-1 left-1/3 text-red-300 w-3 h-3" />
        </FloatingElement>
        <FloatingElement delay={0.5}>
          <Zap className="top-2 right-1/4 text-yellow-400 w-4 h-4" />
        </FloatingElement>
      </div>

      <div className="relative h-full px-6 flex items-center justify-between">
        {/* Lado izquierdo */}
        <div className="flex items-center space-x-4">
          {/* Botón de menú con animación */}
          <motion.button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="w-5 h-5 text-white" />
          </motion.button>

          {/* Logo y título */}
          <Link to={isAdmin ? "/admin/dashboard" : "/dashboard"}>
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-xl flex items-center justify-center text-xl shadow-lg">
                  🚀
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full flex items-center justify-center text-xs"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  ✨
                </motion.div>
              </motion.div>

              <div>
                <motion.h1
                  className="text-xl font-black text-white"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.5)",
                      "0 0 20px rgba(255,255,255,0.8)",
                      "0 0 10px rgba(255,255,255,0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  Aprende Jugando
                </motion.h1>
                <p className="text-xs text-white/80 font-medium">
                  {isAdmin ? "Panel Mágico" : "Tu Aventura Educativa"}
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Centro - Búsqueda */}
        <div className="flex-1 max-w-md mx-8">
          <motion.div className="relative" initial={false} animate={showSearch ? { scale: 1.05 } : { scale: 1 }}>
            <AnimatePresence>
              {showSearch ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative"
                >
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isAdmin ? "Buscar estudiantes, reportes..." : "Buscar aventuras, logros..."}
                    className="w-full pl-10 pr-10 py-2 bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl backdrop-blur-sm focus:bg-white/20 focus:border-white/40"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <motion.button
                    onClick={() => setShowSearch(false)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-white/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4 text-white/60" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.button
                  onClick={() => setShowSearch(true)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Search className="w-5 h-5 text-white" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Lado derecho */}
        <div className="flex items-center space-x-4">
          {/* Saludo personalizado */}
          <motion.div
            className="hidden md:block text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm font-medium text-white/90">{getGreeting()},</p>
            <p className="text-lg font-bold text-white flex items-center">
              {user.name}
              {isAdmin ? (
                <Crown className="w-4 h-4 ml-1 text-yellow-300" />
              ) : (
                <motion.div
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Star className="w-4 h-4 ml-1 text-yellow-300" />
                </motion.div>
              )}
            </p>
          </motion.div>

          {/* Notificaciones */}
          <motion.button
            className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setNotifications(0)}
          >
            <Bell className="w-5 h-5 text-white" />
            {notifications > 0 && (
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  {notifications}
                </motion.span>
              </motion.div>
            )}
          </motion.button>

          {/* Puntos del usuario (solo estudiantes) */}
          {!isAdmin && (
            <motion.div
              className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05, bg: "rgba(255,255,255,0.2)" }}
            >
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
                <Trophy className="w-4 h-4 text-yellow-300" />
              </motion.div>
              <span className="text-sm font-bold text-white">{user.points || 0}</span>
              <span className="text-xs text-white/70">pts</span>
            </motion.div>
          )}

          {/* Menú de usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="cursor-pointer">
                <Avatar className="w-10 h-10 border-2 border-white/30 shadow-lg">
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white/95 backdrop-blur-lg border-white/20 shadow-xl rounded-xl"
            >
              <div className="p-3 border-b border-gray-200">
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600">{isAdmin ? "Administrador" : `${user.grade} grado`}</p>
              </div>
              <DropdownMenuItem className="flex items-center space-x-2 hover:bg-purple-50">
                <User className="w-4 h-4" />
                <span>Mi Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center space-x-2 hover:bg-purple-50">
                <Settings className="w-4 h-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center space-x-2 text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
