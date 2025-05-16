"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockUsers, mockStudentProgress } from "@/src/utils/mockData"
import { BarChart, PieChart, Download, FileText } from "lucide-react"

const ReportsPage = () => {
  const handleExportPDF = () => {
    alert("Exportando a PDF... (Funcionalidad simulada)")
  }

  const handleExportExcel = () => {
    alert("Exportando a Excel... (Funcionalidad simulada)")
  }

  const calculatePercentage = (correct: number, total: number) => {
    return total > 0 ? Math.round((correct / total) * 100) : 0
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Reportes</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportPDF} className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>PDF</span>
          </Button>
          <Button variant="outline" onClick={handleExportExcel} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Excel</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="math">Matemática</TabsTrigger>
          <TabsTrigger value="communication">Comunicación</TabsTrigger>
          <TabsTrigger value="students">Por Alumno</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento General</CardTitle>
                <CardDescription>Porcentaje de aciertos por área</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-40 w-40 mx-auto text-gray-300" />
                  <p className="mt-4 text-muted-foreground">Gráfico de rendimiento general (simulado)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tiempo Promedio</CardTitle>
                <CardDescription>Tiempo promedio por pregunta en segundos</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-40 w-40 mx-auto text-gray-300" />
                  <p className="mt-4 text-muted-foreground">Gráfico de tiempo promedio (simulado)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de Rendimiento</CardTitle>
              <CardDescription>Resumen del rendimiento de todos los alumnos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Área</TableHead>
                      <TableHead>Total Preguntas</TableHead>
                      <TableHead>Aciertos</TableHead>
                      <TableHead>Porcentaje</TableHead>
                      <TableHead>Tiempo Promedio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Matemática</TableCell>
                      <TableCell>
                        {mockStudentProgress
                          .filter((p) => p.questionType === "matematica")
                          .reduce((acc, curr) => acc + curr.totalQuestions, 0)}
                      </TableCell>
                      <TableCell>
                        {mockStudentProgress
                          .filter((p) => p.questionType === "matematica")
                          .reduce((acc, curr) => acc + curr.correctAnswers, 0)}
                      </TableCell>
                      <TableCell>
                        {calculatePercentage(
                          mockStudentProgress
                            .filter((p) => p.questionType === "matematica")
                            .reduce((acc, curr) => acc + curr.correctAnswers, 0),
                          mockStudentProgress
                            .filter((p) => p.questionType === "matematica")
                            .reduce((acc, curr) => acc + curr.totalQuestions, 0),
                        )}
                        %
                      </TableCell>
                      <TableCell>
                        {Math.round(
                          mockStudentProgress
                            .filter((p) => p.questionType === "matematica")
                            .reduce((acc, curr, _, arr) => acc + curr.averageTime / arr.length, 0),
                        )}{" "}
                        seg
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Comunicación</TableCell>
                      <TableCell>
                        {mockStudentProgress
                          .filter((p) => p.questionType === "comunicacion")
                          .reduce((acc, curr) => acc + curr.totalQuestions, 0)}
                      </TableCell>
                      <TableCell>
                        {mockStudentProgress
                          .filter((p) => p.questionType === "comunicacion")
                          .reduce((acc, curr) => acc + curr.correctAnswers, 0)}
                      </TableCell>
                      <TableCell>
                        {calculatePercentage(
                          mockStudentProgress
                            .filter((p) => p.questionType === "comunicacion")
                            .reduce((acc, curr) => acc + curr.correctAnswers, 0),
                          mockStudentProgress
                            .filter((p) => p.questionType === "comunicacion")
                            .reduce((acc, curr) => acc + curr.totalQuestions, 0),
                        )}
                        %
                      </TableCell>
                      <TableCell>
                        {Math.round(
                          mockStudentProgress
                            .filter((p) => p.questionType === "comunicacion")
                            .reduce((acc, curr, _, arr) => acc + curr.averageTime / arr.length, 0),
                        )}{" "}
                        seg
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="math" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reporte de Matemática</CardTitle>
              <CardDescription>Análisis detallado del área de matemática</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Gráficos de análisis de matemática (simulado)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reporte de Comunicación</CardTitle>
              <CardDescription>Análisis detallado del área de comunicación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Gráficos de análisis de comunicación (simulado)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reporte por Alumno</CardTitle>
              <CardDescription>Rendimiento individual de cada alumno</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alumno</TableHead>
                      <TableHead>Matemática</TableHead>
                      <TableHead>Comunicación</TableHead>
                      <TableHead>Promedio General</TableHead>
                      <TableHead>Último Acceso</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers
                      .filter((user) => user.role === "alumno")
                      .map((student) => {
                        const mathProgress = mockStudentProgress.find(
                          (p) => p.userId === student.id && p.questionType === "matematica",
                        )

                        const commProgress = mockStudentProgress.find(
                          (p) => p.userId === student.id && p.questionType === "comunicacion",
                        )

                        const mathPercentage = calculatePercentage(
                          mathProgress?.correctAnswers || 0,
                          mathProgress?.totalQuestions || 0,
                        )

                        const commPercentage = calculatePercentage(
                          commProgress?.correctAnswers || 0,
                          commProgress?.totalQuestions || 0,
                        )

                        const avgPercentage = Math.round((mathPercentage + commPercentage) / 2)

                        const lastActivity = [mathProgress?.lastActivity, commProgress?.lastActivity]
                          .filter(Boolean)
                          .sort((a, b) => (b?.getTime() || 0) - (a?.getTime() || 0))[0]

                        return (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{mathPercentage}%</TableCell>
                            <TableCell>{commPercentage}%</TableCell>
                            <TableCell>{avgPercentage}%</TableCell>
                            <TableCell>{lastActivity ? new Date(lastActivity).toLocaleDateString() : "N/A"}</TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ReportsPage
