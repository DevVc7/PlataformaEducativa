"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, GraduationCap, UserCog, Star, Heart, Zap } from "lucide-react"

const RoleSelectionPage = () => {
  const navigate = useNavigate()
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleRoleSelect = (role: "student" | "admin") => {
    setSelectedRole(role)
    setTimeout(() => {
      navigate(role === "student" ? "/login/student" : "/login/admin")
    }, 800)
  }

  const FloatingIcon = ({ children, delay = 0, duration = 3 }: any) => (
    <motion.div
      className="absolute text-4xl opacity-20"
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400">
      {/* Fondo animado con formas geométricas */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-24 h-24 bg-yellow-300/20 rounded-lg rotate-45"
          animate={{
            rotate: [45, 65, 45],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-1/2 left-10 w-16 h-16 bg-green-300/20 rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      {/* Iconos flotantes */}
      <FloatingIcon delay={0} duration={4}>
        <Star className="text-yellow-300" />
      </FloatingIcon>
      <FloatingIcon delay={1} duration={5}>
        <Heart className="text-pink-300 absolute top-32 right-40" />
      </FloatingIcon>
      <FloatingIcon delay={2} duration={3.5}>
        <Zap className="text-yellow-400 absolute bottom-40 left-32" />
      </FloatingIcon>
      <FloatingIcon delay={0.5} duration={4.5}>
        <Sparkles className="text-purple-300 absolute top-1/4 right-1/4" />
      </FloatingIcon>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header con animación */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center pt-16 pb-8"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="relative">
              <div className="text-8xl">🌟</div>
              <motion.div
                className="absolute -top-2 -right-2 text-2xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                ✨
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl font-black text-white mb-4 drop-shadow-lg"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,255,255,0.5)",
                "0 0 30px rgba(255,255,255,0.8)",
                "0 0 20px rgba(255,255,255,0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            ¡Bienvenido a tu
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Aventura Educativa!
            </span>
          </motion.h1>

          <motion.p
            className="text-2xl text-white/90 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ¿Quién eres hoy en esta increíble aventura?
          </motion.p>
        </motion.div>

        {/* Cards de selección */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl w-full">
            {/* Tarjeta Estudiante */}
            <motion.div
              className={`relative group cursor-pointer ${selectedRole === "student" ? "z-20" : ""}`}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredRole("student")}
              onMouseLeave={() => setHoveredRole(null)}
              onClick={() => handleRoleSelect("student")}
            >
              <div
                className={`relative bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-8 shadow-2xl transition-all duration-500 ${
                  hoveredRole === "student" ? "shadow-green-500/50 shadow-3xl" : ""
                } ${selectedRole === "student" ? "scale-110 rotate-2" : ""}`}
              >
                {/* Efecto de brillo */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                  animate={hoveredRole === "student" ? { x: [-100, 400] } : {}}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />

                {/* Icono principal */}
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-6 shadow-xl"
                  animate={{
                    y: hoveredRole === "student" ? [-5, 5, -5] : [0, -3, 0],
                    rotate: hoveredRole === "student" ? [0, -5, 5, 0] : [0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <GraduationCap size={48} className="text-green-500" />
                </motion.div>

                {/* Contenido */}
                <div className="text-center pt-12">
                  <motion.h2
                    className="text-4xl font-black text-white mb-4"
                    animate={
                      hoveredRole === "student"
                        ? {
                            scale: [1, 1.1, 1],
                            color: ["#ffffff", "#ffff00", "#ffffff"],
                          }
                        : {}
                    }
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    ¡Soy Estudiante!
                  </motion.h2>

                  <p className="text-xl text-white/90 mb-8 font-medium">
                    🚀 ¡Entra para aprender, jugar y convertirte en un súper explorador del conocimiento!
                  </p>

                  {/* Ilustración animada */}
                  <motion.div
                    className="relative h-48 mb-8 rounded-xl bg-white/20 backdrop-blur-sm overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-8xl"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      >
                        🦸‍♂️
                      </motion.div>
                      <motion.div
                        className="absolute top-4 right-4 text-3xl"
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        📚
                      </motion.div>
                      <motion.div
                        className="absolute bottom-4 left-4 text-2xl"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                      >
                        ⭐
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.button
                    className={`w-full py-4 px-8 rounded-2xl font-black text-xl transition-all duration-300 ${
                      selectedRole === "student"
                        ? "bg-yellow-400 text-green-800 shadow-yellow-400/50 shadow-2xl"
                        : "bg-white text-green-600 shadow-xl hover:shadow-2xl"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      selectedRole === "student"
                        ? {
                            boxShadow: [
                              "0 0 20px rgba(255, 255, 0, 0.5)",
                              "0 0 40px rgba(255, 255, 0, 0.8)",
                              "0 0 20px rgba(255, 255, 0, 0.5)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {selectedRole === "student" ? "¡Iniciando Aventura! 🚀" : "¡Comenzar Aventura! 🌟"}
                  </motion.button>
                </div>

                {/* Partículas decorativas */}
                <motion.div
                  className="absolute top-8 right-8 text-yellow-300 text-2xl"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  🌟
                </motion.div>
              </div>
            </motion.div>

            {/* Tarjeta Profesor */}
            <motion.div
              className={`relative group cursor-pointer ${selectedRole === "admin" ? "z-20" : ""}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredRole("admin")}
              onMouseLeave={() => setHoveredRole(null)}
              onClick={() => handleRoleSelect("admin")}
            >
              <div
                className={`relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl transition-all duration-500 ${
                  hoveredRole === "admin" ? "shadow-blue-500/50 shadow-3xl" : ""
                } ${selectedRole === "admin" ? "scale-110 rotate-2" : ""}`}
              >
                {/* Efecto de brillo */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                  animate={hoveredRole === "admin" ? { x: [-100, 400] } : {}}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />

                {/* Icono principal */}
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-6 shadow-xl"
                  animate={{
                    y: hoveredRole === "admin" ? [-5, 5, -5] : [0, -3, 0],
                    rotate: hoveredRole === "admin" ? [0, -5, 5, 0] : [0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <UserCog size={48} className="text-blue-500" />
                </motion.div>

                {/* Contenido */}
                <div className="text-center pt-12">
                  <motion.h2
                    className="text-4xl font-black text-white mb-4"
                    animate={
                      hoveredRole === "admin"
                        ? {
                            scale: [1, 1.1, 1],
                            color: ["#ffffff", "#ffff00", "#ffffff"],
                          }
                        : {}
                    }
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    ¡Soy Profesor!
                  </motion.h2>

                  <p className="text-xl text-white/90 mb-8 font-medium">
                    👨‍🏫 Accede al panel mágico para guiar y gestionar la aventura educativa
                  </p>

                  {/* Ilustración animada */}
                  <motion.div
                    className="relative h-48 mb-8 rounded-xl bg-white/20 backdrop-blur-sm overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-8xl"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      >
                        👨‍🏫
                      </motion.div>
                      <motion.div
                        className="absolute top-4 right-4 text-3xl"
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        📊
                      </motion.div>
                      <motion.div
                        className="absolute bottom-4 left-4 text-2xl"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                      >
                        👑
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.button
                    className={`w-full py-4 px-8 rounded-2xl font-black text-xl transition-all duration-300 ${
                      selectedRole === "admin"
                        ? "bg-yellow-400 text-blue-800 shadow-yellow-400/50 shadow-2xl"
                        : "bg-white text-blue-600 shadow-xl hover:shadow-2xl"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      selectedRole === "admin"
                        ? {
                            boxShadow: [
                              "0 0 20px rgba(255, 255, 0, 0.5)",
                              "0 0 40px rgba(255, 255, 0, 0.8)",
                              "0 0 20px rgba(255, 255, 0, 0.5)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {selectedRole === "admin" ? "¡Accediendo! 🔓" : "Acceder al Panel 🎯"}
                  </motion.button>
                </div>

                {/* Partículas decorativas */}
                <motion.div
                  className="absolute top-8 left-8 text-yellow-300 text-2xl"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -180, -360],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  👑
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer animado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center pb-8"
        >
          <motion.p
            className="text-white/80 text-lg font-medium"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            ✨ Cada aventura comienza con una decisión ✨
          </motion.p>
        </motion.div>
      </div>

      {/* Overlay de selección */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-3xl p-8 text-center shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="text-6xl mb-4"
              >
                🚀
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800">
                ¡Preparando tu aventura {selectedRole === "student" ? "educativa" : "administrativa"}!
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RoleSelectionPage
