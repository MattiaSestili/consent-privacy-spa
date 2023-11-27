import React, { FC, useEffect, useState } from "react"
import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material"
import { useAuth } from "../../Providers/auth"
import { useNavigate } from "react-router-dom"

export const LoginPage: FC = () => {
  const [loading, setLoading] = useState(false)

  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/main/give-consent", { replace: true })
    }
  }, [auth.isAuthenticated, navigate])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    console.info(`logging in as user
      email: ${data.get("email")}
      password: ${data.get("password")}`)

    auth.signIn(data.get("email") as string).then(() => {
      setLoading(false)
    })
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography component="h1" variant="h5">
          {"Sign in"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="Email Address" name="email" autoFocus />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {"Sign In"}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
