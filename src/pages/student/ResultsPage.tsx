"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockStudentProgress } from "@/utils/mockData"
import type { StudentProgress } from "@/types"
import { BarChart, PieChart, Download, FileText } from "lucide-react"

const ResultsPage = () => {
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

  const handleExportPDF = () => {
    alert("Exportando a PDF... (Funcionalidad simulada)")
  }

  const handleExportExcel = () => {
    alert("Exportando a Excel... (Funcionalidad simulada)")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Resultados y Evaluaciones</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportPDF} className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>PDF</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportExcel} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Excel</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Resumen</TabsTrigger>
          <TabsTrigger value="math">Matemática</TabsTrigger>
          <TabsTrigger value="communication">Comunicación</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Rendimiento General</CardTitle>
                <CardDescription>Porcentaje de aciertos por área</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-40 w-40 mx-auto text-gray-300" />
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#4CAF50] mr-2"></div>
                      <span className="text-sm">
                        Matemática:{" "}
                        {calculatePercentage(mathProgress?.correctAnswers || 0, mathProgress?.totalQuestions || 0)}%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#FF9800] mr-2"></div>
                      <span className="text-sm">
                        Comunicación:{" "}
                        {calculatePercentage(commProgress?.correctAnswers || 0, commProgress?.totalQuestions || 0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tiempo Promedio</CardTitle>
                <CardDescription>Segundos por pregunta</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-40 w-40 mx-auto text-gray-300" />
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#4CAF50] mr-2"></div>
                      <span className="text-sm">Matemática: {mathProgress?.averageTime || 0}s</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#FF9800] mr-2"></div>
                      <span className="text-sm">Comunicación: {commProgress?.averageTime || 0}s</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones Generales</CardTitle>
              <CardDescription>Basado en tu desempeño</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mathProgress?.recommendations.map((rec, index) => (
                  <div key={`math-${index}`} className="p-3 border rounded-md bg-[#E8F5E9] border-[#C8E6C9]">
                    <p className="font-medium">Matemática:</p>
                    <p>{rec}</p>
                  </div>
                ))}

                {commProgress?.recommendations.map((rec, index) => (
                  <div key={`comm-${index}`} className="p-3 border rounded-md bg-[#FFF3E0] border-[#FFECB3]">
                    <p className="font-medium">Comunicación:</p>
                    <p>{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="math" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalle de Matemática</CardTitle>
              <CardDescription>Resultados detallados del área de matemática</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Estadísticas</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Total de preguntas:</span>
                      <span className="font-medium">{mathProgress?.totalQuestions || 0}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Respuestas correctas:</span>
                      <span className="font-medium">{mathProgress?.correctAnswers || 0}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Porcentaje de aciertos:</span>
                      <span className="font-medium">
                        {calculatePercentage(mathProgress?.correctAnswers || 0, mathProgress?.totalQuestions || 0)}%
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Tiempo promedio:</span>
                      <span className="font-medium">{mathProgress?.averageTime || 0} segundos</span>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Errores comunes</h3>
                  <ul className="space-y-1">
                    {mathProgress?.commonMistakes.map((mistake, index) => (
                      <li key={index} className="text-muted-foreground">
                        • {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/questions/matematica" className="w-full">
                <Button className="w-full matematica-bg">Practicar Matemática</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalle de Comunicación</CardTitle>
              <CardDescription>Resultados detallados del área de comunicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Estadísticas</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Total de preguntas:</span>
                      <span className="font-medium">{commProgress?.totalQuestions || 0}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Respuestas correctas:</span>
                      <span className="font-medium">{commProgress?.correctAnswers || 0}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Porcentaje de aciertos:</span>
                      <span className="font-medium">
                        {calculatePercentage(commProgress?.correctAnswers || 0, commProgress?.totalQuestions || 0)}%
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Tiempo promedio:</span>
                      <span className="font-medium">{commProgress?.averageTime || 0} segundos</span>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Errores comunes</h3>
                  <ul className="space-y-1">
                    {commProgress?.commonMistakes.map((mistake, index) => (
                      <li key={index} className="text-muted-foreground">
                        • {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/questions/comunicacion" className="w-full">
                <Button className="w-full comunicacion-bg">Practicar Comunicación</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ResultsPage
