import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockUsers, mockQuestions, mockStudentProgress } from "@/src/utils/mockData"
import { BarChart, PieChart, Users, FileText } from "lucide-react"

const AdminDashboard = () => {
  // Estadísticas generales
  const totalStudents = mockUsers.filter((user) => user.role === "alumno").length
  const totalQuestions = mockQuestions.length
  const mathQuestions = mockQuestions.filter((q) => q.type === "matematica").length
  const commQuestions = mockQuestions.filter((q) => q.type === "comunicacion").length

  // Promedio de rendimiento
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Panel de Administrador</h1>
        <p className="text-muted-foreground">Bienvenido al panel de administración de la plataforma educativa.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alumnos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Alumnos registrados en la plataforma</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Preguntas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuestions}</div>
            <p className="text-xs text-muted-foreground">Preguntas disponibles en el sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendimiento Matemática</CardTitle>
            <div className="h-4 w-4 rounded-full bg-[#4CAF50]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mathAvg}%</div>
            <p className="text-xs text-muted-foreground">Promedio de aciertos en matemática</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendimiento Comunicación</CardTitle>
            <div className="h-4 w-4 rounded-full bg-[#FF9800]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commAvg}%</div>
            <p className="text-xs text-muted-foreground">Promedio de aciertos en comunicación</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Rendimiento por Área</CardTitle>
                <CardDescription>Comparativa de rendimiento entre matemática y comunicación</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] flex items-center justify-center">
                  <BarChart className="h-full w-full text-gray-300" />
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribución de Preguntas</CardTitle>
                <CardDescription>Cantidad de preguntas por área</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-40 w-40 mx-auto text-gray-300" />
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#4CAF50] mr-2"></div>
                      <span className="text-sm">Matemática: {mathQuestions}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#FF9800] mr-2"></div>
                      <span className="text-sm">Comunicación: {commQuestions}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas actividades en la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStudentProgress.slice(0, 5).map((progress, index) => {
                    const user = mockUsers.find((u) => u.id === progress.userId)
                    return (
                      <div key={index} className="flex items-center border-b pb-2">
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          {user?.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Completó {progress.totalQuestions} preguntas de{" "}
                            {progress.questionType === "matematica" ? "matemática" : "comunicación"} con{" "}
                            {progress.correctAnswers} aciertos
                          </p>
                        </div>
                        <div className="ml-auto text-sm text-muted-foreground">
                          {new Date(progress.lastActivity).toLocaleDateString()}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Errores Comunes</CardTitle>
                <CardDescription>Errores más frecuentes entre los alumnos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-3 bg-[#E8F5E9] border-[#C8E6C9]">
                    <p className="font-medium">Matemática:</p>
                    <ul className="mt-1 space-y-1">
                      {Array.from(
                        new Set(
                          mockStudentProgress
                            .filter((p) => p.questionType === "matematica")
                            .flatMap((p) => p.commonMistakes),
                        ),
                      )
                        .slice(0, 3)
                        .map((mistake, index) => (
                          <li key={index} className="text-sm">
                            • {mistake}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="border rounded-md p-3 bg-[#FFF3E0] border-[#FFECB3]">
                    <p className="font-medium">Comunicación:</p>
                    <ul className="mt-1 space-y-1">
                      {Array.from(
                        new Set(
                          mockStudentProgress
                            .filter((p) => p.questionType === "comunicacion")
                            .flatMap((p) => p.commonMistakes),
                        ),
                      )
                        .slice(0, 3)
                        .map((mistake, index) => (
                          <li key={index} className="text-sm">
                            • {mistake}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Rendimiento</CardTitle>
              <CardDescription>Análisis detallado del rendimiento de los alumnos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Gráficos de análisis detallado (simulado)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes Generados</CardTitle>
              <CardDescription>Reportes disponibles para descargar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Reporte de Rendimiento General</p>
                    <p className="text-sm text-muted-foreground">Generado el {new Date().toLocaleDateString()}</p>
                  </div>
                  <button className="text-blue-600 hover:underline">Descargar</button>
                </div>

                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Reporte de Matemática</p>
                    <p className="text-sm text-muted-foreground">Generado el {new Date().toLocaleDateString()}</p>
                  </div>
                  <button className="text-blue-600 hover:underline">Descargar</button>
                </div>

                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Reporte de Comunicación</p>
                    <p className="text-sm text-muted-foreground">Generado el {new Date().toLocaleDateString()}</p>
                  </div>
                  <button className="text-blue-600 hover:underline">Descargar</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminDashboard
