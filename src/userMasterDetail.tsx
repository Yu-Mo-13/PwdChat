import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { muserStore } from "./proxy/muserProxy";
import { authStore } from "./proxy/authProxy";
import { AppTitle } from "./component/apptitle";
import { Caption } from "./component/caption";
import { Textbox } from "./component/textbox";
import { LargeButton } from "./component/largeButton";
import { LoginUser } from "./component/loginuser";
import { getUser } from "./api/user";
import { getAuthorityList } from "./api/authoriry";
import { User } from "./types/user";
import { AUTHCDARRAY, AUTHCLASS } from "./utilities/const";
import { Listbox } from "./component/listbox";
import { Authority } from "./types/authority";
import * as CSS from "csstype";

export const UserMasterDetail: React.FC = () => {
  const navigate = useNavigate();
  const authSnap = useSnapshot(authStore);
  const muserSnap = useSnapshot(muserStore);
  const [userDetailInfo, setUserDetailInfo] = useState<User>({
    id: 0,
    password: "",
    jpnname: "",
    engname: "",
    authcd: "",
    deleteflg: "",
    created_at: "",
    updated_at: "",
  });
  const [authorityList, setAuthorityList] = useState<Authority[]>([]);
  const [selectedAuthName, setSelectedAuthName] = useState<Authority>({
    cd: 0,
    name: "",
    adminflg: "",
    deleteflg: "",
    created_at: "",
    updated_at: "",
  });

  const footerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const fetchUserDetailInfo = async () => {
    const userDetailInfo = await getUser(muserSnap.id);
    setUserDetailInfo(userDetailInfo);
  };

  const fetchAuthorityList = async () => {
    const authorityList = await getAuthorityList();
    setAuthorityList(authorityList);
  };

  // プルダウンリストの選択肢をもとに、選択された権限名を取得する
  const getSelectedAuthName = (authcd: string) => {
    const auth = authorityList.find((auth) => auth.cd === Number(authcd));
    if (auth) {
      setSelectedAuthName(auth);
    }
  };

  // 初期表示でユーザー情報を取得し、userDetailInfoとして設定する
  useState(() => {
    try {
      if (muserSnap.id !== 0) {
        fetchUserDetailInfo();
      }
      fetchAuthorityList();
    } catch (error: unknown) {
      alert(`ユーザー情報の取得に失敗しました: ${error}`);
    }
  });

  useEffect(() => {
    muserSnap.id === 0
      ? getSelectedAuthName(AUTHCLASS.Admin)
      : getSelectedAuthName(userDetailInfo.authcd);
  });

  return (
    <div className="contents">
      <LoginUser caption={authSnap.jpnname} />
      <AppTitle caption="ユーザーマスター詳細" />
      <div className="main">
        <Caption caption={`ユーザーID: ${String(muserSnap.id)}`} />
        <Caption caption="英名" />
        <Textbox
          type="text"
          id="engname"
          placeholder="ユーザー名(英)"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserDetailInfo({ ...userDetailInfo, engname: e.target.value });
          }}
          val={userDetailInfo.engname}
        />
        <Caption caption="パスワード" />
        <Textbox
          type="password"
          id="password"
          placeholder="パスワード"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserDetailInfo({
              ...userDetailInfo,
              password: btoa(e.target.value),
            });
          }}
          val={atob(userDetailInfo.password)}
        />
        <Caption caption="日本語名" />
        <Textbox
          type="text"
          id="jpnname"
          placeholder="ユーザー名(日)"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserDetailInfo({ ...userDetailInfo, jpnname: e.target.value });
          }}
          val={userDetailInfo.jpnname}
        />
        <Caption caption="権限" />
        <Listbox
          id="authcd"
          optionItems={AUTHCDARRAY}
          isEnabled={true}
          isWidemode={false}
          selectedAuthName={selectedAuthName}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setUserDetailInfo({ ...userDetailInfo, authcd: e.target.value });
          }}
        />
      </div>
      <div className="footer" style={footerStyle}>
        <LargeButton
          caption={muserSnap.id === 0 ? "登録" : "更新"}
          onClick={() => {}}
          isEnabled={true}
        />
        <LargeButton
          caption="戻る"
          onClick={() => navigate("/user/", { replace: true })}
          isEnabled={true}
        />
      </div>
    </div>
  );
};
