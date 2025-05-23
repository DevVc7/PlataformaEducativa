"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { mockEvaluations } from "@/src/utils/mockData"
import type { Evaluation, Answer } from "@/src/types"
import { Clock, ArrowRight, ArrowLeft, Star } from "lucide-react"
import ProgressBar from "@/src/components/common/ProgressBar"
import Mascot from "@/src/components/common/Mascot"

const EvaluationPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCountdown, setShowCountdown] = useState(true)
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    if (id) {
      const foundEvaluation = mockEvaluations.find((e) => e.id === id)
      if (foundEvaluation) {
        setEvaluation(foundEvaluation)
        setTimeLeft(foundEvaluation.timeLimit * 60) // Convertir a segundos
      }
    }
  }, [id])

  // Efecto para el countdown inicial
  useEffect(() => {
    if (showCountdown) {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1)
        }, 1000)
        return () => clearTimeout(timer)
      } else {
        setShowCountdown(false)
      }
    }
  }, [countdown, showCountdown])

  // Efecto para el temporizador principal
  useEffect(() => {
    if (!showCountdown && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && evaluation && !showCountdown) {
      handleSubmitEvaluation()
    }
  }, [timeLeft, showCountdown])

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex((a) => a.questionId === questionId)

      if (existingAnswerIndex >= 0) {
        const updatedAnswers = [...prev]
        const option = evaluation?.questions.find((q) => q.id === questionId)?.options.find((o) => o.id === optionId)

        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          selectedOptionId: optionId,
          isCorrect: option?.isCorrect || false,
        }

        return updatedAnswers
      } else {
        const option = evaluation?.questions.find((q) => q.id === questionId)?.options.find((o) => o.id === optionId)

        return [
          ...prev,
          {
            questionId,
            selectedOptionId: optionId,
            isCorrect: option?.isCorrect || false,
            timeSpent: 0,
            attempts: 1,
            hintsUsed: 0,
          },
        ]
      }
    })
  }

  const handleNextQuestion = () => {
    if (evaluation && currentIndex < evaluation.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleSubmitEvaluation = () => {
    setIsSubmitting(true)

    // Simulamos el envío de la evaluación
    setTimeout(() => {
      // Aquí se enviarían los datos al servidor
      console.log("Evaluación enviada:", {
        evaluationId: evaluation?.id,
        answers,
      })

      navigate("/results")
    }, 1500)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const getSelectedOption = (questionId: string) => {
    const answer = answers.find((a) => a.questionId === questionId)
    return answer ? answer.selectedOptionId : ""
  }

  const calculateProgress = () => {
    if (!evaluation) return 0
    return (answers.length / evaluation.questions.length) * 100
  }

  if (showCountdown) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-2xl p-8 shadow-kid border-4 border-primary/20 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">¡Prepárate para el desafío!</h2>
          <div className="w-24 h-24 rounded-full bg-primary text-white text-5xl font-bold flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
            {countdown}
          </div>
          <p className="text-lg">El desafío comenzará en segundos...</p>
        </div>
      </div>
    )
  }

  if (!evaluation) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <p>Cargando evaluación...</p>
      </div>
    )
  }

  const currentQuestion = evaluation.questions[currentIndex]
  const questionTypeClass = evaluation.type === "matematica" ? "matematica-bg" : "comunicacion-bg"
  const questionTypeColor = evaluation.type === "matematica" ? "bg-[#4CAF50]" : "bg-[#FF9800]"

  return (
    <div className="max-w-3xl mx-auto relative">
      <Mascot position="bottom-right" type="star" />

      <div className="mb-6 bg-gradient-to-r from-primary/20 to-secondary/20 p-4 rounded-2xl shadow-kid">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{evaluation.title}</h1>
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${questionTypeClass}`}>
            <Clock className="h-5 w-5" />
            <span className="font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold">Progreso del Desafío</span>
            <span className="font-bold">
              {answers.length} de {evaluation.questions.length} preguntas
            </span>
          </div>
          <ProgressBar
            value={answers.length}
            max={evaluation.questions.length}
            type={evaluation.type === "matematica" ? "matematica" : "comunicacion"}
            size="md"
            showLabel={false}
          />
        </div>
      </div>

      <Card className="kid-card border-4 border-primary/20 mb-6">
        <CardHeader className={`bg-${evaluation.type === "matematica" ? "[#4CAF50]" : "[#FF9800]"}/10`}>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${questionTypeColor} text-white`}
            >
              <Star className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Pregunta {currentIndex + 1}</CardTitle>
              <CardDescription>{currentQuestion.title}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4 p-4 bg-white rounded-xl border-2 border-primary/10 shadow-sm">
            <p className="text-lg">{currentQuestion.content}</p>
          </div>

          <RadioGroup value={getSelectedOption(currentQuestion.id)} className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 border-2 border-primary/10 p-4 rounded-xl hover:bg-primary/5 transition-all hover:shadow-kid hover:-translate-y-1 cursor-pointer"
                onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
              >
                <RadioGroupItem value={option.id} id={`${currentQuestion.id}-${option.id}`} className="mr-2" />
                <Label htmlFor={`${currentQuestion.id}-${option.id}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="p-4 bg-white flex justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentIndex === 0}
              className="rounded-xl border-2 border-primary/20 hover:bg-primary/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>

            {currentIndex < evaluation.questions.length - 1 ? (
              <Button onClick={handleNextQuestion} className="btn-primary">
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmitEvaluation} className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Finalizar Desafío"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <div className="flex flex-wrap gap-2 justify-center">
        {evaluation.questions.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`w-12 h-12 rounded-xl border-2 ${
              index === currentIndex
                ? `${evaluation.type === "matematica" ? "bg-[#4CAF50]" : "bg-[#FF9800]"} text-white border-transparent`
                : getSelectedOption(evaluation.questions[index].id)
                  ? "bg-primary/10 border-primary/20 text-primary"
                  : "bg-white border-gray-200"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default EvaluationPage
