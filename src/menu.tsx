import React from "react";
import { useNavigate } from "react-router-dom";
import { AppTitle } from "./component/apptitle";
import { Plate } from "./component/plate";
import { FUNCLIST } from "./utilities/const";
import * as CSS from "csstype";

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const menuStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  };

  const onClickPlate = (funcname: string) => {
    switch (funcname) {
      case FUNCLIST[0]:
        navigate("/detail", { replace: true });
        break;
      case FUNCLIST[1]:
        navigate("/list", { replace: true });
        break;
      default:
        alert("未実装の機能です。");
        break;
    }
  };

  const onClickLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="contents">
      <AppTitle caption="メニュー" />
      <div style={menuStyle}>
        {FUNCLIST.map((funcname) => (
          <Plate
            caption={funcname}
            isEnabled={true}
            onClick={() => onClickPlate(funcname)}
          />
        ))}
        <Plate caption="ログアウト" isEnabled={true} onClick={onClickLogout} />
      </div>
    </div>
  );
};
export default Menu;
