"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/src/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, UserCog, Loader2, Eye, EyeOff, Shield } from "lucide-react"

const AdminLoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(username, password)
      setTimeout(() => {
        navigate("/admin/dashboard")
      }, 1500)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const FloatingIcon = ({ children, className = "", delay = 0 }: any) => (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -15, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-32 left-32 w-32 h-32 bg-yellow-300/20 rounded-lg rotate-12"
          animate={{
            rotate: [12, 42, 12],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-1/2 right-10 w-24 h-24 bg-purple-300/20 rounded-full"
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      {/* Iconos flotantes */}
      <FloatingIcon className="top-32 left-40 text-3xl text-yellow-300" delay={0}>
        👑
      </FloatingIcon>
      <FloatingIcon className="bottom-40 right-32 text-2xl text-blue-300" delay={1}>
        📊
      </FloatingIcon>
      <FloatingIcon className="top-1/4 left-1/4 text-3xl text-purple-300" delay={2}>
        ⚙️
      </FloatingIcon>
      <FloatingIcon className="bottom-1/3 left-1/3 text-2xl text-cyan-300" delay={0.5}>
        🛡️
      </FloatingIcon>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Lado izquierdo - Información */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Botón volver */}
            <motion.div className="mb-8" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                <span className="font-medium">Volver al inicio</span>
              </Link>
            </motion.div>

            {/* Icono principal */}
            <motion.div
              className="relative mb-8"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center text-6xl shadow-2xl mx-auto">
                  👨‍💼
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-lg"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  👑
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 text-3xl"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  ⚡
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-6xl font-black text-white mb-6"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 30px rgba(255,255,255,0.8)",
                  "0 0 20px rgba(255,255,255,0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Panel de
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Administración
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-white/90 font-medium mb-8 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🎯 Centro de control para gestionar la plataforma educativa y monitorear el progreso estudiantil
            </motion.p>

            {/* Características del panel */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">📊</div>
                <p className="text-white font-medium">Análisis Detallado</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">👥</div>
                <p className="text-white font-medium">Gestión de Estudiantes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">📝</div>
                <p className="text-white font-medium">Control de Contenido</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">🏆</div>
                <p className="text-white font-medium">Seguimiento de Logros</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Lado derecho - Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              {/* Header del formulario */}
              <div className="text-center mb-8">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <UserCog className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl font-black text-gray-800 mb-2">Acceso Seguro</h2>
                <p className="text-gray-600">Panel exclusivo para administradores</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo de usuario */}
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-lg font-bold text-blue-700 flex items-center">
                    👤 Usuario Administrador
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Ingresa tu usuario"
                    className="w-full pl-4 py-4 text-lg rounded-2xl border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-200/50 transition-all"
                  />
                </div>

                {/* Campo de contraseña */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-lg font-bold text-blue-700 flex items-center">
                    🔐 Contraseña Segura
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Ingresa tu contraseña"
                      className="w-full pl-4 pr-12 py-4 text-lg rounded-2xl border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-200/50 transition-all"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-blue-100 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-blue-500" />
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Alert variant="destructive" className="rounded-xl border-red-200 bg-red-50">
                      <AlertDescription className="flex items-center">
                        <span className="text-2xl mr-3">⚠️</span>
                        <div>
                          <p className="font-medium">Error de acceso</p>
                          <p>{error}</p>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {/* Botón de envío */}
                <motion.div whileHover={!isLoading ? { scale: 1.02 } : {}} whileTap={!isLoading ? { scale: 0.98 } : {}}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 text-xl font-black rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg transition-all duration-300 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-3"
                        >
                          <Loader2 className="w-6 h-6" />
                        </motion.div>
                        <span>Verificando acceso...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Shield className="w-6 h-6 mr-3" />
                        <span>Acceder al Panel</span>
                      </div>
                    )}
                  </Button>
                </motion.div>

                {/* Enlaces adicionales */}
                <div className="text-center pt-4 space-y-2">
                  <Link
                    to="/forgot-password"
                    className="block text-blue-600 hover:text-blue-700 font-medium underline decoration-wavy transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                  <p className="text-sm text-gray-500">Acceso restringido solo para personal autorizado</p>
                </div>
              </form>
            </div>

            {/* Efectos decorativos */}
            <motion.div
              className="absolute -top-6 -left-6 text-4xl"
              animate={{
                rotate: [0, 15, 0, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              🛡️
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -right-6 text-3xl"
              animate={{
                y: [0, -8, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              ⚙️
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Overlay de carga */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-600/90 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md mx-4"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="text-6xl mb-4"
              >
                🔓
              </motion.div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Verificando credenciales</h3>
              <p className="text-gray-600">Accediendo al panel de administración...</p>

              {/* Barra de progreso */}
              <div className="mt-6 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminLoginPage
