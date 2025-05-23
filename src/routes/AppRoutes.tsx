"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "@/src/context/AuthContext"
import MainLayout from "@/src/layouts/MainLayout"
import AuthLayout from "@/src/layouts/AuthLayout"
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"

// Páginas de autenticación
import RoleSelectionPage from "@/src/pages/auth/RoleSelectionPage"
import StudentLoginPage from "@/src/pages/auth/StudentLoginPage"
import AdminLoginPage from "@/src/pages/auth/AdminLoginPage"
import ForgotPasswordPage from "@/src/pages/auth/ForgotPasswordPage"

// Páginas de estudiantes
import Dashboard from "@/src/pages/student/Dashboard"
import QuestionPage from "@/src/pages/student/QuestionPage"
import EvaluationPage from "@/src/pages/student/EvaluationPage"
import ResultsPage from "@/src/pages/student/ResultsPage"

// Páginas de administrador
import AdminDashboard from "@/src/pages/admin/Dashboard"
import StudentsManagement from "@/src/pages/admin/StudentsManagement"
import QuestionsManagement from "@/src/pages/admin/QuestionsManagement"
import ReportsPage from "@/src/pages/admin/ReportsPage"

const AppRoutes = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <h2 className="text-xl font-bold text-purple-600">Cargando...</h2>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Rutas de autenticación */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<RoleSelectionPage />} />
        <Route path="/login/student" element={<StudentLoginPage />} />
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Rutas protegidas para estudiantes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questions/:type" element={<QuestionPage />} />
        <Route path="/evaluation/:id" element={<EvaluationPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/challenges" element={<ResultsPage />} />
      </Route>

      {/* Rutas protegidas para administradores */}
      <Route
        element={
          <AdminRoute>
            <MainLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<StudentsManagement />} />
        <Route path="/admin/questions" element={<QuestionsManagement />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
