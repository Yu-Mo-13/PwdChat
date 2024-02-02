import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login.tsx";
import PasswordDetail from "./PasswordDetail.tsx";
import Menu from "./menu.tsx";
import UserMasterList from "./userMasterList.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/detail" element={<PasswordDetail />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/user/list" element={<UserMasterList />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="user" element={<Navigate to="/user/list" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
