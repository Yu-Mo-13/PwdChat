import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Textbox } from "./component/textbox.tsx";
import { AppTitle } from "./component/apptitle.tsx";
import { LargeButton } from "./component/largeButton.tsx";
import * as yup from 'yup'; // yupのインポート
import './App.css';

// yupによるバリデーションスキーマの定義
const LoginSchema = yup.object().shape({
    userId: yup.string().required('ログイン情報を入力してください。'),
    keyword: yup.string().required('ログイン情報を入力してください。'),
});

const Login = () => {
    const [userId, setUserId] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const navigate = useNavigate();

    const onClickLogin = async () => {
        try {
            // yupを使ってバリデーションを行う
            await LoginSchema.validate({ userId, keyword });

            // ユーザーIDとパスワードを照合する
            const id: string = atob(import.meta.env.VITE_USER);
            const pass: string = atob(import.meta.env.VITE_KEYWORD);
            if (!(userId === id && keyword === pass)) {
                alert("ログイン情報が間違っています。");
                return;
            }
            // チャット画面へ遷移
            navigate("/detail", { replace: true });
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                alert(error.message); // yupからのエラーメッセージを表示
            } else {
                // その他のエラー
                console.error("重大なログインエラーが発生しました:", error);
            }
        }
    }

    return (
        <div className="contents">
            <AppTitle caption="PMAPP Mobile" />
            {/* ユーザーIDを入力するテキストボックス */}
            <Textbox type="text" id="USERID" placeholder="ユーザーID" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)} value={userId} />
            {/* パスワードを入力するテキストボックス */}
            <Textbox type="password" id="PASSWORD" placeholder="パスワード" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} value={keyword} />
            {/* ログインボタン */}
            <LargeButton caption="ログイン" onClick={onClickLogin} isEnabled={true} />
        </div>
    );
}

export default Login;
