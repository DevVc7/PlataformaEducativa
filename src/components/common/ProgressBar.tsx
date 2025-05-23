"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import confetti from "canvas-confetti"

interface ProgressBarProps {
  value: number
  max: number
  type?: "general" | "matematica" | "comunicacion" | "ciencias"
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  animated?: boolean
  className?: string
}

const ProgressBar = ({
  value,
  max,
  type = "general",
  size = "md",
  showLabel = false,
  animated = false,
  className,
}: ProgressBarProps) => {
  const [prevValue, setPrevValue] = useState(0)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Determinar el color basado en el tipo
  const getGradient = () => {
    switch (type) {
      case "matematica":
        return "bg-gradient-to-r from-green-400 to-emerald-500"
      case "comunicacion":
        return "bg-gradient-to-r from-orange-400 to-amber-500"
      case "ciencias":
        return "bg-gradient-to-r from-blue-400 to-indigo-500"
      default:
        return "bg-gradient-to-r from-purple-500 to-pink-500"
    }
  }

  // Determinar la altura basada en el tamaño
  const getHeight = () => {
    switch (size) {
      case "sm":
        return "h-3"
      case "md":
        return "h-5"
      case "lg":
        return "h-7"
      default:
        return "h-5"
    }
  }

  // Calcular el porcentaje
  const percentage = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0

  // Efecto para animar cuando el valor cambia
  useEffect(() => {
    if (value > prevValue) {
      setShouldAnimate(true)

      // Si el valor aumenta significativamente o llega a un hito, mostrar confeti
      if (value - prevValue >= 5 || percentage >= 100 || percentage % 25 === 0) {
        setShowConfetti(true)
      }

      const timer = setTimeout(() => {
        setShouldAnimate(false)
        setShowConfetti(false)
      }, 2000)

      return () => clearTimeout(timer)
    }

    setPrevValue(value)
  }, [value, prevValue, percentage])

  // Efecto para lanzar confeti
  useEffect(() => {
    if (showConfetti) {
      const colors =
        type === "matematica"
          ? ["#34d399", "#10b981"]
          : type === "comunicacion"
            ? ["#fb923c", "#f59e0b"]
            : ["#a855f7", "#ec4899"]

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      })
    }
  }, [showConfetti, type])

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("relative bg-gray-200 rounded-full overflow-hidden", getHeight())}>
        <motion.div
          className={cn("absolute left-0 top-0 h-full rounded-full", getGradient())}
          initial={{ width: "0%" }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 1 : 0.3,
            ease: "easeOut",
          }}
        >
          {/* Efecto de brillo */}
          {animated && (
            <motion.div
              className="absolute inset-0 bg-white opacity-30"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          )}

          {/* Partículas cuando se completa un hito */}
          {shouldAnimate && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 right-0 w-2 h-2 rounded-full bg-white"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: Math.random() * 60 - 30,
                    y: Math.random() * 60 - 30,
                    opacity: 0,
                    scale: [1, 1.5, 0],
                  }}
                  transition={{
                    duration: 1 + Math.random(),
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Etiqueta de porcentaje */}
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("text-xs font-bold", percentage > 50 ? "text-white" : "text-gray-700")}>
              {percentage}%
            </span>
          </div>
        )}
      </div>

      {/* Texto de valor/máximo */}
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0</span>
          <span>
            {value} de {max}
          </span>
        </div>
      )}
    </div>
  )
}

export default ProgressBar
