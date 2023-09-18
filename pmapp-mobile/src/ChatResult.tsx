import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Caption } from "./caption";
import { Textbox } from "./textbox";
import { Button } from "./button";

const ChatResult = () => {
    const location = useLocation();
    const [searchedPassword, setSearchedPassword] = useState<string>(location.state.password);
    const navigate = useNavigate();
    console.log(location.state);
    
    const onClickBack = () => {
        navigate("/chat/q1", { replace: true });
    }

    return (
        <div className="contents">
            <Caption caption="検索結果" />
            <Textbox type="text" placeholder="パスワード" value={searchedPassword} />
            <Button caption="New" onClick={onClickBack} />
        </div>
    );
};
export default ChatResult;