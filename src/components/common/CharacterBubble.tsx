"use client"

import type React from "react"
import styled from "styled-components"

interface CharacterBubbleProps {
  imageUrl: string
  isSelected?: boolean
  onClick?: () => void
  size?: "small" | "medium" | "large"
}

const BubbleContainer = styled.div<{ isSelected: boolean; size: string }>`
  width: ${(props) => {
    switch (props.size) {
      case "small":
        return "30px"
      case "medium":
        return "50px"
      case "large":
        return "70px"
      default:
        return "50px"
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case "small":
        return "30px"
      case "medium":
        return "50px"
      case "large":
        return "70px"
      default:
        return "50px"
    }
  }};
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: ${(props) => (props.isSelected ? "2px solid #007bff" : "none")};
  box-shadow: ${(props) => (props.isSelected ? "0 0 5px rgba(0, 123, 255, 0.5)" : "none")};
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`

const BubbleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const CharacterBubble: React.FC<CharacterBubbleProps> = ({
  imageUrl,
  isSelected = false,
  onClick,
  size = "medium",
}) => {
  return (
    <BubbleContainer isSelected={isSelected} onClick={onClick} size={size}>
      <BubbleImage src={imageUrl} alt="Character" />
    </BubbleContainer>
  )
}

export default CharacterBubble
