// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ChatQ1 from './ChatQ1.tsx'
import ChatQ2 from './ChatQ2.tsx'
import ChatResult from './ChatResult.tsx'
import Login from './login.tsx'
import Pause from './pause.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat/q1" element={<ChatQ1 />} />
        <Route path="/chat/q2" element={<ChatQ2 />} />
        <Route path="/chat/result" element={<ChatResult />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/chat/" element={<Navigate to="/chat/q1" />} />
        <Route path="/pause" element={<Pause />} />
      </Routes>
    </BrowserRouter>
  )
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
