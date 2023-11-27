import React, { FC, PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "./auth"

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth()

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}
