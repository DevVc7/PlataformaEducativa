"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface BouncingElementProps {
  children: ReactNode
  delay?: number
  scale?: number
  className?: string
}

export const BouncingElement = ({ children, delay = 0, scale = 1.1, className = "" }: BouncingElementProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: scale }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        duration: 2,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  )
}
