// Archivo para manejar variables de entorno
export const env = {
  // API URL base
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",

  // Configuración de autenticación
  AUTH_SECRET: process.env.AUTH_SECRET || "your-auth-secret",

  // Configuración de la aplicación
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Plataforma Educativa",
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",

  // Configuración de servicios externos (ejemplos)
  STORAGE_URL: process.env.NEXT_PUBLIC_STORAGE_URL || "https://storage.example.com",
  ML_API_URL: process.env.ML_API_URL || "https://ml-api.example.com",
}
