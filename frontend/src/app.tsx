import React, { FC } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "./components/loginPage"
import { GiveConsentForm } from "./components/giveConsentForm"
import { RequireAuth } from "../Providers/requiredAuth"
import { AuthProvider } from "../Providers/auth"
import { Layout } from "./components/layout"
import { ConsentProvider } from "../Providers/userConsentsProvider"
import { CollectedConsents } from "./components/collectedConsents"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

export const App: FC = () => {
  return (
    <AuthProvider>
      <ConsentProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/main" element={<Layout />}>
              <Route
                path="/main/give-consent"
                element={
                  <RequireAuth>
                    <GiveConsentForm />
                  </RequireAuth>
                }
              />
              <Route path="/main/consents" element={<CollectedConsents />} />
            </Route>
          </Routes>
        </HashRouter>
        <ToastContainer theme={"colored"} autoClose={2000} />
      </ConsentProvider>
    </AuthProvider>
  )
}
