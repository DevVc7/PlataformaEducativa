"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/src/context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockStudentProgress, mockEvaluations } from "@/src/utils/mockData"
import type { StudentProgress } from "@/src/types"
import { Calculator, BookOpen, ArrowRight, Rocket, Sparkles, Trophy, Lightbulb } from "lucide-react"
import Mascot from "@/src/components/common/Mascot"
import AchievementBadge from "@/src/components/common/AchievementBadge"
import ProgressBar from "@/src/components/common/ProgressBar"

const Dashboard = () => {
  const { user } = useAuth()
  const [progress, setProgress] = useState<StudentProgress[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const [showMascotTip, setShowMascotTip] = useState(false)

  useEffect(() => {
    if (user) {
      // Simulamos la obtención de datos del servidor
      const userProgress = mockStudentProgress.filter((p) => p.userId === user.id)
      setProgress(userProgress)

      // Mostrar tip de mascota después de 3 segundos
      const timer = setTimeout(() => {
        setShowMascotTip(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [user])

  const getProgressByType = (type: "matematica" | "comunicacion") => {
    return progress.find((p) => p.questionType === type)
  }

  const mathProgress = getProgressByType("matematica")
  const commProgress = getProgressByType("comunicacion")

  const calculatePercentage = (correct: number, total: number) => {
    return total > 0 ? Math.round((correct / total) * 100) : 0
  }

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  return (
    <motion.div className="space-y-6 relative" initial="hidden" animate="visible" variants={containerVariants}>
      {/* Mascota interactiva */}
      <div className="fixed bottom-6 right-6 z-10">
        <Mascot position="bottom-right" showTip={showMascotTip} tipText="¡Hola! ¿Listo para aprender hoy?" />
      </div>

      {/* Header con gradiente */}
      <motion.div className="magical-card p-6 mb-8" variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-rainbow"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              ¡Hola, {user?.name}!
            </motion.h1>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Continúa tu aventura de aprendizaje mágico
            </motion.p>
          </div>
          <div className="flex flex-wrap gap-2">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <AchievementBadge type="star" level={3} label="Matemático Estrella" unlocked={true} points={50} />
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: 10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
              <AchievementBadge type="trophy" level={2} label="Comunicador Experto" unlocked={true} points={30} />
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.9, type: "spring" }}
            >
              <AchievementBadge type="medal" level={1} label="Desafío Semanal" unlocked={false} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Tabs animadas */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 p-1 rounded-xl shadow-md">
            <TabsTrigger
              value="overview"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              onClick={() => setActiveTab("overview")}
            >
              <Rocket className="mr-2 h-5 w-5" />
              Mi Aventura
            </TabsTrigger>
            <TabsTrigger
              value="math"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
              onClick={() => setActiveTab("math")}
            >
              <Calculator className="mr-2 h-5 w-5" />
              Matemática
            </TabsTrigger>
            <TabsTrigger
              value="communication"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-amber-500 data-[state=active]:text-white"
              onClick={() => setActiveTab("communication")}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Comunicación
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="overview" className="space-y-4">
              <motion.div
                className="grid gap-4 md:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Progreso Total */}
                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="magical-card overflow-hidden">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-2">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-purple-600 flex items-center">
                            <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                            Progreso Total
                          </CardTitle>
                          <motion.div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Nivel {Math.floor((mathProgress?.correctAnswers || 0) / 5) + 1}
                            <motion.span
                              animate={{ rotate: [0, 15, 0, -15, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                              className="ml-1"
                            >
                              ✨
                            </motion.span>
                          </motion.div>
                        </div>
                        <CardDescription>¡Sigue avanzando en tu aventura!</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <motion.div
                          className="text-4xl font-bold text-rainbow mb-2"
                          animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          {calculatePercentage(
                            (mathProgress?.correctAnswers || 0) + (commProgress?.correctAnswers || 0),
                            (mathProgress?.totalQuestions || 0) + (commProgress?.totalQuestions || 0),
                          )}
                          %
                        </motion.div>
                        <ProgressBar
                          value={(mathProgress?.correctAnswers || 0) + (commProgress?.correctAnswers || 0)}
                          max={(mathProgress?.totalQuestions || 0) + (commProgress?.totalQuestions || 0)}
                          type="general"
                          size="lg"
                          animated={true}
                        />
                      </CardContent>
                    </div>
                    <CardFooter className="p-4 bg-white">
                      <Link to="/challenges" className="w-full">
                        <Button className="w-full btn-magical">
                          Ver mi progreso
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Matemática */}
                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="magical-card overflow-hidden border-green-200">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-2">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-green-600 flex items-center">
                            <Calculator className="mr-2 h-5 w-5" />
                            Matemática
                          </CardTitle>
                          <motion.div
                            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {mathProgress?.correctAnswers || 0} correctas
                          </motion.div>
                        </div>
                        <CardDescription>Resuelve problemas y gana puntos</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="text-4xl font-bold text-green-500 mb-2">
                          {calculatePercentage(mathProgress?.correctAnswers || 0, mathProgress?.totalQuestions || 0)}%
                        </div>
                        <ProgressBar
                          value={mathProgress?.correctAnswers || 0}
                          max={mathProgress?.totalQuestions || 0}
                          type="matematica"
                          size="lg"
                          animated={true}
                        />
                      </CardContent>
                    </div>
                    <CardFooter className="p-4 bg-white">
                      <Link to="/questions/matematica" className="w-full">
                        <Button className="w-full matematica-theme">
                          Practicar Matemática
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Comunicación */}
                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="magical-card overflow-hidden border-orange-200">
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-2">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-orange-500 flex items-center">
                            <BookOpen className="mr-2 h-5 w-5" />
                            Comunicación
                          </CardTitle>
                          <motion.div
                            className="bg-gradient-to-r from-orange-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {commProgress?.correctAnswers || 0} correctas
                          </motion.div>
                        </div>
                        <CardDescription>Lee, comprende y aprende</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="text-4xl font-bold text-orange-500 mb-2">
                          {calculatePercentage(commProgress?.correctAnswers || 0, commProgress?.totalQuestions || 0)}%
                        </div>
                        <ProgressBar
                          value={commProgress?.correctAnswers || 0}
                          max={commProgress?.totalQuestions || 0}
                          type="comunicacion"
                          size="lg"
                          animated={true}
                        />
                      </CardContent>
                    </div>
                    <CardFooter className="p-4 bg-white">
                      <Link to="/questions/comunicacion" className="w-full">
                        <Button className="w-full comunicacion-theme">
                          Practicar Comunicación
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div
                className="grid gap-4 md:grid-cols-2"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Desafíos Disponibles */}
                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="magical-card border-pink-200">
                    <CardHeader className="bg-gradient-to-br from-pink-50 to-purple-50">
                      <CardTitle className="text-pink-500 flex items-center">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Desafíos Disponibles
                      </CardTitle>
                      <CardDescription>¡Completa estos desafíos para ganar premios!</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 p-4">
                      {mockEvaluations.map((evaluation, index) => (
                        <motion.div
                          key={evaluation.id}
                          className="flex items-center justify-between p-3 border-2 border-pink-100 rounded-xl bg-white hover:bg-pink-50 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <div className="flex items-center">
                            <motion.div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center mr-3 ${
                                evaluation.type === "matematica"
                                  ? "bg-gradient-to-br from-green-400 to-emerald-500"
                                  : "bg-gradient-to-br from-orange-400 to-amber-500"
                              } text-white`}
                              whileHover={{ rotate: 10 }}
                            >
                              {evaluation.type === "matematica" ? (
                                <Calculator className="h-6 w-6" />
                              ) : (
                                <BookOpen className="h-6 w-6" />
                              )}
                            </motion.div>
                            <div>
                              <p className="font-bold">{evaluation.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {evaluation.type === "matematica" ? "Matemática" : "Comunicación"} -{" "}
                                {evaluation.timeLimit} min
                              </p>
                            </div>
                          </div>
                          <Link to={`/evaluation/${evaluation.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl border-2 border-pink-200 hover:bg-pink-100 hover:text-pink-600 group"
                            >
                              ¡Jugar!
                              <motion.span
                                className="inline-block ml-1"
                                animate={{ rotate: [0, 15, 0, -15, 0] }}
                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                              >
                                🎮
                              </motion.span>
                            </Button>
                          </Link>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Consejos para Mejorar */}
                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="magical-card border-purple-200">
                    <CardHeader className="bg-gradient-to-br from-purple-50 to-indigo-50">
                      <CardTitle className="text-purple-600 flex items-center">
                        <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                        Consejos para Mejorar
                      </CardTitle>
                      <CardDescription>Basado en tu desempeño reciente</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4">
                      {mathProgress?.recommendations.map((rec, index) => (
                        <motion.div
                          key={`math-${index}`}
                          className="p-4 border-2 border-green-200 rounded-xl bg-green-50 flex items-start"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <Calculator className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-green-600 mb-1">Matemática:</p>
                            <p className="text-sm">{rec}</p>
                          </div>
                        </motion.div>
                      ))}

                      {commProgress?.recommendations.map((rec, index) => (
                        <motion.div
                          key={`comm-${index}`}
                          className="p-4 border-2 border-orange-200 rounded-xl bg-orange-50 flex items-start"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.8 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <BookOpen className="h-6 w-6 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-orange-600 mb-1">Comunicación:</p>
                            <p className="text-sm">{rec}</p>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="math" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="magical-card border-green-200">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-600 flex items-center">
                      <Calculator className="mr-2 h-5 w-5" />
                      Matemática
                    </CardTitle>
                    <CardDescription>Tu progreso en el área de matemática</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-bold">Progreso general</span>
                        <span className="font-bold text-green-500">
                          {calculatePercentage(mathProgress?.correctAnswers || 0, mathProgress?.totalQuestions || 0)}%
                        </span>
                      </div>
                      <ProgressBar
                        value={mathProgress?.correctAnswers || 0}
                        max={mathProgress?.totalQuestions || 0}
                        type="matematica"
                        size="md"
                        animated={true}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        className="border-2 border-green-200 rounded-xl p-4 bg-green-50"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <p className="text-sm font-bold text-green-600">Preguntas respondidas</p>
                        <p className="text-3xl font-bold">{mathProgress?.totalQuestions || 0}</p>
                      </motion.div>
                      <motion.div
                        className="border-2 border-green-200 rounded-xl p-4 bg-green-50"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <p className="text-sm font-bold text-green-600">Tiempo promedio</p>
                        <p className="text-3xl font-bold">{mathProgress?.averageTime || 0}s</p>
                      </motion.div>
                    </div>

                    <motion.div
                      className="border-2 border-green-200 rounded-xl p-4 bg-green-50"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <h4 className="text-sm font-bold text-green-600 mb-2">Errores comunes</h4>
                      <ul className="space-y-2">
                        {mathProgress?.commonMistakes.map((mistake, index) => (
                          <motion.li
                            key={index}
                            className="text-sm flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className="inline-block w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-full flex-shrink-0 flex items-center justify-center text-xs mr-2">
                              {index + 1}
                            </span>
                            {mistake}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </CardContent>
                  <CardFooter className="p-4 bg-white">
                    <Link to="/questions/matematica" className="w-full">
                      <Button className="w-full matematica-theme">
                        ¡Practicar Matemática!
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="communication" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="magical-card border-orange-200">
                  <CardHeader className="bg-gradient-to-br from-orange-50 to-amber-50">
                    <CardTitle className="text-orange-500 flex items-center">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Comunicación
                    </CardTitle>
                    <CardDescription>Tu progreso en el área de comunicación</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-bold">Progreso general</span>
                        <span className="font-bold text-orange-500">
                          {calculatePercentage(commProgress?.correctAnswers || 0, commProgress?.totalQuestions || 0)}%
                        </span>
                      </div>
                      <ProgressBar
                        value={commProgress?.correctAnswers || 0}
                        max={commProgress?.totalQuestions || 0}
                        type="comunicacion"
                        size="md"
                        animated={true}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        className="border-2 border-orange-200 rounded-xl p-4 bg-orange-50"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <p className="text-sm font-bold text-orange-600">Preguntas respondidas</p>
                        <p className="text-3xl font-bold">{commProgress?.totalQuestions || 0}</p>
                      </motion.div>
                      <motion.div
                        className="border-2 border-orange-200 rounded-xl p-4 bg-orange-50"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <p className="text-sm font-bold text-orange-600">Tiempo promedio</p>
                        <p className="text-3xl font-bold">{commProgress?.averageTime || 0}s</p>
                      </motion.div>
                    </div>

                    <motion.div
                      className="border-2 border-orange-200 rounded-xl p-4 bg-orange-50"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <h4 className="text-sm font-bold text-orange-600 mb-2">Errores comunes</h4>
                      <ul className="space-y-2">
                        {commProgress?.commonMistakes.map((mistake, index) => (
                          <motion.li
                            key={index}
                            className="text-sm flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className="inline-block w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-full flex-shrink-0 flex items-center justify-center text-xs mr-2">
                              {index + 1}
                            </span>
                            {mistake}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </CardContent>
                  <CardFooter className="p-4 bg-white">
                    <Link to="/questions/comunicacion" className="w-full">
                      <Button className="w-full comunicacion-theme">
                        ¡Practicar Comunicación!
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
