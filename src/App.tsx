import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import MainPage from './pages/MainPage'
import { config } from './config'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage githubUrl={config.githubUrl} />} />
        <Route path="/app" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
