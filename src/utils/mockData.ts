import type { User, Question, Evaluation, StudentProgress } from "../types"
import { v4 as uuidv4 } from "uuid"

// Usuarios de prueba
export const mockUsers: User[] = [
  {
    id: "1",
    username: "alumno1",
    name: "Juan Pérez",
    role: "alumno",
    grade: "6°",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    username: "alumno2",
    name: "María García",
    role: "alumno",
    grade: "6°",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    username: "admin",
    name: "Profesor Rodríguez",
    role: "administrador",
    grade: "N/A",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Preguntas de matemáticas
export const mockMathQuestions: Question[] = [
  {
    id: uuidv4(),
    type: "matematica",
    title: "Operaciones con fracciones",
    content: "¿Cuál es el resultado de 1/4 + 2/4?",
    contentType: "text",
    options: [
      { id: "a", text: "1/2", isCorrect: false },
      { id: "b", text: "3/4", isCorrect: true },
      { id: "c", text: "3/8", isCorrect: false },
      { id: "d", text: "1", isCorrect: false },
    ],
    difficulty: "medium",
    feedback: {
      correct: "¡Correcto! 1/4 + 2/4 = 3/4 porque tienen el mismo denominador.",
      incorrect:
        "Incorrecto. Cuando sumamos fracciones con el mismo denominador, sumamos los numeradores y mantenemos el denominador.",
    },
    hints: [
      "Recuerda que para sumar fracciones con el mismo denominador, sumamos los numeradores.",
      "El denominador se mantiene igual cuando las fracciones tienen el mismo denominador.",
    ],
    points: 10,
  },
  {
    id: uuidv4(),
    type: "matematica",
    title: "Geometría",
    content: "Si un cuadrado tiene 5 cm de lado, ¿cuál es su área?",
    contentType: "text",
    options: [
      { id: "a", text: "10 cm²", isCorrect: false },
      { id: "b", text: "20 cm²", isCorrect: false },
      { id: "c", text: "25 cm²", isCorrect: true },
      { id: "d", text: "30 cm²", isCorrect: false },
    ],
    difficulty: "easy",
    feedback: {
      correct: "¡Correcto! El área de un cuadrado es lado × lado, por lo que 5 cm × 5 cm = 25 cm².",
      incorrect: "Incorrecto. Recuerda que el área de un cuadrado se calcula multiplicando el lado por sí mismo.",
    },
    hints: ["El área de un cuadrado se calcula con la fórmula A = l²", "Sustituye el valor del lado en la fórmula."],
    points: 5,
  },
  {
    id: uuidv4(),
    type: "matematica",
    title: "Problemas con decimales",
    content: "Juan tiene 3.75 metros de cinta. Si usa 1.5 metros para un proyecto, ¿cuánta cinta le queda?",
    contentType: "text",
    options: [
      { id: "a", text: "2.25 metros", isCorrect: true },
      { id: "b", text: "2.15 metros", isCorrect: false },
      { id: "c", text: "2.35 metros", isCorrect: false },
      { id: "d", text: "2.5 metros", isCorrect: false },
    ],
    difficulty: "medium",
    feedback: {
      correct: "¡Correcto! 3.75 - 1.5 = 2.25 metros.",
      incorrect: "Incorrecto. Para resolver este problema, debes restar 1.5 de 3.75.",
    },
    hints: [
      "Debes restar la cantidad usada del total disponible.",
      "Alinea los números decimales correctamente para restar.",
    ],
    points: 8,
  },
]

// Preguntas de comunicación
export const mockCommunicationQuestions: Question[] = [
  {
    id: uuidv4(),
    type: "comunicacion",
    title: "Comprensión lectora",
    content:
      'Lee el siguiente párrafo: "María salió temprano de casa. El cielo estaba nublado y llevaba un paraguas." ¿Por qué María llevaba un paraguas?',
    contentType: "text",
    options: [
      { id: "a", text: "Porque hacía mucho sol", isCorrect: false },
      { id: "b", text: "Porque iba a la playa", isCorrect: false },
      { id: "c", text: "Porque podría llover", isCorrect: true },
      { id: "d", text: "Porque era su cumpleaños", isCorrect: false },
    ],
    difficulty: "easy",
    feedback: {
      correct: "¡Correcto! María llevaba un paraguas porque el cielo estaba nublado y podría llover.",
      incorrect: 'Incorrecto. Fíjate en la relación entre "cielo nublado" y "llevar paraguas".',
    },
    hints: [
      "Piensa en para qué se usa normalmente un paraguas.",
      "Relaciona el estado del cielo con la necesidad de llevar paraguas.",
    ],
    points: 5,
  },
  {
    id: uuidv4(),
    type: "comunicacion",
    title: "Gramática",
    content: "¿Cuál de las siguientes oraciones contiene un verbo en tiempo pasado?",
    contentType: "text",
    options: [
      { id: "a", text: "Mañana iré al cine", isCorrect: false },
      { id: "b", text: "Estoy leyendo un libro", isCorrect: false },
      { id: "c", text: "Ayer visité a mi abuela", isCorrect: true },
      { id: "d", text: "Siempre como frutas", isCorrect: false },
    ],
    difficulty: "medium",
    feedback: {
      correct: '¡Correcto! "Visité" es un verbo en tiempo pasado.',
      incorrect: "Incorrecto. El tiempo pasado indica acciones que ya ocurrieron.",
    },
    hints: [
      "El tiempo pasado se refiere a acciones que ya sucedieron.",
      'Busca palabras que indiquen tiempo como "ayer".',
    ],
    points: 8,
  },
  {
    id: uuidv4(),
    type: "comunicacion",
    title: "Ortografía",
    content: "¿Cuál de las siguientes palabras está escrita correctamente?",
    contentType: "text",
    options: [
      { id: "a", text: "Examen", isCorrect: true },
      { id: "b", text: "Exámen", isCorrect: false },
      { id: "c", text: "Exàmen", isCorrect: false },
      { id: "d", text: "Examén", isCorrect: false },
    ],
    difficulty: "hard",
    feedback: {
      correct: '¡Correcto! "Examen" se escribe sin tilde.',
      incorrect: 'Incorrecto. Las palabras graves que terminan en "n" no llevan tilde.',
    },
    hints: [
      "Recuerda las reglas de acentuación para palabras graves.",
      'Las palabras graves que terminan en "n", "s" o vocal no llevan tilde.',
    ],
    points: 10,
  },
]

// Todas las preguntas
export const mockQuestions: Question[] = [...mockMathQuestions, ...mockCommunicationQuestions]

// Evaluaciones
export const mockEvaluations: Evaluation[] = [
  {
    id: uuidv4(),
    title: "Evaluación de Matemáticas - Fracciones",
    description: "Evaluación sobre operaciones con fracciones para alumnos de 6° grado",
    type: "matematica",
    questions: mockMathQuestions.slice(0, 2),
    timeLimit: 20,
    passingScore: 70,
  },
  {
    id: uuidv4(),
    title: "Evaluación de Comunicación - Comprensión",
    description: "Evaluación sobre comprensión lectora y gramática para alumnos de 6° grado",
    type: "comunicacion",
    questions: mockCommunicationQuestions.slice(0, 2),
    timeLimit: 25,
    passingScore: 60,
  },
]

// Progreso de estudiantes
export const mockStudentProgress: StudentProgress[] = [
  {
    userId: "1",
    questionType: "matematica",
    totalQuestions: 15,
    correctAnswers: 12,
    averageTime: 45,
    commonMistakes: ["Confusión en operaciones con fracciones", "Errores en cálculo de áreas"],
    recommendations: ["Practicar más ejercicios de fracciones", "Repasar fórmulas de geometría"],
    lastActivity: new Date("2023-05-10"),
  },
  {
    userId: "1",
    questionType: "comunicacion",
    totalQuestions: 10,
    correctAnswers: 8,
    averageTime: 60,
    commonMistakes: ["Dificultad en identificar ideas principales"],
    recommendations: ["Leer más textos narrativos", "Practicar resúmenes"],
    lastActivity: new Date("2023-05-12"),
  },
  {
    userId: "2",
    questionType: "matematica",
    totalQuestions: 12,
    correctAnswers: 9,
    averageTime: 50,
    commonMistakes: ["Problemas con decimales"],
    recommendations: ["Practicar operaciones con decimales"],
    lastActivity: new Date("2023-05-11"),
  },
  {
    userId: "2",
    questionType: "comunicacion",
    totalQuestions: 8,
    correctAnswers: 7,
    averageTime: 55,
    commonMistakes: ["Errores en ortografía"],
    recommendations: ["Practicar reglas de acentuación"],
    lastActivity: new Date("2023-05-13"),
  },
]
