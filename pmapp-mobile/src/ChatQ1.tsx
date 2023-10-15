import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Caption } from "./caption";
import { Textbox } from "./textbox";
import { Button } from "./button";

const ChatQ1 = () => {
    const [appName, setAppName] = useState<string>("");
    const navigate = useNavigate();
    
    // const getAccountList = () => {
    //     // アカウントのサジェスト
    //     fetch(import.meta.env.VITE_API_BASE_URL + "/account/app=" + appName)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             // 取得されたアカウント数だけ配列を作る
    //             const accountList: string[] = new Array(data.length);
    //             // 取得されたアカウントを配列に格納する
    //             for (let i = 0; i < data.length; i++) {
    //                 accountList[i] = data[i].other_info;
    //             }
    //             setAccountList(accountList);
    //         })
    //         .catch((err) => {
    //             console.error(err)
    //             return "-1";
    //         });
    // }

    // const getPassword = (app: string) => {
    //     console.log(app);
    //     // パスワード取得
    //     // アカウント必要区分「なし」の場合
    //     fetch(import.meta.env.VITE_API_BASE_URL + "/pwd/app=" + app)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(appName);
    //             console.log(data[0].pwd);
    //             return data[0].pwd;
    //         })
    //         .catch((err) => {
    //             console.error(err)
    //             return "-1";
    //         });
    // }

    const onClickSubmitApp = () => {
        // アプリ名の入力欄からテキストを取得する
        const appName = getText("app");
        if (appName === "") {
            alert("アプリ名を入力してください。");
            return;
        }
        // appNameを格納して、Pauseに遷移する
        setAppName(appName);
        // Pauseに画面遷移する
        navigate("/pause", { state: {appName: appName}, replace: true });
    }

    return (
        <div className="contents">
            <Caption caption="アプリ名" />
            <Textbox type="text" id="app" placeholder="アプリ" value={appName} />
            <Button caption="読込" onClick={onClickSubmitApp} />
        </div>
    );
};
export default ChatQ1;