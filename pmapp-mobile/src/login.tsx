import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Textbox } from "./textbox.tsx";
import { Caption } from "./caption.tsx";
import { Button } from "./button.tsx";
// import Chat from './Chat.tsx';
import './App.css';

const Login = () => {
    const [userId, setUserId] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const navigate = useNavigate();

    const onClickLogin = () => {
        // ログイン処理
        // テキストボックスからユーザーIDとパスワードを取得する
        const userId = getText("USERID");
        const keyword = getText("PASSWORD");
        if (userId === "" || keyword === "") {
            alert("ログイン情報を入力してください。");
            return;
        }
        // ユーザーIDとパスワードを照合する
        const id: string = atob(import.meta.env.VITE_USER);
        const pass: string = atob(import.meta.env.VITE_KEYWORD);
        if (!(userId === id && keyword === pass)) {
            alert("ログイン情報が間違っています。");
            return;
        }
        // チャット画面へ遷移
        navigate("/chat/q1", { replace: true });
    }

    return (
        <div className="contents">
            <Caption caption="PMAPPログイン" />
            {/* ユーザーIDを入力するテキストボックス */}
            <Textbox type="text" id="USERID" placeholder="ユーザーID" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)} value={userId} />
            {/* パスワードを入力するテキストボックス */}
            <Textbox type="password" id="PASSWORD" placeholder="パスワード" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} value={keyword} />
            {/* ログインボタン */}
            <Button caption="ログイン" onClick={onClickLogin} />
        </div>
    );
}

export default Login;