import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Caption } from "./caption";
import { Textbox } from "./textbox";
import { SmallButton } from "./smallButton";
import * as yup from 'yup'; // yupのインポートpescript";
import * as CSS from 'csstype';
import { AppTitle } from "./apptitle";

// yupによるバリデーションスキーマの定義
const schema = yup.object().shape({
    appName: yup.string().required('アプリ名を入力してください。'),
});

const PasswordDetail = () => {
    const [appName, setAppName] = useState<string>("");
    const navigate = useNavigate();

    const footerStyle: CSS.Properties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    };

    const onClickSubmitAppName = async () => {
        try {
            // yupを使ってバリデーションを行う
            await schema.validate({ appName });
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
            <div className="header">
                <AppTitle caption="パスワード検索画面" />
            </div>
            <div className="main">
                <Caption caption="アプリ名" />
                <Textbox type="text" id="APP" placeholder="アプリ" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppName(e.target.value)} value={appName} />
                <Caption caption="アカウント" />
                <Textbox type="text" id="ACCOUNT" placeholder="アカウント" />
                <Caption caption="パスワード" />
                <Textbox type="text" id="PWD" placeholder="パスワード" />
            </div>
            <div className="footer" style={footerStyle}>
                <SmallButton caption="読込" onClick={onClickSubmitAppName} isEnabled={true} />
                <SmallButton caption="検索" onClick={() => navigate("/", { replace: true })} isEnabled={true} />
                <SmallButton caption="戻る" onClick={() => navigate("/", { replace: true })} isEnabled={true} />
            </div>
        </div>
    );
};
export default PasswordDetail;