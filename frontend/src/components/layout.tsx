import React, { FC } from "react"
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

export const Layout: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const onNavigateToGiveConsent = () => {
    navigate("/main/give-consent")
  }

  const onNavigateToCollectedConsents = () => {
    navigate("/main/consents")
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box"
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem>
            <ListItemButton onClick={onNavigateToGiveConsent} selected={location.pathname === "/main/give-consent"}>
              <ListItemText primary={"Give Consents"} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={onNavigateToCollectedConsents} selected={location.pathname === "/main/consents"}>
              <ListItemText primary={"Collected Consents"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
