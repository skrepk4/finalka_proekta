import React from "react"
import ReactDOM from "react-dom/client"
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="636388591404-rrfkk7j9t82qqa0t102qbjt6kkd16j09.apps.googleusercontent.com">
      <BrowserRouter>
      <App />
      </BrowserRouter>
  </GoogleOAuthProvider>
  </React.StrictMode>,
)
