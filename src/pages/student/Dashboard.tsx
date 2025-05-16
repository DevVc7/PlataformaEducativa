"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/src/context/AuthContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockStudentProgress, mockEvaluations } from "@/src/utils/mockData"
import type { StudentProgress } from "@/src/types"
import { Calculator, BookOpen, Award, ArrowRight } from "lucide-react"

const Dashboard = () => {
  const { user } = useAuth()
  const [progress, setProgress] = useState<StudentProgress[]>([])

  useEffect(() => {
    if (user) {
      // Simulamos la obtención de datos del servidor
      const userProgress = mockStudentProgress.filter((p) => p.userId === user.id)
      setProgress(userProgress)
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Bienvenido, {user?.name}</h1>
        <p className="text-sm text-gray-500">Último acceso: {new Date().toLocaleDateString()}</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="math">Matemática</TabsTrigger>
          <TabsTrigger value="communication">Comunicación</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progreso General</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {calculatePercentage(
                    (mathProgress?.correctAnswers || 0) + (commProgress?.correctAnswers || 0),
                    (mathProgress?.totalQuestions || 0) + (commProgress?.totalQuestions || 0),
                  )}
                  %
                </div>
                <Progress
                  value={calculatePercentage(
                    (mathProgress?.correctAnswers || 0) + (commProgress?.correctAnswers || 0),
                    (mathProgress?.totalQuestions || 0) + (commProgress?.totalQuestions || 0),
                  )}
                  className="h-2 mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">Progreso total en todas las áreas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Matemática</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {calculatePercentage(mathProgress?.correctAnswers || 0, mathProgress?.totalQuestions || 0)}%
                </div>
                <Progress
                  value={calculatePercentage(mathProgress?.correctAnswers || 0, mathProgress?.totalQuestions || 0)}
                  className="h-2 mt-2 bg-[#E8F5E9]"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {mathProgress?.correctAnswers || 0} de {mathProgress?.totalQuestions || 0} preguntas correctas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comunicación</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {calculatePercentage(commProgress?.correctAnswers || 0, commProgress?.totalQuestions || 0)}%
                </div>
                <Progress
                  value={calculatePercentage(commProgress?.correctAnswers || 0, commProgress?.totalQuestions || 0)}
                  className="h-2 mt-2 bg-[#FFF3E0]"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {commProgress?.correctAnswers || 0} de {commProgress?.totalQuestions || 0} preguntas correctas
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evaluaciones Pendientes</CardTitle>
                <CardDescription>Evaluaciones disponibles para realizar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">{evaluation.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {evaluation.type === "matematica" ? "Matemática" : "Comunicación"} - {evaluation.timeLimit} min
                      </p>
                    </div>
                    <Link to={`/evaluation/${evaluation.id}`}>
                      <Button variant="outline" size="sm">
                        Iniciar
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones</CardTitle>
                <CardDescription>Basado en tu desempeño reciente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mathProgress?.recommendations.map((rec, index) => (
                  <div key={`math-${index}`} className="p-2 border rounded-md bg-[#E8F5E9] border-[#C8E6C9]">
                    <p className="text-sm font-medium">Matemática:</p>
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}

                {commProgress?.recommendations.map((rec, index) => (
                  <div key={`comm-${index}`} className="p-2 border rounded-md bg-[#FFF3E0] border-[#FFECB3]">
                    <p className="text-sm font-medium">Comunicación:</p>
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="math" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Matemática</CardTitle>
              <CardDescription>Tu progreso en el área de matemática</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso general</span>
                  <span className="font-medium">
                    {calculatePercentage(mathProgress?.correctAnswers || 0, mathProgress?.totalQuestions || 0)}%
                  </span>
                </div>
                <Progress
                  value={calculatePercentage(mathProgress?.correctAnswers || 0, mathProgress?.totalQuestions || 0)}
                  className="h-2 bg-[#E8F5E9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <p className="text-sm text-muted-foreground">Preguntas respondidas</p>
                  <p className="text-2xl font-bold">{mathProgress?.totalQuestions || 0}</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="text-sm text-muted-foreground">Tiempo promedio</p>
                  <p className="text-2xl font-bold">{mathProgress?.averageTime || 0}s</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Errores comunes</h4>
                <ul className="space-y-1">
                  {mathProgress?.commonMistakes.map((mistake, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/questions/matematica" className="w-full">
                <Button className="w-full matematica-bg">
                  Practicar Matemática
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comunicación</CardTitle>
              <CardDescription>Tu progreso en el área de comunicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso general</span>
                  <span className="font-medium">
                    {calculatePercentage(commProgress?.correctAnswers || 0, commProgress?.totalQuestions || 0)}%
                  </span>
                </div>
                <Progress
                  value={calculatePercentage(commProgress?.correctAnswers || 0, commProgress?.totalQuestions || 0)}
                  className="h-2 bg-[#FFF3E0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <p className="text-sm text-muted-foreground">Preguntas respondidas</p>
                  <p className="text-2xl font-bold">{commProgress?.totalQuestions || 0}</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="text-sm text-muted-foreground">Tiempo promedio</p>
                  <p className="text-2xl font-bold">{commProgress?.averageTime || 0}s</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Errores comunes</h4>
                <ul className="space-y-1">
                  {commProgress?.commonMistakes.map((mistake, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/questions/comunicacion" className="w-full">
                <Button className="w-full comunicacion-bg">
                  Practicar Comunicación
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard
