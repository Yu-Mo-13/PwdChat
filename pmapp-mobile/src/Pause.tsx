import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Caption } from "./caption";
import { Textbox } from "./textbox";
const Pause = () => {
    const [accountClass, setAccountClass] = useState<string>("");
    // useNavigateで渡された値を取得する
    const location = useLocation();
    const appName = location.state.appName;
    const navigate = useNavigate();

    useEffect(() => {
        const getAccountClass = async () => {
            // アカウント必要区分を取得する
            await fetch(import.meta.env.VITE_API_BASE_URL + "/application/app=" + appName)
                .then((res) => res.json())
                .then((data) => {
                    setAccountClass(data[0].accountClas);
                    console.log(data[0].accountClas)
                })
                .catch((err) => {
                    console.error(err)
                    return -1;
                });
        };

        const accountClass: any = getAccountClass();

        // アカウント必要区分が「なし」の場合
        // ChatQ2に遷移する
        if (accountClass === 0) {
            navigate("/chat/q2", { state: {appName: appName, accountClass: accountClass}, replace: true });
        }
        // アカウント必要区分が「あり」の場合
        // ChatResultに遷移する
        if (accountClass === 1) {
            navigate("/chat/result", { state: {appName: appName, accountClass: accountClass}, replace: true });
        }
        console.log(accountClass);
    });

    return (
        <>
            <Caption caption="ロード中..." />
            <Textbox type="hidden" id="app" placeholder="" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountClass(e.target.value)} val={accountClass} />
        </>
    );
};
export default Pause;