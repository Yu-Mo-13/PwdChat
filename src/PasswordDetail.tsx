import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import * as CSS from "csstype";
import {
  getAccountClas,
  getAccountList,
  getAllApplicationList,
} from "./api/application";
import { getAccount } from "./api/account";
import { getPassword } from "./api/password";
import { AppTitle } from "./components/apptitle";
import { Caption } from "./components/caption";
import { LargeButton } from "./components/largeButton";
import { LoginUser } from "./components/loginuser";
import { Listbox } from "./components/listbox";
import { Plate } from "./components/plate";
import { authStore, resetAuthStore } from "./proxy/authProxy";
import { resetPasswordStore } from "./proxy/passwordProxy";
import { emptyAuthority } from "./types/authority";
import { AccountandPassword } from "./types/account";
import { ACCOUNTCLASS, ADDACCOUNTPARAM, AUTHCLASS } from "./utilities/const";
import { convertCaption } from "./utilities/function";

const PasswordDetail: React.FC = () => {
  const [passwordDetailInfo, setPasswordDetailInfo] = useState<
    AccountandPassword[]
  >([]);
  const [selectedAppName, setSelectedAppName] = useState<string>("");
  const [appList, setAppList] = useState<string[]>([]);
  const [accountClass, setAccountClass] = useState<string>("");
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const navigate = useNavigate();
  const authSnap = useSnapshot(authStore);

  const headerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const accountListStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  };

  const createAccountList = async (app: string, accountClas: string) => {
    const accountList = await getAccountList(app, accountClas);
    accountList.map(async (rec) => {
      const accountInfo = await getAccount(app, rec);
      const password = await getPassword(app, accountClas, rec);
      // 各アカウント情報をpasswordDetailInfoにpushする
      setPasswordDetailInfo((prev) => [
        ...prev,
        {
          id: accountInfo.id,
          app: accountInfo.app,
          account: rec,
          deleteflg: accountInfo.deleteflg,
          created_at: accountInfo.created_at,
          updated_at: accountInfo.updated_at,
          password: password,
        },
      ]);
    });
  };

  const onClickReadButton = async () => {
    setPasswordDetailInfo([]);
    if (accountClass === ACCOUNTCLASS.NeedAccount) {
      createAccountList(selectedAppName, accountClass);
      return;
    }
    setPasswordDetailInfo([
      {
        id: ADDACCOUNTPARAM.Id,
        app: selectedAppName,
        account: "",
        deleteflg: "",
        created_at: "",
        updated_at: "",
        password: await getPassword(selectedAppName, accountClass, ""),
      },
    ]);
  };

  const onClickBackButton = () => {
    resetPasswordStore();
    resetAuthStore();
    navigate("/", { replace: true });
  };

  const onClickGetPasswordButton = async (p: string) => {
    if (p === "") {
      alert("パスワードが登録されていません。");
      return;
    }
    navigator.clipboard.writeText(atob(p)).then(() => {
      if (
        !window.confirm(
          "パスワードをクリップボードにコピーしました。ログイン画面に戻りますか？"
        )
      )
        return;
      onClickBackButton();
    });
  };

  useState(async () => {
    try {
      setAppList(await getAllApplicationList());
    } catch (error: unknown) {
      alert(`アプリケーション情報の取得に失敗しました: ${error}`);
    }
  });

  return (
    <div className="contents">
      <LoginUser caption={authSnap.jpnname} />
      <AppTitle caption="パスワード検索画面" />
      <div className="nav">
        <Caption caption="アプリ名" />
        <Listbox
          id="app"
          optionItems={appList}
          isEnabled={true}
          isWidemode={true}
          selectedAuthName={emptyAuthority}
          onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
            setIsPressed(true);
            setSelectedAppName(e.target.value);
            setAccountClass(await getAccountClas(e.target.value));
            setPasswordDetailInfo([]);
          }}
        />
      </div>
      <div className="header" style={headerStyle}>
        <LargeButton
          caption="戻る"
          onClick={() => onClickBackButton()}
          isEnabled={true}
        />
        <LargeButton
          caption="読込"
          onClick={() => onClickReadButton()}
          isEnabled={isPressed && authSnap.authcd === AUTHCLASS.General}
        />
      </div>
      <div className="accountList" style={accountListStyle}>
        {/* passwordDetailInfo.accountList.mapを使って、Plateのリストを作る */}
        {accountClass === ACCOUNTCLASS.NeedAccount ? (
          passwordDetailInfo.map((rec, i) => (
            <Plate
              key={i}
              caption={convertCaption(rec.account)}
              isEnabled={isPressed && authSnap.authcd === AUTHCLASS.General}
              onClick={() => onClickGetPasswordButton(rec.password)}
            />
          ))
        ) : (
          <Plate
            key={0}
            caption={"取得"}
            isEnabled={isPressed && authSnap.authcd === AUTHCLASS.General}
            onClick={() =>
              onClickGetPasswordButton(passwordDetailInfo[0].password)
            }
          />
        )}
      </div>
    </div>
  );
};

export default PasswordDetail;
