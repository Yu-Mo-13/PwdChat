import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Caption } from "./component/caption";
import { Textbox } from "./component/textbox";
import { SmallButton } from "./component/smallButton";
import * as yup from 'yup'; // yupのインポートpescript";
import * as CSS from 'csstype';
import { AppTitle } from "./component/apptitle";

// yupによるバリデーションスキーマの定義
const schema = yup.object().shape({
    appName: yup.string().required('アプリ名を入力してください。'),
});

const PasswordDetail: React.FC = () => {
    const [appName, setAppName] = useState<string>("");
    // const [accountList, setAccountList] = useState<string[]>([]);
    // const [password, setPassword] = useState<string>("");
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const footerStyle: CSS.Properties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    };

    const onClickReadButton = async () => {
        try {
            // yupを使ってバリデーションを行う
            await schema.validate({ appName });
            // setIsModalOpen(true);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                alert(error.message); // yupからのエラーメッセージを表示
            } else {
                // その他のエラー
                console.error("重大なエラーが発生しました:", error);
            }
        }
    }

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
                <SmallButton caption="読込" onClick={onClickReadButton} isEnabled={true} />
                <SmallButton caption="検索" onClick={() => navigate("/", { replace: true })} isEnabled={true} />
                <SmallButton caption="戻る" onClick={() => navigate("/", { replace: true })} isEnabled={true} />
            </div>
        </div>
    );
};
export default PasswordDetail;