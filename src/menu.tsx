import React from "react";
import { useNavigate } from "react-router-dom";
import { AppTitle } from "./component/apptitle";
import { Plate } from "./component/plate";
import { LoginUser } from "./component/loginuser";
import { store, resetStore } from "./proxy/proxy";
import { FUNCLIST } from "./utilities/const";
import * as CSS from "csstype";
import { useSnapshot } from "valtio";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const snap = useSnapshot(store);

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
        navigate("/user", { replace: true });
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
    resetStore();
    navigate("/", { replace: true });
  };

  return (
    <div className="contents">
      <LoginUser caption={snap.jpnname} />
      <AppTitle caption="メニュー" />
      <div className="funcList" style={menuStyle}>
        {FUNCLIST.map((funcname) => (
          <Plate
            key={funcname}
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