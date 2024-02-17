import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login.tsx";
import PasswordDetail from "./PasswordDetail.tsx";
import Menu from "./menu.tsx";
import UserMasterList from "./userMasterList.tsx";
import UserMasterDetail from "./userMasterDetail.tsx";
import AccountMasterList from "./accountMasterList.tsx";
import AccountMasterDetail from "./accountMasterDetail.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/detail" element={<PasswordDetail />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/user/list" element={<UserMasterList />} />
        <Route path="/user/detail" element={<UserMasterDetail />} />
        <Route path="/account/list" element={<AccountMasterList />} />
        <Route path="/account/detail" element={<AccountMasterDetail />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="user" element={<Navigate to="/user/list" />} />
        <Route path="account" element={<Navigate to="/account/list" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
