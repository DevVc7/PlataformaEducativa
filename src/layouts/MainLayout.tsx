"use client"

import { Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import Sidebar from "../components/common/Sidebar"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useAuth } from "@/src/context/AuthContext"
import { Sparkles } from "lucide-react"

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Animación de entrada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="w-20 h-20 mx-auto mb-4 text-4xl"
          >
            <Sparkles className="w-full h-full text-purple-500" />
          </motion.div>
          <motion.h2
            className="text-2xl font-bold text-rainbow"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            Cargando tu aventura...
          </motion.h2>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </motion.div>

      <div className="flex relative">
        {/* Sidebar con animación */}
        <motion.div
          className="fixed top-16 bottom-0 z-20 lg:relative lg:top-0"
          initial={false}
          animate={{
            x: sidebarOpen ? 0 : "-100%",
            width: sidebarOpen ? "auto" : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <Sidebar />
        </motion.div>

        {/* Overlay para móvil */}
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Contenido principal */}
        <motion.main
          className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen && !isMobile ? "ml-80" : "ml-0"} mt-16`}
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </motion.div>
  )
}

export default MainLayout
