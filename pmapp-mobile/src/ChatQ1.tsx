import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Caption } from "./caption";
import { Textbox } from "./textbox";
import { Button } from "./button";

const ChatQ1 = () => {
    // let accountClass: any;
    const [appName, setAppName] = useState<string>("");
    const navigate = useNavigate();
    
    const getAccountClass = async(app: string) => {
        // アカウント必要区分を取得する
        const promise = await fetch(import.meta.env.VITE_API_BASE_URL + "/application/app=" + app)
        const jsonData = await promise.json();
        return jsonData[0].accountClas;
    };

    // useEffect(() => {
    //     accountClass = getAccountClass(appName);
    //     console.log(accountClass);
    // });
    
    const getAccountList = () => {
        // アカウントのサジェスト
        fetch(import.meta.env.VITE_API_BASE_URL + "/account/app=" + appName)
            .then((res) => res.json())
            .then((data) => {
                // 取得されたアカウント数だけ配列を作る
                const accountList: string[] = new Array(data.length);
                // 取得されたアカウントを配列に格納する
                for (let i = 0; i < data.length; i++) {
                    accountList[i] = data[i].other_info;
                }
                return accountList;
            })
            .catch((err) => {
                console.error(err)
                return "-1";
            });
    }

    const getPassword = (app: string) => {
        console.log(app);
        // パスワード取得
        // アカウント必要区分「なし」の場合
        fetch(import.meta.env.VITE_API_BASE_URL + "/pwd/app=" + app)
            .then((res) => res.json())
            .then((data) => {
                console.log(appName);
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
        if (appName === "") {
            alert("アプリ名を入力してください。");
            return;
        }
        // アカウント必要区分を取得する
        // APIからアカウント必要区分が取得できなかったら、アプリ名の修正を促すアラートを出す
        const accountClass: any = getAccountClass(appName);
        console.log(accountClass);
        if (accountClass === undefined || accountClass === -1) {
            alert("アプリ名を修正してください。");
            return;
        }
        if (accountClass === 1) {
            const accountList: string[] | string | void = getAccountList();
            navigate("/chat/q2", { state: {appName: appName, accountList: accountList}, replace: true });
        } else {
            const password: string | void = getPassword(appName);
            navigate("/chat/result", { state: {password: password}, replace: true });
        }
    }
    return (
        <div className="contents">
            <Caption caption="Q1. アプリ名は？" />
            <Textbox type="text" placeholder="アプリ" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppName(e.target.value)} value={appName} />
            <Button caption="次へ" onClick={onClickSubmitApp} />
        </div>
    );
};
export default ChatQ1;