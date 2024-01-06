import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './login.tsx'
import PasswordDetail from './PasswordDetail.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/detail" element={<PasswordDetail />} />
        <Route path="/" element={<Navigate to="/login" />} />
        {/* <Route path="/chat/q2" element={<ChatQ2 />} /> */}
        {/* <Route path="/chat/result" element={<ChatResult />} /> */}
        {/* <Route path="/chat/" element={<Navigate to="/chat/q1" />} /> */}
        {/* <Route path="/pause" element={<Pause />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
