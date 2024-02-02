import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppTitle } from "./component/apptitle";
import { Plate } from "./component/plate";
import { LoginUser } from "./component/loginuser";
import { store } from "./proxy/proxy";
import * as CSS from "csstype";
import { useSnapshot } from "valtio";
import { getUserList } from "./api/user";
import { User } from "./types/user";

const UserMasterList: React.FC = () => {
  const navigate = useNavigate();
  const snap = useSnapshot(store);
  const [userList, setUserList] = useState<User[]>([]);
  const [canSelect, setCanSelect] = useState<boolean>(false);

  // ユーザーマスター画面が表示されたときにユーザーリストを取得する
  useState(() => {
    const fetchUserList = async () => {
      setUserList(await getUserList());
      setCanSelect(true);
    };
    fetchUserList();
  });

  const userMasterListStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div className="contents">
      <LoginUser caption={snap.jpnname} />
      <AppTitle caption="ユーザーマスター" />
      <Plate
        caption="戻る"
        isEnabled={canSelect}
        onClick={() => navigate("/menu", { replace: true })}
      />
      <Plate
        caption="新規作成"
        isEnabled={canSelect}
        onClick={() => navigate("/useradd", { replace: true })}
      />
      <div className="userList" style={userMasterListStyle}>
        {userList.map((user: User) => (
          <Plate
            key={user.id}
            caption={user.jpnname}
            isEnabled={canSelect}
            onClick={() =>
              navigate(`/userdetail/${user.id}`, { replace: true })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default UserMasterList;
