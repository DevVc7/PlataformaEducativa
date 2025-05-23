"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Importamos el componente App de forma dinámica con SSR deshabilitado
const App = dynamic(() => import("@/src/App"), { ssr: false })

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mostramos un loader mientras se carga el componente en el cliente
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-blue-100">
        <div className="text-center">
          <div className="inline-block animate-bounce bg-purple-500 p-2 rounded-full mb-4">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-purple-700">Cargando aventura...</h2>
          <p className="text-purple-600 mt-2">¡Prepárate para aprender jugando!</p>
        </div>
      </div>
    )
  }

  return <App />
}
