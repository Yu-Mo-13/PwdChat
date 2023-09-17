import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Caption } from "./caption";
import { Textbox } from "./textbox";
import { Button } from "./button";

const Chat = () => {
    const [appName, setAppName] = useState<string>("");
    const navigate = useNavigate();
    
    const getAccountClass = () => {
        // アカウント必要区分を取得する
        fetch(import.meta.env.VITE_API_BASE_URL + "/application/app=" + appName)
            .then((res) => res.json())
            .then((data) => {
                console.log(appName);
                console.log(data[0].accountClas);
                return data[0].accountClas;
            })
            .catch((err) => {
                console.error(err)
                return "-1";
            });
    };

    const onClickSubmitApp = () => {
        // バリデーション
        if (appName === "") {
            alert("アプリ名を入力してください。");
            return;
        }
        // アカウント必要区分を取得する
        // APIからアカウント必要区分が取得できなかったら、アプリ名の修正を促すアラートを出す
        const accountClass: any = getAccountClass();
        if (accountClass === "" || accountClass === "-1") {
            alert("アプリ名を修正してください。");
            return;
        }
        navigate("/", { replace: true });
    }
    return (
        <div className="contents">
            <Caption caption="Q1. アプリ名は？" />
            <Textbox type="text" placeholder="アプリ" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppName(e.target.value)} value={appName} />
            <Button caption="次へ" onClick={onClickSubmitApp} />
        </div>
    );
};
export default Chat;