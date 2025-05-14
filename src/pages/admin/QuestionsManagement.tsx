"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockMathQuestions, mockCommunicationQuestions } from "@/src/utils/mockData"
import type { Question, DifficultyLevel, ContentType } from "@/src/types"
import { Search, Plus, MoreHorizontal, Edit, Trash, FileText } from "lucide-react"

const QuestionsManagement = () => {
  const [mathQuestions, setMathQuestions] = useState<Question[]>(mockMathQuestions)
  const [commQuestions, setCommQuestions] = useState<Question[]>(mockCommunicationQuestions)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredMathQuestions = mathQuestions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCommQuestions = commQuestions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteQuestion = (id: string, type: "matematica" | "comunicacion") => {
    if (type === "matematica") {
      setMathQuestions(mathQuestions.filter((q) => q.id !== id))
    } else {
      setCommQuestions(commQuestions.filter((q) => q.id !== id))
    }
  }

  const getDifficultyLabel = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case "easy":
        return "Fácil"
      case "medium":
        return "Media"
      case "hard":
        return "Difícil"
      default:
        return difficulty
    }
  }

  const getContentTypeLabel = (contentType: ContentType) => {
    switch (contentType) {
      case "text":
        return "Texto"
      case "image":
        return "Imagen"
      case "video":
        return "Video"
      case "audio":
        return "Audio"
      case "equation":
        return "Ecuación"
      default:
        return contentType
    }
  }

  const renderQuestionTable = (questions: Question[], type: "matematica" | "comunicacion") => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Dificultad</TableHead>
            <TableHead>Tipo de Contenido</TableHead>
            <TableHead>Puntos</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.length > 0 ? (
            questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="font-medium">{question.title}</TableCell>
                <TableCell>{getDifficultyLabel(question.difficulty)}</TableCell>
                <TableCell>{getContentTypeLabel(question.contentType)}</TableCell>
                <TableCell>{question.points}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Ver detalles</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteQuestion(question.id, type)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No se encontraron preguntas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Gestión de Preguntas</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <FileText className="mr-2 h-4 w-4" />
              Nueva Pregunta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Pregunta</DialogTitle>
              <DialogDescription>Ingresa los datos para crear una nueva pregunta.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center text-muted-foreground">Formulario de creación de preguntas (simulado)</p>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button className="btn-primary">Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banco de Preguntas</CardTitle>
          <CardDescription>Administra las preguntas disponibles en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar pregunta..." className="pl-8" value={searchTerm} onChange={handleSearch} />
            </div>
            <Button variant="outline" className="ml-2">
              <Plus className="mr-2 h-4 w-4" />
              Importar
            </Button>
          </div>

          <Tabs defaultValue="math" className="space-y-4">
            <TabsList>
              <TabsTrigger value="math">Matemática</TabsTrigger>
              <TabsTrigger value="communication">Comunicación</TabsTrigger>
            </TabsList>

            <TabsContent value="math">{renderQuestionTable(filteredMathQuestions, "matematica")}</TabsContent>

            <TabsContent value="communication">
              {renderQuestionTable(filteredCommQuestions, "comunicacion")}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuestionsManagement
