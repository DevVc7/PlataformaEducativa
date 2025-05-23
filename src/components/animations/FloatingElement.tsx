import type React from "react"
import styled, { keyframes } from "styled-components"

interface FloatingElementProps {
  children: React.ReactNode
  floatingRange?: number
  animationDuration?: number
  className?: string
}

const floatAnimation = (floatingRange: number) => keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(${floatingRange}px); }
  100% { transform: translateY(0); }
`

const FloatingElementContainer = styled.div<{ $floatingRange: number; $animationDuration: number }>`
  animation: ${(props) => floatAnimation(props.$floatingRange)} ${(props) => props.$animationDuration}s linear infinite;
`

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  floatingRange = 10,
  animationDuration = 3,
  className,
}) => {
  return (
    <FloatingElementContainer
      $floatingRange={floatingRange}
      $animationDuration={animationDuration}
      className={className}
    >
      {children}
    </FloatingElementContainer>
  )
}

export default FloatingElement
