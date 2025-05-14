"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { mockEvaluations } from "@/utils/mockData"
import type { Evaluation, Answer } from "@/types"
import { Clock, ArrowRight, ArrowLeft } from "lucide-react"

const EvaluationPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      const foundEvaluation = mockEvaluations.find((e) => e.id === id)
      if (foundEvaluation) {
        setEvaluation(foundEvaluation)
        setTimeLeft(foundEvaluation.timeLimit * 60) // Convertir a segundos
      }
    }
  }, [id])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && evaluation) {
      handleSubmitEvaluation()
    }
  }, [timeLeft])

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

  if (!evaluation) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <p>Cargando evaluación...</p>
      </div>
    )
  }

  const currentQuestion = evaluation.questions[currentIndex]
  const questionTypeClass = evaluation.type === "matematica" ? "matematica-bg" : "comunicacion-bg"

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{evaluation.title}</h1>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-md ${questionTypeClass}`}>
          <Clock className="h-4 w-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progreso</span>
          <span>
            {answers.length} de {evaluation.questions.length} preguntas
          </span>
        </div>
        <Progress value={calculateProgress()} className="h-2" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pregunta {currentIndex + 1}</CardTitle>
          <CardDescription>{currentQuestion.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-lg">{currentQuestion.content}</p>
          </div>

          <RadioGroup value={getSelectedOption(currentQuestion.id)} className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50"
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
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrevQuestion} disabled={currentIndex === 0}>
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
                {isSubmitting ? "Enviando..." : "Finalizar Evaluación"}
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
            className={`w-10 h-10 ${
              index === currentIndex
                ? "bg-primary text-primary-foreground"
                : getSelectedOption(evaluation.questions[index].id)
                  ? "bg-muted"
                  : ""
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
