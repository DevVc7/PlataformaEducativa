"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { mockQuestions } from "@/utils/mockData"
import type { Question, Option } from "@/types"
import { AlertCircle, HelpCircle, ArrowRight, ArrowLeft } from "lucide-react"

const QuestionPage = () => {
  const { type } = useParams<{ type: "matematica" | "comunicacion" }>()
  const navigate = useNavigate()

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    if (type) {
      // Filtrar preguntas por tipo
      const filteredQuestions = mockQuestions.filter((q) => q.type === type)
      setQuestions(filteredQuestions)
    }
  }, [type])

  const currentQuestion = questions[currentIndex]

  const handleOptionSelect = (optionId: string) => {
    if (!isAnswered) {
      setSelectedOption(optionId)
    }
  }

  const handleSubmit = () => {
    if (!selectedOption) return

    const option = currentQuestion.options.find((opt) => opt.id === selectedOption)
    setIsAnswered(true)
    setIsCorrect(option?.isCorrect || false)
    setAttempts((prev) => prev + 1)

    // Aquí se podría enviar la respuesta al servidor
  }

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      resetQuestion()
    } else {
      // Navegar a resultados o dashboard
      navigate("/dashboard")
    }
  }

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      resetQuestion()
    }
  }

  const handleRetry = () => {
    setIsAnswered(false)
    setSelectedOption(null)
    setShowHint(false)
  }

  const handleShowHint = () => {
    setShowHint(true)
    if (hintIndex < (currentQuestion?.hints.length || 0) - 1) {
      setHintIndex((prev) => prev + 1)
    }
  }

  const resetQuestion = () => {
    setSelectedOption(null)
    setIsAnswered(false)
    setIsCorrect(false)
    setShowHint(false)
    setHintIndex(0)
    setAttempts(0)
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <p>Cargando preguntas...</p>
      </div>
    )
  }

  const questionTypeClass = type === "matematica" ? "matematica-bg" : "comunicacion-bg"

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <h1 className={`text-xl font-bold px-4 py-2 rounded-md ${questionTypeClass}`}>
          {type === "matematica" ? "Matemática" : "Comunicación"}
        </h1>
        <div className="text-sm text-gray-500">
          Pregunta {currentIndex + 1} de {questions.length}
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{currentQuestion.title}</CardTitle>
          <CardDescription>
            Dificultad:{" "}
            {currentQuestion.difficulty === "easy"
              ? "Fácil"
              : currentQuestion.difficulty === "medium"
                ? "Media"
                : "Difícil"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mb-4">
            <p className="text-lg">{currentQuestion.content}</p>
          </div>

          <RadioGroup value={selectedOption || ""} className="space-y-3">
            {currentQuestion.options.map((option: Option) => (
              <div
                key={option.id}
                className={`flex items-center space-x-2 border p-3 rounded-md ${
                  isAnswered && option.id === selectedOption
                    ? option.isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : isAnswered && option.isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <RadioGroupItem value={option.id} id={option.id} disabled={isAnswered} className="mr-2" />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {isAnswered && (
            <Alert variant={isCorrect ? "default" : "destructive"} className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{isCorrect ? "¡Correcto!" : "Incorrecto"}</AlertTitle>
              <AlertDescription>
                {isCorrect ? currentQuestion.feedback.correct : currentQuestion.feedback.incorrect}
              </AlertDescription>
            </Alert>
          )}

          {showHint && currentQuestion.hints[hintIndex] && (
            <Alert className="mt-4 bg-blue-50 border-blue-200">
              <HelpCircle className="h-4 w-4 text-blue-500" />
              <AlertTitle>Pista</AlertTitle>
              <AlertDescription>{currentQuestion.hints[hintIndex]}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrevQuestion} disabled={currentIndex === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>

            {!isAnswered ? (
              <>
                <Button variant="outline" onClick={handleShowHint} disabled={!currentQuestion.hints.length}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Pista
                </Button>
                <Button onClick={handleSubmit} disabled={!selectedOption} className="btn-primary">
                  Responder
                </Button>
              </>
            ) : (
              <>
                {!isCorrect && attempts < 2 ? (
                  <Button onClick={handleRetry} variant="outline">
                    Reintentar
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion} className="btn-primary">
                    {currentIndex < questions.length - 1 ? (
                      <>
                        Siguiente
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      "Finalizar"
                    )}
                  </Button>
                )}
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default QuestionPage
