import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Caption } from "./caption";
import { Textbox } from "./textbox";
import { Button } from "./button";
import { Listbox } from "./listbox";

const ChatQ1 = () => {
    // let accountClass: any;
    const [appName, setAppName] = useState<string>("");
    const [accountClass, setAccountClass] = useState(null);
    const [accountList, setAccountList] = useState<string[]>();
    const [showListBox, setShowListBox] = useState(false);
    const [password, setPassword] = useState(null);
    // const navigate = useNavigate();
    
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
                setAccountList(accountList);
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
        // アプリ名の入力欄からテキストを取得する
        const appNameInput = document.getElementById("app") as HTMLInputElement;
        const appName: string = appNameInput.value;
        setAppName(appName);
        console.log(appName);
        // バリデーション
        if (appName === "") {
            alert("アプリ名を入力してください。");
            return;
        }
        // アカウント必要区分を取得する
        // APIからアカウント必要区分が取得できなかったら、アプリ名の修正を促すアラートを出す
        // const accountClass: any = getAccountClass(appName);
        getAccountClass();
        // console.log(accountClass);
        // if (accountClass === undefined || accountClass === -1) {
        //     alert("アプリ名を修正してください。");
        //     return;
        // }
        if (accountClass === 1) {
            getAccountList();
            setShowListBox(true);
        } else {
            const password: string | void = getPassword(appName);
            console.log(password);
        }
    }

    const getAccountClass = () => {
        // アカウント必要区分を取得する
        fetch(import.meta.env.VITE_API_BASE_URL + "/application/app=" + appName)
            .then((res) => res.json())
            .then((data) => {
                console.log(data[0].accountClas);
                setAccountClass(data[0].accountClas);
            })
            .catch((err) => {
                console.error(err)
                return "-1";
            });
        // return jsonData[0].accountClas;
    };

    return (
        <div className="contents">
            <Caption caption="アプリ名" />
            <Textbox type="text" id="app" placeholder="アプリ" value={appName} />
            {
                // showListBoxがtrueの場合のみ、Listboxコンポーネントを表示する
                showListBox && <Listbox optionItems={accountList} />
            }
            <Button caption="読込" onClick={onClickSubmitApp} />
        </div>
    );
};
export default ChatQ1;