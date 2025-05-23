"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface MascotProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  character?: "owl" | "robot" | "wizard" | "alien"
  showTip?: boolean
  tipText?: string
  className?: string
}

const Mascot = ({
  position = "bottom-right",
  character = "owl",
  showTip = false,
  tipText = "¡Hola! ¿Necesitas ayuda?",
  className,
}: MascotProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isTipVisible, setIsTipVisible] = useState(showTip)
  const [tipMessage, setTipMessage] = useState(tipText)
  const [isWaving, setIsWaving] = useState(false)
  const [isJumping, setIsJumping] = useState(false)

  // Posicionamiento
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  }

  // Personajes
  const characterEmoji = {
    owl: "🦉",
    robot: "🤖",
    wizard: "🧙‍♂️",
    alien: "👽",
  }

  // Mensajes aleatorios de motivación
  const motivationalMessages = [
    "¡Sigue así! Estás aprendiendo mucho.",
    "¡Wow! Tus habilidades están mejorando.",
    "¿Necesitas ayuda con algún ejercicio?",
    "¡Recuerda tomar un descanso de vez en cuando!",
    "¡Cada pregunta que respondes te hace más inteligente!",
    "¡Estoy aquí para ayudarte en tu aventura!",
    "¿Sabías que practicar todos los días mejora tu aprendizaje?",
    "¡Prueba un desafío nuevo hoy!",
  ]

  // Efecto para mostrar mensajes aleatorios periódicamente
  useEffect(() => {
    if (!showTip) {
      const interval = setInterval(() => {
        const randomShow = Math.random() > 0.7
        if (randomShow && !isTipVisible) {
          const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
          setTipMessage(randomMessage)
          setIsTipVisible(true)

          // Ocultar el mensaje después de un tiempo
          setTimeout(() => {
            setIsTipVisible(false)
          }, 5000)
        }
      }, 15000) // Cada 15 segundos hay una posibilidad de mostrar un mensaje

      return () => clearInterval(interval)
    }
  }, [isTipVisible, showTip])

  // Efecto para actualizar el estado del tip basado en props
  useEffect(() => {
    setIsTipVisible(showTip)
    if (showTip && tipText) {
      setTipMessage(tipText)
    }
  }, [showTip, tipText])

  // Animaciones aleatorias
  useEffect(() => {
    const waveInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsWaving(true)
        setTimeout(() => setIsWaving(false), 2000)
      }
    }, 10000)

    const jumpInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsJumping(true)
        setTimeout(() => setIsJumping(false), 1000)
      }
    }, 8000)

    return () => {
      clearInterval(waveInterval)
      clearInterval(jumpInterval)
    }
  }, [])

  const handleMascotClick = () => {
    if (!isTipVisible) {
      setTipMessage("¡Hola! ¿En qué puedo ayudarte hoy?")
      setIsTipVisible(true)
    } else {
      setIsTipVisible(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className={cn("fixed z-50", positionClasses[position], className)}>
      <div className="relative">
        {/* Burbuja de mensaje */}
        <AnimatePresence>
          {isTipVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-full mb-2 right-0 bg-white rounded-2xl p-4 shadow-lg border-2 border-purple-200 max-w-xs"
              style={{ transformOrigin: "bottom right" }}
            >
              <button
                onClick={() => setIsTipVisible(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="text-sm text-gray-700 pr-4">{tipMessage}</p>
              <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-4 h-4 bg-white border-r-2 border-b-2 border-purple-200"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascota */}
        <motion.div
          className={cn(
            "w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl cursor-pointer shadow-lg border-2 border-white",
            isWaving ? "animate-wave" : "",
            isJumping ? "animate-bounce" : "",
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMascotClick}
          animate={{
            rotate: isWaving ? [0, 15, -15, 15, 0] : 0,
            y: isJumping ? [0, -15, 0] : 0,
          }}
          transition={{
            duration: isWaving ? 0.5 : 0.3,
            ease: "easeInOut",
          }}
        >
          <span className="text-3xl">{characterEmoji[character]}</span>

          {/* Efecto de brillo */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: ["0 0 0 0px rgba(168, 85, 247, 0.4)", "0 0 0 10px rgba(168, 85, 247, 0)"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />

          {/* Estrellas alrededor */}
          <motion.div
            className="absolute -top-1 -right-1 text-yellow-300 text-xs"
            animate={{
              rotate: [0, 360],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            ✨
          </motion.div>

          <motion.div
            className="absolute -bottom-1 -left-1 text-yellow-300 text-xs"
            animate={{
              rotate: [0, -360],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 0.5,
            }}
          >
            ✨
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Mascot
