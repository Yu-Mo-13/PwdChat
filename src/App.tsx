import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login.tsx";
import PasswordDetail from "./PasswordDetail.tsx";
import Menu from "./menu.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/detail" element={<PasswordDetail />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
