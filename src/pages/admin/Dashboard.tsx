"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { mockUsers, mockQuestions, mockStudentProgress } from "@/src/utils/mockData"
import {
  BarChart3,
  PieChart,
  Users,
  FileText,
  TrendingUp,
  AlertTriangle,
  Download,
  RefreshCw,
  Clock,
  Target,
  Brain,
} from "lucide-react"

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedTab, setSelectedTab] = useState("overview")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Estadísticas
  const totalStudents = mockUsers.filter((user) => user.role === "alumno").length
  const totalQuestions = mockQuestions.length
  const mathQuestions = mockQuestions.filter((q) => q.type === "matematica").length
  const commQuestions = mockQuestions.filter((q) => q.type === "comunicacion").length

  const calculateAveragePerformance = (type: "matematica" | "comunicacion") => {
    const progressByType = mockStudentProgress.filter((p) => p.questionType === type)
    if (progressByType.length === 0) return 0
    const totalPercentage = progressByType.reduce((acc, curr) => {
      return acc + (curr.correctAnswers / curr.totalQuestions) * 100
    }, 0)
    return Math.round(totalPercentage / progressByType.length)
  }

  const mathAvg = calculateAveragePerformance("matematica")
  const commAvg = calculateAveragePerformance("comunicacion")

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setRefreshing(false)
  }

  const FloatingIcon = ({ children, className = "", delay = 0 }: any) => (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, 0],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )

  const StatCard = ({ title, value, description, icon: Icon, color, trend }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`relative overflow-hidden border-2 ${color} shadow-lg hover:shadow-xl transition-all`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 hover:opacity-100 transition-opacity" />

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
          <CardTitle className="text-sm font-bold text-gray-700">{title}</CardTitle>
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <Icon className="h-6 w-6 text-gray-600" />
          </motion.div>
        </CardHeader>

        <CardContent className="relative">
          <motion.div
            className="text-3xl font-black text-gray-800"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {value}
          </motion.div>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
          {trend && (
            <motion.div
              className="flex items-center mt-2 text-green-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">{trend}</span>
            </motion.div>
          )}
        </CardContent>

        {/* Efectos decorativos */}
        <FloatingIcon className="top-2 right-2 text-lg opacity-20" delay={0}>
          ⭐
        </FloatingIcon>
      </Card>
    </motion.div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="text-6xl mb-4"
          >
            📊
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800">Cargando panel de administración...</h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingIcon className="top-20 right-40 text-4xl text-blue-300" delay={0}>
          📈
        </FloatingIcon>
        <FloatingIcon className="bottom-32 left-32 text-3xl text-purple-300" delay={1}>
          👥
        </FloatingIcon>
        <FloatingIcon className="top-1/3 right-1/4 text-2xl text-pink-300" delay={2}>
          🏆
        </FloatingIcon>
        <FloatingIcon className="bottom-1/4 right-1/3 text-3xl text-yellow-300" delay={0.5}>
          ⚡
        </FloatingIcon>
      </div>

      <div className="relative z-10 space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-4xl shadow-xl mx-auto">
              👨‍💼
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-black text-gray-800 mb-4"
            animate={{
              textShadow: ["0 0 20px rgba(0,0,0,0.1)", "0 0 30px rgba(0,0,0,0.2)", "0 0 20px rgba(0,0,0,0.1)"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Panel de Administración
            <motion.span
              className="inline-block ml-3"
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              👑
            </motion.span>
          </motion.h1>

          <p className="text-xl text-gray-600 font-medium">
            Bienvenido al centro de control de la plataforma educativa
          </p>

          {/* Botón de actualizar */}
          <motion.div className="mt-6">
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
            >
              <motion.div
                animate={refreshing ? { rotate: 360 } : {}}
                transition={refreshing ? { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : {}}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
              </motion.div>
              {refreshing ? "Actualizando..." : "Actualizar Datos"}
            </Button>
          </motion.div>
        </motion.div>

        {/* Tarjetas de estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard
            title="Total de Alumnos"
            value={totalStudents}
            description="Estudiantes registrados activos"
            icon={Users}
            color="border-green-200 bg-green-50"
            trend="+12% este mes"
          />
          <StatCard
            title="Total de Preguntas"
            value={totalQuestions}
            description="Preguntas disponibles en el sistema"
            icon={FileText}
            color="border-blue-200 bg-blue-50"
            trend="+8 nuevas esta semana"
          />
          <StatCard
            title="Rendimiento Matemática"
            value={`${mathAvg}%`}
            description="Promedio de aciertos en matemática"
            icon={Target}
            color="border-purple-200 bg-purple-50"
            trend="+5% vs mes anterior"
          />
          <StatCard
            title="Rendimiento Comunicación"
            value={`${commAvg}%`}
            description="Promedio de aciertos en comunicación"
            icon={Brain}
            color="border-orange-200 bg-orange-50"
            trend="+3% vs mes anterior"
          />
        </motion.div>

        {/* Tabs principales */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
              <TabsTrigger
                value="overview"
                className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                📊 Resumen
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                📈 Análisis
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
              >
                📄 Reportes
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    {/* Gráfico de rendimiento */}
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card className="col-span-4 border-2 border-blue-200 bg-white/80 backdrop-blur-sm shadow-xl">
                        <CardHeader>
                          <CardTitle className="flex items-center text-xl font-black text-gray-800">
                            <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                            Rendimiento por Área
                          </CardTitle>
                          <CardDescription>Comparativa entre matemática y comunicación</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-64 flex items-center justify-center relative">
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg opacity-50"
                              animate={{ opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                            />
                            <div className="relative z-10 text-center">
                              <div className="text-6xl mb-4">📊</div>
                              <p className="text-gray-600 font-medium">Gráfico interactivo de rendimiento</p>
                              <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="bg-green-100 rounded-lg p-3">
                                  <div className="text-2xl font-bold text-green-700">{mathAvg}%</div>
                                  <p className="text-sm text-green-600">Matemática</p>
                                </div>
                                <div className="bg-orange-100 rounded-lg p-3">
                                  <div className="text-2xl font-bold text-orange-700">{commAvg}%</div>
                                  <p className="text-sm text-orange-600">Comunicación</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Distribución de preguntas */}
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card className="col-span-3 border-2 border-purple-200 bg-white/80 backdrop-blur-sm shadow-xl">
                        <CardHeader>
                          <CardTitle className="flex items-center text-xl font-black text-gray-800">
                            <PieChart className="w-6 h-6 mr-2 text-purple-600" />
                            Distribución de Preguntas
                          </CardTitle>
                          <CardDescription>Cantidad por área de estudio</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                          <motion.div
                            className="text-8xl mb-4"
                            animate={{ rotate: [0, 5, 0, -5, 0] }}
                            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                          >
                            🍰
                          </motion.div>
                          <div className="grid grid-cols-2 gap-4 w-full">
                            <motion.div
                              className="flex items-center bg-green-100 rounded-lg p-3"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="w-4 h-4 rounded-full bg-green-500 mr-2" />
                              <div>
                                <p className="font-bold text-green-700">{mathQuestions}</p>
                                <p className="text-xs text-green-600">Matemática</p>
                              </div>
                            </motion.div>
                            <motion.div
                              className="flex items-center bg-orange-100 rounded-lg p-3"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="w-4 h-4 rounded-full bg-orange-500 mr-2" />
                              <div>
                                <p className="font-bold text-orange-700">{commQuestions}</p>
                                <p className="text-xs text-orange-600">Comunicación</p>
                              </div>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Actividad reciente y errores comunes */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <motion.div
                      className="col-span-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="border-2 border-green-200 bg-white/80 backdrop-blur-sm shadow-xl">
                        <CardHeader>
                          <CardTitle className="flex items-center text-xl font-black text-gray-800">
                            <Clock className="w-6 h-6 mr-2 text-green-600" />
                            Actividad Reciente
                          </CardTitle>
                          <CardDescription>Últimas actividades en la plataforma</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {mockStudentProgress.slice(0, 5).map((progress, index) => {
                              const user = mockUsers.find((u) => u.id === progress.userId)
                              return (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                  <motion.div
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                  >
                                    {user?.name.charAt(0)}
                                  </motion.div>
                                  <div className="flex-1">
                                    <p className="font-bold text-gray-800">{user?.name}</p>
                                    <p className="text-sm text-gray-600">
                                      ✅ Completó {progress.totalQuestions} preguntas de{" "}
                                      {progress.questionType === "matematica" ? "📊 matemática" : "📚 comunicación"} con{" "}
                                      {progress.correctAnswers} aciertos
                                    </p>
                                  </div>
                                  <div className="text-xs text-gray-500 font-medium">
                                    {new Date(progress.lastActivity).toLocaleDateString()}
                                  </div>
                                </motion.div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card className="border-2 border-yellow-200 bg-white/80 backdrop-blur-sm shadow-xl">
                        <CardHeader>
                          <CardTitle className="flex items-center text-xl font-black text-gray-800">
                            <AlertTriangle className="w-6 h-6 mr-2 text-yellow-600" />
                            Errores Comunes
                          </CardTitle>
                          <CardDescription>Áreas que necesitan atención</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <motion.div
                              className="border rounded-xl p-4 bg-green-50 border-green-200"
                              whileHover={{ scale: 1.02 }}
                            >
                              <p className="font-bold text-green-700 flex items-center mb-2">📊 Matemática:</p>
                              <ul className="space-y-1">
                                {Array.from(
                                  new Set(
                                    mockStudentProgress
                                      .filter((p) => p.questionType === "matematica")
                                      .flatMap((p) => p.commonMistakes),
                                  ),
                                )
                                  .slice(0, 3)
                                  .map((mistake, index) => (
                                    <motion.li
                                      key={index}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="text-sm text-green-700 flex items-center"
                                    >
                                      <span className="mr-2">•</span>
                                      {mistake}
                                    </motion.li>
                                  ))}
                              </ul>
                            </motion.div>

                            <motion.div
                              className="border rounded-xl p-4 bg-orange-50 border-orange-200"
                              whileHover={{ scale: 1.02 }}
                            >
                              <p className="font-bold text-orange-700 flex items-center mb-2">📚 Comunicación:</p>
                              <ul className="space-y-1">
                                {Array.from(
                                  new Set(
                                    mockStudentProgress
                                      .filter((p) => p.questionType === "comunicacion")
                                      .flatMap((p) => p.commonMistakes),
                                  ),
                                )
                                  .slice(0, 3)
                                  .map((mistake, index) => (
                                    <motion.li
                                      key={index}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="text-sm text-orange-700 flex items-center"
                                    >
                                      <span className="mr-2">•</span>
                                      {mistake}
                                    </motion.li>
                                  ))}
                              </ul>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="border-2 border-purple-200 bg-white/80 backdrop-blur-sm shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center text-2xl font-black text-gray-800">
                          <BarChart3 className="w-8 h-8 mr-3 text-purple-600" />
                          Análisis Avanzado de Rendimiento
                        </CardTitle>
                        <CardDescription>Métricas detalladas y tendencias de aprendizaje</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-96 flex items-center justify-center relative">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg opacity-50"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <div className="relative z-10 text-center">
                            <motion.div
                              className="text-8xl mb-6"
                              animate={{
                                rotate: [0, 10, 0, -10, 0],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                            >
                              📈
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Análisis Predictivo Habilitado</h3>
                            <p className="text-gray-600 mb-6">
                              Gráficos interactivos con tendencias de aprendizaje y predicciones de rendimiento
                            </p>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-purple-100 rounded-lg p-4">
                                <div className="text-2xl font-bold text-purple-700">+15%</div>
                                <p className="text-sm text-purple-600">Mejora promedio</p>
                              </div>
                              <div className="bg-blue-100 rounded-lg p-4">
                                <div className="text-2xl font-bold text-blue-700">87%</div>
                                <p className="text-sm text-blue-600">Satisfacción</p>
                              </div>
                              <div className="bg-green-100 rounded-lg p-4">
                                <div className="text-2xl font-bold text-green-700">92%</div>
                                <p className="text-sm text-green-600">Participación</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="reports" className="space-y-6">
                  <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="border-2 border-green-200 bg-white/80 backdrop-blur-sm shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center text-2xl font-black text-gray-800">
                          <FileText className="w-8 h-8 mr-3 text-green-600" />
                          Centro de Reportes
                        </CardTitle>
                        <CardDescription>Descarga reportes detallados del rendimiento académico</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {[
                            {
                              title: "Reporte General de Rendimiento",
                              description: "Análisis completo del rendimiento estudiantil por área",
                              type: "general",
                              icon: "📊",
                              color: "from-blue-500 to-purple-600",
                            },
                            {
                              title: "Reporte de Matemática",
                              description: "Métricas específicas del área de matemática",
                              type: "matematica",
                              icon: "🔢",
                              color: "from-green-500 to-blue-600",
                            },
                            {
                              title: "Reporte de Comunicación",
                              description: "Análisis detallado del área de comunicación",
                              type: "comunicacion",
                              icon: "📚",
                              color: "from-orange-500 to-red-600",
                            },
                            {
                              title: "Reporte de Progreso Individual",
                              description: "Seguimiento personalizado por estudiante",
                              type: "individual",
                              icon: "👤",
                              color: "from-purple-500 to-pink-600",
                            },
                          ].map((report, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-all bg-white/50 backdrop-blur-sm"
                              whileHover={{ scale: 1.02, y: -2 }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <motion.div
                                    className="text-4xl"
                                    animate={{
                                      rotate: [0, 10, 0, -10, 0],
                                    }}
                                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                                  >
                                    {report.icon}
                                  </motion.div>
                                  <div>
                                    <h3 className="text-lg font-bold text-gray-800">{report.title}</h3>
                                    <p className="text-sm text-gray-600">{report.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Generado el {new Date().toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button
                                    className={`bg-gradient-to-r ${report.color} hover:shadow-lg transition-all shadow-md`}
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Descargar
                                  </Button>
                                </motion.div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
