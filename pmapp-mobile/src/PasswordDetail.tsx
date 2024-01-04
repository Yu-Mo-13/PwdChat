import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Caption } from "./component/caption";
import { Textbox } from "./component/textbox";
import { ReadonlyTextbox } from "./component/readonlyTextBox";
import { SmallButton } from "./component/smallButton";
import * as yup from 'yup'; // yupのインポートpescript";
import * as CSS from 'csstype';
import { AppTitle } from "./component/apptitle";
import { Listbox } from "./component/listbox";
import { getAccountClas, getAccountList } from "./api/application";
import { getPassword } from "./api/password";
import { ACCOUNTCLASS } from "./utilities/const";

// yupによるバリデーションスキーマの定義
const schema = yup.object().shape({
    appName: yup.string().required('アプリ名を入力してください。'),
});

let canUseAccountList: boolean = false;

const PasswordDetail: React.FC = () => {
    const [appName, setAppName] = useState<string>("");
    const [accountClas, setAccountClas] = useState<string>('0');
    const [accountList, setAccountList] = useState<string[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const footerStyle: CSS.Properties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    };

    const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAccount(e.target.value);
    }

    const onClickReadButton = async () => {
        try {
            // yupを使ってバリデーションを行う
            await schema.validate({ appName });
            // getAccountClasで返却された値をaccountClasに設定する
            setAccountClas(await getAccountClas(appName));
            if (accountClas === ACCOUNTCLASS.NeedAccount) {
                // アカウント区分が1の場合はアカウントリストを取得する
                setAccountList(await getAccountList(appName, accountClas));
                canUseAccountList = true;
            }
        } catch (error : any) {
            if (error instanceof yup.ValidationError) {
                alert(error.message); // yupからのエラーメッセージを表示
            } else {
                // その他のエラー
                alert("エラーが発生しました。" + error);
            }
        }
    }

    const onClickSearchButton = async () => {
        try {
            // getPasswordで返却された値をpasswordに設定する
            const account: string = accountClas === '1' ? selectedAccount : "";
            await schema.validate({ appName });
            setPassword(await getPassword(appName, accountClas, account));
        } catch (error: any) {
            if (error instanceof yup.ValidationError) {
                alert("バリデーションエラーが発生しました。" + error.message); // yupからのエラーメッセージを表示
            } else {
                alert("エラーが発生しました。" + error);
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
                <Listbox id="ACCOUNT" optionItems={accountList} isEnabled={canUseAccountList} onChange={handleAccountChange} />
                <Caption caption="パスワード" />
                <ReadonlyTextbox type="text" id="PWD" placeholder="パスワード" val={atob(password)} />
            </div>
            <div className="footer" style={footerStyle}>
                <SmallButton caption="読込" onClick={onClickReadButton} isEnabled={true} />
                <SmallButton caption="検索" onClick={onClickSearchButton} isEnabled={canUseAccountList} />
                <SmallButton caption="戻る" onClick={() => navigate("/", { replace: true })} isEnabled={true} />
            </div>
        </div>
    );
};
export default PasswordDetail;