"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "@/src/context/AuthContext"
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"

// Layouts
import MainLayout from "../layouts/MainLayout"
import AuthLayout from "../layouts/AuthLayout"

// Páginas públicas
import LoginPage from "../pages/auth/LoginPage"
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage"

// Páginas de alumno
import StudentDashboard from "../pages/student/Dashboard"
import QuestionPage from "../pages/student/QuestionPage"
import EvaluationPage from "../pages/student/EvaluationPage"
import ResultsPage from "../pages/student/ResultsPage"

// Páginas de administrador
import AdminDashboard from "../pages/admin/Dashboard"
import StudentsManagement from "../pages/admin/StudentsManagement"
import QuestionsManagement from "../pages/admin/QuestionsManagement"
import ReportsPage from "../pages/admin/ReportsPage"

const AppRoutes = () => {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Rutas de alumno */}
          <Route
            path="/dashboard"
            element={user?.role === "administrador" ? <Navigate to="/admin/dashboard" /> : <StudentDashboard />}
          />
          <Route path="/questions/:type" element={<QuestionPage />} />
          <Route path="/evaluation/:id" element={<EvaluationPage />} />
          <Route path="/results" element={<ResultsPage />} />

          {/* Rutas de administrador */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<StudentsManagement />} />
            <Route path="/admin/questions" element={<QuestionsManagement />} />
            <Route path="/admin/reports" element={<ReportsPage />} />
          </Route>
        </Route>
      </Route>

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  )
}

export default AppRoutes
