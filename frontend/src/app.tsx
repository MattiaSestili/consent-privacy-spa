import React, { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "./components/loginPage"
import { GiveConsentForm } from "./components/giveConsentForm"
import { RequireAuth } from "./requiredAuth"

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/give-consent"
          element={
            <RequireAuth>
              <GiveConsentForm />
            </RequireAuth>
          }
        />
        {/*<Route path="/consents" element={<ConsentsList />} />*/}
      </Routes>
    </BrowserRouter>
  )
}
