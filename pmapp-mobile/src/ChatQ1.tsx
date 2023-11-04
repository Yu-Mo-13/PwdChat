import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Caption } from "./caption";
import { Textbox } from "./textbox";
import { Button } from "./button";
import * as yup from 'yup'; // yupのインポート

// yupによるバリデーションスキーマの定義
const ChatQ1Schema = yup.object().shape({
    appName: yup.string().required('アプリ名を入力してください。'),
});

const ChatQ1 = () => {
    const [appName, setAppName] = useState<string>("");
    const navigate = useNavigate();

    const onClickSubmitAppName = async () => {
        try {
            // yupを使ってバリデーションを行う
            await ChatQ1Schema.validate({ appName });
            // Pauseに画面遷移する
            navigate("/pause", { state: {appName: appName}, replace: true });
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                alert(error.message); // yupからのエラーメッセージを表示
            } else {
                // その他のエラー
                console.error("重大なエラーが発生しました:", error);
            }
        }
    }
    
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

    return (
        <div className="contents">
            <Caption caption="アプリ名" />
            <Textbox type="text" id="APP" placeholder="アプリ" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppName(e.target.value)} value={appName} />
            <Button caption="読込" onClick={onClickSubmitAppName} />
        </div>
    );
};
export default ChatQ1;