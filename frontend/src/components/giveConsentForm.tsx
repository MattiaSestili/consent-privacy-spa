import React, { useState } from "react"
import { FC } from "react"
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, TextField } from "@mui/material"
import { ConsentForm, SubjectConsent, useConsent } from "../../Providers/userConsentsProvider"
import { toast } from "react-toastify"

export const GiveConsentForm: FC = () => {
  const [consent, setConsent] = useState<ConsentForm>({
    name: "",
    email: "",
    consents: []
  })

  const consentContext = useConsent()

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConsent({
      ...consent,
      [event.target.name]: event.target.value
    })
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setConsent({
        ...consent,
        consents: [...consent.consents, event.target.value]
      })
    } else {
      setConsent({
        ...consent,
        consents: consent.consents.filter((consent) => consent !== event.target.value)
      })
    }
  }

  const saveUserConsent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await toast.promise(consentContext.saveConsent(consent), {
      pending: "Saving consent...",
      success: "Consent saved!",
      error: "Could not save consent"
    })

    setConsent({
      name: "",
      email: "",
      consents: []
    })
  }

  return (
    <Container>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { my: 1, mr: 2, width: "30ch" }
        }}
        autoComplete="off"
        onSubmit={saveUserConsent}
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Full Name"
            name={"name"}
            value={consent.name}
            onChange={handleTextChange}
          />
          <TextField
            required
            id="outlined-disabled"
            label="Email Address"
            name={"email"}
            value={consent.email}
            onChange={handleTextChange}
          />
        </div>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                checked={consent.consents.includes(SubjectConsent.newsletter)}
              />
            }
            label={SubjectConsent.newsletter}
            value={SubjectConsent.newsletter}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                checked={consent.consents.includes(SubjectConsent.targeted_ads)}
              />
            }
            label={SubjectConsent.targeted_ads}
            value={SubjectConsent.targeted_ads}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                checked={consent.consents.includes(SubjectConsent.anonymous_statistics)}
              />
            }
            label={SubjectConsent.anonymous_statistics}
            value={SubjectConsent.anonymous_statistics}
          />
        </FormGroup>

        <div>
          <Button type={"submit"} variant="contained" disabled={consent.consents.length === 0}>
            {"Give Consent"}
          </Button>
        </div>
      </Box>
    </Container>
  )
}
