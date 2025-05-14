// Tipos de usuario
export type UserRole = "alumno" | "administrador"

export interface User {
  id: string
  username: string
  name: string
  role: UserRole
  grade: string
  avatar?: string
}

// Tipos para autenticación
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Tipos para preguntas
export type QuestionType = "matematica" | "comunicacion"
export type ContentType = "text" | "image" | "video" | "audio" | "equation"
export type DifficultyLevel = "easy" | "medium" | "hard"

export interface Option {
  id: string
  text: string
  isCorrect: boolean
}

export interface Question {
  id: string
  type: QuestionType
  title: string
  content: string
  contentType: ContentType
  options: Option[]
  difficulty: DifficultyLevel
  feedback: {
    correct: string
    incorrect: string
  }
  hints: string[]
  points: number
}

// Tipos para respuestas y progreso
export interface Answer {
  questionId: string
  selectedOptionId: string
  isCorrect: boolean
  timeSpent: number // en segundos
  attempts: number
  hintsUsed: number
}

export interface StudentProgress {
  userId: string
  questionType: QuestionType
  totalQuestions: number
  correctAnswers: number
  averageTime: number
  commonMistakes: string[]
  recommendations: string[]
  lastActivity: Date
}

// Tipos para evaluaciones
export interface Evaluation {
  id: string
  title: string
  description: string
  type: QuestionType
  questions: Question[]
  timeLimit: number // en minutos
  passingScore: number
}

export interface EvaluationResult {
  evaluationId: string
  userId: string
  score: number
  totalTime: number
  answers: Answer[]
  completed: boolean
  date: Date
}
