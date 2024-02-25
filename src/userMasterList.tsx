import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import * as CSS from "csstype";
import { getUserList } from "./api/user";
import { AppTitle } from "./components/apptitle";
import { LargeButton } from "./components/largeButton";
import { Plate } from "./components/plate";
import { LoginUser } from "./components/loginuser";
import { authStore } from "./proxy/authProxy";
import { setMuserStore } from "./proxy/muserProxy";
import { User } from "./types/user";
import { AUTHCLASS, ADDUSERPARAM } from "./utilities/const";

const UserMasterList: React.FC = () => {
  const navigate = useNavigate();
  const authSnap = useSnapshot(authStore);
  const [userList, setUserList] = useState<User[]>([]);
  const [canSelect, setCanSelect] = useState<boolean>(false);

  // ユーザーマスター画面が表示されたときにユーザーリストを取得する
  useState(() => {
    const fetchUserList = async () => {
      setUserList(await getUserList());
      setCanSelect(true);
    };
    try {
      fetchUserList();
    } catch (error: unknown) {
      alert(`ユーザーマスターの取得に失敗しました: ${error}`);
    }
  });

  const userMasterListStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  };

  const headerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const moveToDetail = (id: number) => {
    setMuserStore(id);
    navigate(`/user/detail`, { replace: true });
  };

  return (
    <div className="contents">
      <LoginUser caption={authSnap.jpnname} />
      <AppTitle caption="ユーザーマスター" />
      <div className="header" style={headerStyle}>
        <LargeButton
          caption="戻る"
          isEnabled={canSelect}
          onClick={() => navigate("/menu", { replace: true })}
        />
        <LargeButton
          caption="新規作成"
          isEnabled={canSelect && authSnap.authcd === AUTHCLASS.Admin}
          onClick={() => moveToDetail(ADDUSERPARAM)}
        />
      </div>
      <div className="userList" style={userMasterListStyle}>
        {userList.map((user: User) => (
          <Plate
            key={user.id}
            caption={user.jpnname}
            isEnabled={canSelect}
            onClick={() => moveToDetail(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserMasterList;
