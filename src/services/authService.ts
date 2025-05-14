import type { User } from "../types";
import { mockUsers } from "../utils/mockData";

// Simulación de servicios de autenticación

export const loginService = async (username: string, password: string): Promise<{ user: User; token: string }> => {
  // Simulamos una llamada a API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.username === username)

      if (user && password === "password") {
        // En un entorno real, nunca verificaríamos así
        resolve({
          user,
          token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
        })
      } else {
        reject(new Error("Credenciales incorrectas"))
      }
    }, 800)
  })
}

export const logoutService = async (): Promise<void> => {
  // Simulamos una llamada a API para logout
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

export const getUserService = async (): Promise<User> => {
  // Simulamos obtener el usuario actual basado en el token
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // En un entorno real, decodificaríamos el token o haríamos una llamada a la API
      // Aquí simplemente devolvemos un usuario de prueba
      const randomIndex = Math.floor(Math.random() * mockUsers.length)
      resolve(mockUsers[randomIndex])
    }, 500)
  })
}
