import React, { createContext, FC, PropsWithChildren, useContext } from "react"

interface AuthProvider {
  isAuthenticated: boolean
  username: string
  signIn: (username: string) => Promise<void>
  signOut: () => Promise<void>
}

const authProvider = {
  isAuthenticated: false,
  username: "",
  async signIn(username: string) {
    await new Promise((r) => setTimeout(r, 500)) // fake delay
    authProvider.isAuthenticated = true
    authProvider.username = username
  },
  async signOut() {
    await new Promise((r) => setTimeout(r, 500)) // fake delay
    authProvider.isAuthenticated = false
    authProvider.username = ""
  }
}

const AuthContext = createContext<AuthProvider>(authProvider)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC<PropsWithChildren> = (props) => {
  return <AuthContext.Provider value={authProvider}>{props.children}</AuthContext.Provider>
}
