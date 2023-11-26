import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./auth"

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()
  const auth = useAuth()

  if (!auth.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}
