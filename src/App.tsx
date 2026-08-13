import './App.css'
import {Routes, Route} from "react-router-dom"
import DashboardPage from './pages/dashboard/dashboardPage'
import LoginPage from './pages/loginPage/loginPage'
import RegisterPage from './pages/registerPage/registerPage'
import DiagramPage from './pages/diagramPage/diagramPage'
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/dashboard" element={<DashboardPage />}/>
      <Route path="/diagram" element={<DiagramPage />}/>
    </Routes>
  )
}

export default App
