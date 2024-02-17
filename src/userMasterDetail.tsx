import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import * as yup from "yup";
import {
  muserStore,
  setIsAuthUpdated,
  resetMuserStore,
} from "./proxy/muserProxy";
import { authStore } from "./proxy/authProxy";
import { AppTitle } from "./component/apptitle";
import { Caption } from "./component/caption";
import { Textbox } from "./component/textbox";
import { LargeButton } from "./component/largeButton";
import { LoginUser } from "./component/loginuser";
import { getUser, createUser, updateUser } from "./api/user";
import { getAuthorityList } from "./api/authoriry";
import { User } from "./types/user";
import { AUTHCDARRAY, AUTHCLASS } from "./utilities/const";
import { Listbox } from "./component/listbox";
import { Authority } from "./types/authority";
import * as CSS from "csstype";
import { ReadonlyTextbox } from "./component/readonlyTextBox";

const schema = yup.object().shape({
  engname: yup
    .string()
    .required("ユーザー名(英)を入力してください。")
    .test(
      // 英名は半角英数字のみ
      "is-english",
      "ユーザー名(英)は半角英数字のみ入力してください。",
      (value) => {
        return /^[a-zA-Z0-9]+$/.test(value);
      }
    ),
  password: yup.string().required("パスワードを入力してください。"),
  jpnname: yup.string().required("ユーザー名(日)を入力してください。"),
});

const UserMasterDetail: React.FC = () => {
  const navigate = useNavigate();
  const authSnap = useSnapshot(authStore);
  const muserSnap = useSnapshot(muserStore);
  const [userDetailInfo, setUserDetailInfo] = useState<User>({
    id: 0,
    password: "",
    jpnname: "",
    engname: "",
    authcd: AUTHCLASS.Admin,
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

  // 登録・更新ボタン押下時の処理
  const onClickRegistButton = async () => {
    try {
      await schema.validate(userDetailInfo);
      const alertMessage = muserSnap.id === 0 ? "登録" : "更新";
      // ユーザー情報を更新するか確認メッセージを表示
      if (!window.confirm(`ユーザー情報を${alertMessage}しますか？`)) {
        return;
      }
      // id=0は新規登録、それ以外は更新
      muserSnap.id === 0
        ? await createUser(userDetailInfo)
        : await updateUser(userDetailInfo);
      alert(`ユーザー情報を${alertMessage}しました。`);
      resetMuserStore();
      navigate("/user/", { replace: true });
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        console.error(error);
        alert(error.message);
      } else {
        alert(`ユーザー情報の登録に失敗しました。: ${error}`);
      }
    }
  };

  // 戻るボタン押下時の処理
  const onClickBackButton = () => {
    resetMuserStore();
    navigate("/user/", { replace: true });
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
    muserSnap.id === 0 && !muserSnap.isAuthUpdated
      ? getSelectedAuthName(AUTHCLASS.Admin)
      : getSelectedAuthName(userDetailInfo.authcd);
  });

  if (authSnap.authcd === AUTHCLASS.Admin) {
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
              setIsAuthUpdated(true);
            }}
          />
        </div>
        <div className="footer" style={footerStyle}>
          <LargeButton
            caption={muserSnap.id === 0 ? "登録" : "更新"}
            onClick={() => onClickRegistButton()}
            isEnabled={true}
          />
          <LargeButton
            caption="戻る"
            onClick={() => onClickBackButton()}
            isEnabled={true}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="contents">
        <LoginUser caption={authSnap.jpnname} />
        <AppTitle caption="ユーザーマスター詳細" />
        <div className="main">
          <Caption caption={`ユーザーID: ${String(muserSnap.id)}`} />
          <Caption caption="英名" />
          <ReadonlyTextbox
            type="text"
            id="engname"
            placeholder="ユーザー名(英)"
            onChange={() => {}}
            val={userDetailInfo.engname}
          />
          <Caption caption="パスワード" />
          <ReadonlyTextbox
            type="password"
            id="password"
            placeholder="パスワード"
            onChange={() => {}}
            val={atob(userDetailInfo.password)}
          />
          <Caption caption="日本語名" />
          <ReadonlyTextbox
            type="text"
            id="jpnname"
            placeholder="ユーザー名(日)"
            onChange={() => {}}
            val={userDetailInfo.jpnname}
          />
          <Caption caption="権限" />
          <Listbox
            id="authcd"
            optionItems={AUTHCDARRAY}
            isEnabled={false}
            isWidemode={false}
            selectedAuthName={selectedAuthName}
            onChange={() => {}}
          />
        </div>
        <div className="footer" style={footerStyle}>
          <LargeButton
            caption={muserSnap.id === 0 ? "登録" : "更新"}
            onClick={() => {}}
            isEnabled={false}
          />
          <LargeButton
            caption="戻る"
            onClick={() => onClickBackButton()}
            isEnabled={true}
          />
        </div>
      </div>
    );
  }
};

export default UserMasterDetail;
