import { useLocation } from "react-router-dom";
import { Caption } from "./caption";
import { Textbox } from "./textbox";
const Pause = () => {
    // useNavigateで渡された値を取得する
    const location = useLocation();
    const appName = location.state.appName;

    const getAccountClass = () => {
        // アカウント必要区分を取得する
        fetch(import.meta.env.VITE_API_BASE_URL + "/application/app=" + appName)
            .then((res) => res.json())
            .then((data) => {
                return data[0].accountClas;
            })
            .catch((err) => {
                console.error(err)
                return "-1";
            });
    };

    // 画面遷移後にgetAccountClassを実行する
    getAccountClass();

    return (
        <>
            <Caption caption="ロード中..." />
            <Textbox type="hidden" id="app" placeholder="パスワード" val={appName} />
        </>
    );
};
export default Pause;