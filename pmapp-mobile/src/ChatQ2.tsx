import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Caption } from "./caption";
import { Button } from "./button";
import { Listbox } from "./listbox";

const ChatQ2 = () => {
    const location = useLocation();
    const [selectApp, setSelectApp] = useState<string>(location.state.appName);
    const [account, setAccount] = useState<string>("");
    const navigate = useNavigate();
    
    const getPassword = (app: string, account: string) => {
        // パスワード取得
        // アカウント必要区分「なし」の場合
        fetch(import.meta.env.VITE_API_BASE_URL + "/pwd/app=" + app + "&account=" + account)
            .then((res) => res.json())
            .then((data) => {
                console.log(selectApp);
                console.log(data[0].pwd);
                return data[0].pwd;
            })
            .catch((err) => {
                console.error(err)
                return "-1";
            });
    }

    const onClickSubmitApp = () => {
        // バリデーション
        if (selectApp === "") {
            alert("アカウントを選択してください。");
            return;
        }
        const password = getPassword(selectApp, account);
        navigate("/chat/result", { state: {password: password}, replace: true });
    }

    return (
        <div className="contents">
            <Caption caption="Q2. アカウントは？" />
            <Listbox optionItems={account} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccount(e.target.value)} />
            <Button caption="次へ" onClick={onClickSubmitApp} />
        </div>
    );
};
export default ChatQ2;