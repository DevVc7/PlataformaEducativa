"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { mockQuestions } from "@/src/utils/mockData"
import type { Question, Option } from "@/src/types"
import { AlertCircle, HelpCircle, ArrowRight, ArrowLeft, Trophy, ThumbsUp, Calculator, BookOpen } from "lucide-react"
import Mascot from "@/src/components/common/Mascot"
import ProgressBar from "@/src/components/common/ProgressBar"

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
  const [showCelebration, setShowCelebration] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)

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

    if (option?.isCorrect) {
      // Calcular puntos basados en dificultad y tiempo
      const difficultyPoints =
        currentQuestion.difficulty === "easy" ? 5 : currentQuestion.difficulty === "medium" ? 10 : 15

      const attemptMultiplier = attempts === 0 ? 1 : 0.5
      const points = Math.round(difficultyPoints * attemptMultiplier)

      setEarnedPoints(points)
      setShowCelebration(true)

      // Ocultar celebración después de 3 segundos
      setTimeout(() => {
        setShowCelebration(false)
      }, 3000)
    }

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
    setShowCelebration(false)
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <p>Cargando preguntas...</p>
      </div>
    )
  }

  const questionTypeClass = type === "matematica" ? "matematica-bg" : "comunicacion-bg"
  const questionTypeColor =
    type === "matematica"
      ? "bg-[#4CAF50]/10 border-[#4CAF50]/20 text-[#4CAF50]"
      : "bg-[#FF9800]/10 border-[#FF9800]/20 text-[#FF9800]"

  return (
    <div className="max-w-3xl mx-auto relative">
      <Mascot position="bottom-left" type={type === "matematica" ? "owl" : "star"} />

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div className="bg-white rounded-2xl p-8 shadow-kid border-4 border-primary/20 animate-bounce-slow text-center">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">¡Excelente trabajo!</h2>
            <p className="text-lg mb-4">
              Has ganado <span className="font-bold text-primary">{earnedPoints} puntos</span>
            </p>
            <Button onClick={() => setShowCelebration(false)} className="btn-primary">
              ¡Seguir aprendiendo!
            </Button>
          </div>
        </div>
      )}

      <div className="mb-6 bg-gradient-to-r from-primary/20 to-secondary/20 p-4 rounded-2xl shadow-kid">
        <div className="flex justify-between items-center">
          <h1 className={`text-xl font-bold px-4 py-2 rounded-xl ${questionTypeClass}`}>
            {type === "matematica" ? "Matemática" : "Comunicación"}
          </h1>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm">
            <span className="font-bold">Pregunta</span>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {currentIndex + 1}
            </div>
            <span>de {questions.length}</span>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar
            value={currentIndex + 1}
            max={questions.length}
            type={type === "matematica" ? "matematica" : "comunicacion"}
            size="md"
            showLabel={false}
          />
        </div>
      </div>

      <Card className="kid-card border-4 border-primary/20 mb-6">
        <CardHeader className={`bg-${type === "matematica" ? "[#4CAF50]" : "[#FF9800]"}/10`}>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${type === "matematica" ? "bg-[#4CAF50] text-white" : "bg-[#FF9800] text-white"}`}
            >
              {type === "matematica" ? <Calculator className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
            </div>
            <div>
              <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
              <CardDescription>
                Dificultad:{" "}
                <span
                  className={`font-bold ${
                    currentQuestion.difficulty === "easy"
                      ? "text-green-500"
                      : currentQuestion.difficulty === "medium"
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {currentQuestion.difficulty === "easy"
                    ? "Fácil"
                    : currentQuestion.difficulty === "medium"
                      ? "Media"
                      : "Difícil"}
                </span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="mb-4 p-4 bg-white rounded-xl border-2 border-primary/10 shadow-sm">
            <p className="text-lg">{currentQuestion.content}</p>
          </div>

          <RadioGroup value={selectedOption || ""} className="space-y-3">
            {currentQuestion.options.map((option: Option) => (
              <div
                key={option.id}
                className={`flex items-center space-x-2 border-2 p-4 rounded-xl transition-all hover:shadow-kid hover:-translate-y-1 cursor-pointer ${
                  isAnswered && option.id === selectedOption
                    ? option.isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : isAnswered && option.isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-primary/10 bg-white"
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <RadioGroupItem value={option.id} id={option.id} disabled={isAnswered} className="mr-2" />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
                {isAnswered && option.isCorrect && <ThumbsUp className="h-5 w-5 text-green-500" />}
              </div>
            ))}
          </RadioGroup>

          {isAnswered && (
            <Alert
              variant={isCorrect ? "default" : "destructive"}
              className={`mt-4 rounded-xl border-2 ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
            >
              <AlertCircle className={`h-5 w-5 ${isCorrect ? "text-green-500" : "text-red-500"}`} />
              <AlertTitle className="text-lg">{isCorrect ? "¡Correcto! 🎉" : "Incorrecto 😕"}</AlertTitle>
              <AlertDescription className="mt-2">
                {isCorrect ? currentQuestion.feedback.correct : currentQuestion.feedback.incorrect}
              </AlertDescription>
            </Alert>
          )}

          {showHint && currentQuestion.hints[hintIndex] && (
            <Alert className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              <AlertTitle className="text-blue-500">Pista</AlertTitle>
              <AlertDescription>{currentQuestion.hints[hintIndex]}</AlertDescription>
            </Alert>
          )}
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

            {!isAnswered ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleShowHint}
                  disabled={!currentQuestion.hints.length}
                  className="rounded-xl border-2 border-blue-200 text-blue-500 hover:bg-blue-50"
                >
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
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    className="rounded-xl border-2 border-primary/20 hover:bg-primary/10"
                  >
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

      <div className="flex flex-wrap gap-2 justify-center">
        {questions.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`w-12 h-12 rounded-xl border-2 ${
              index === currentIndex
                ? `${type === "matematica" ? "bg-[#4CAF50]" : "bg-[#FF9800]"} text-white border-transparent`
                : index < currentIndex
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

export default QuestionPage
