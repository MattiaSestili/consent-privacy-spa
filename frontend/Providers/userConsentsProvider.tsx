import React, { createContext, FC, PropsWithChildren, useContext } from "react"

export enum SubjectConsent {
  newsletter = "Receive newsletter",
  targeted_ads = "Be shown targeted ads",
  anonymous_statistics = "Contribute to anonymous visit statistics"
}

export interface ConsentForm {
  name: string
  email: string
  consents: string[]
}

interface ConsentProvider {
  consent: ConsentForm[]
  saveConsent: (consent: ConsentForm) => Promise<void>
  getConsents: () => Promise<ConsentForm[]>
}

const collectedConsents: ConsentProvider = {
  consent: [
    {
      name: "Bojack Horseman",
      email: "bojack@horseman.com",
      consents: ["Receive newsletter", "Be shown targeted ads"]
    },
    {
      name: "Princess Carolyn",
      email: "princess@manager.com",
      consents: ["Receive newsletter"]
    }
  ],
  async saveConsent(consent: ConsentForm) {
    await new Promise((r) => setTimeout(r, 500)) // fake delay
    collectedConsents.consent.push(consent)
  },
  async getConsents() {
    await new Promise((r) => setTimeout(r, 500)) // fake delay
    return collectedConsents.consent
  }
}

const ConsentContext = createContext<ConsentProvider>(collectedConsents)

export const useConsent = () => useContext(ConsentContext)

export const ConsentProvider: FC<PropsWithChildren> = (props) => {
  return <ConsentContext.Provider value={collectedConsents}>{props.children}</ConsentContext.Provider>
}
