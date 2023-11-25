import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/theme.js'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router.jsx'
import AuthProvider from './provider/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
