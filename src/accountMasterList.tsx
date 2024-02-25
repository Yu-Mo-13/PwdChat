import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import * as CSS from "csstype";
import { getApplicationList } from "./api/application";
import { getAccountList } from "./api/account";
import { AppTitle } from "./components/apptitle";
import { Caption } from "./components/caption";
import { LargeButton } from "./components/largeButton";
import { Listbox } from "./components/listbox";
import { Plate } from "./components/plate";
import { LoginUser } from "./components/loginuser";
import { authStore } from "./proxy/authProxy";
import { setAccountStore } from "./proxy/accountProxy";
import { Account } from "./types/account";
import { emptyAuthority } from "./types/authority";
import { AUTHCLASS, ADDACCOUNTPARAM } from "./utilities/const";
import { convertCaption } from "./utilities/function";

const AccountMasterList: React.FC = () => {
  const navigate = useNavigate();
  const authSnap = useSnapshot(authStore);
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [applicationList, setApplicationList] = useState<string[]>([]);
  const [canSelect, setCanSelect] = useState<boolean>(false);

  useState(() => {
    const fetchApplicationList = async () => {
      const list = await getApplicationList();
      setApplicationList(list);
      setCanSelect(true);
    };
    try {
      fetchApplicationList();
    } catch (error: unknown) {
      alert(`アプリケーションマスターの取得に失敗しました: ${error}`);
    }
  });

  const accountMasterListStyle: CSS.Properties = {
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

  const refreshAccountList = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedApp(e.target.value);
    setAccountList(await getAccountList(e.target.value));
  };

  const moveToDetail = (
    id: number,
    app: string,
    account: string,
    applicationList: string[]
  ) => {
    setAccountStore(id, app, account, applicationList);
    navigate(`/account/detail`, { replace: true });
  };

  return (
    <div className="contents">
      <LoginUser caption={authSnap.jpnname} />
      <AppTitle caption="アカウントマスター一覧" />
      <div className="header" style={headerStyle}>
        <LargeButton
          caption="戻る"
          isEnabled={canSelect}
          onClick={() => navigate("/menu", { replace: true })}
        />
        <LargeButton
          caption="新規作成"
          isEnabled={canSelect && authSnap.authcd === AUTHCLASS.Admin}
          onClick={() =>
            moveToDetail(
              ADDACCOUNTPARAM.Id,
              ADDACCOUNTPARAM.Other,
              ADDACCOUNTPARAM.Other,
              applicationList
            )
          }
        />
      </div>
      <div className="search">
        <Caption caption="アプリ名" />
        <input type="hidden" value={selectedApp} />
        <Listbox
          id="app"
          optionItems={applicationList}
          isEnabled={canSelect}
          isWidemode={true}
          selectedAuthName={emptyAuthority}
          onChange={refreshAccountList}
        />
      </div>
      <div className="accountList" style={accountMasterListStyle}>
        {accountList.map((account) => (
          <Plate
            key={account.id}
            caption={convertCaption(account.account)}
            isEnabled={canSelect}
            onClick={() =>
              moveToDetail(
                account.id,
                account.app,
                account.account,
                applicationList
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AccountMasterList;
