"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Star, Trophy, Medal, Lock } from "lucide-react"

interface AchievementBadgeProps {
  type: "star" | "trophy" | "medal"
  level: number
  label: string
  unlocked?: boolean
  points?: number
  className?: string
}

const AchievementBadge = ({ type, level, label, unlocked = true, points, className }: AchievementBadgeProps) => {
  // Colores basados en el tipo de logro
  const getBadgeColors = () => {
    if (!unlocked) return "from-gray-400 to-gray-500"

    switch (type) {
      case "star":
        return "from-yellow-400 to-amber-500"
      case "trophy":
        return "from-blue-400 to-indigo-500"
      case "medal":
        return "from-purple-400 to-pink-500"
      default:
        return "from-green-400 to-emerald-500"
    }
  }

  // Icono basado en el tipo
  const BadgeIcon = () => {
    if (!unlocked) return <Lock className="h-5 w-5 text-white" />

    switch (type) {
      case "star":
        return <Star className="h-5 w-5 text-white" />
      case "trophy":
        return <Trophy className="h-5 w-5 text-white" />
      case "medal":
        return <Medal className="h-5 w-5 text-white" />
      default:
        return <Star className="h-5 w-5 text-white" />
    }
  }

  // Estrellas para el nivel
  const LevelStars = () => {
    return (
      <div className="flex">
        {[...Array(level)].map((_, i) => (
          <motion.span
            key={i}
            className="text-yellow-300 text-xs"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.2 }}
          >
            ⭐
          </motion.span>
        ))}
      </div>
    )
  }

  return (
    <motion.div className={cn("relative group", className)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <motion.div
        className={cn(
          "h-12 w-12 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg relative",
          getBadgeColors(),
        )}
        initial={{ rotate: -10, scale: 0.9 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <BadgeIcon />

        {/* Efecto de brillo */}
        {unlocked && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: ["0 0 0 0px rgba(255, 255, 255, 0.4)", "0 0 0 10px rgba(255, 255, 255, 0)"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        )}
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg p-2 shadow-lg border border-gray-200 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"
        initial={{ y: 10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
      >
        <div className="text-center">
          <p className="font-bold text-sm">{label}</p>
          <LevelStars />
          {points && unlocked && <p className="text-xs text-gray-600 mt-1">{points} puntos</p>}
          {!unlocked && <p className="text-xs text-gray-600 mt-1">Bloqueado</p>}
        </div>
        <div className="absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
      </motion.div>
    </motion.div>
  )
}

export default AchievementBadge
