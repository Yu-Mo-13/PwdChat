import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import * as yup from "yup";
import * as CSS from "csstype";
import { getAccount, createAccount, deleteAccount } from "./api/account";
import { authStore } from "./proxy/authProxy";
import { accountStore, resetAccountStore } from "./proxy/accountProxy";
import { Account } from "./types/account";
import { AUTHCLASS } from "./utilities/const";
import { LoginUser } from "./component/loginuser";
import { AppTitle } from "./component/apptitle";
import { LargeButton } from "./component/largeButton";
import { ReadonlyTextbox } from "./component/readonlyTextBox";
import { Caption } from "./component/caption";
import { Textbox } from "./component/textbox";

export const AccountMasterDetail: React.FC = () => {
  const NEWID: number = 0;
  const navigate = useNavigate();
  const authSnap = useSnapshot(authStore);
  const accountSnap = useSnapshot(accountStore);
  const schema = yup.object().shape({
    app: yup
      .string()
      .required("アプリ名を入力してください。")
      .test(
        "is-not-exist-application",
        "アプリケーションが存在しません。",
        async (value) => {
          return (
            accountSnap.appList.filter((appName) => appName === value).length >
            0
          );
        },
      ),
    account: yup.string().required("アカウントを入力してください。"),
  });

  const [accountDetailInfo, setAccountDetailInfo] = useState<Account>({
    id: 0,
    account: "",
    app: "",
    deleteflg: "",
    created_at: "",
    updated_at: "",
  });

  const footerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const fetchApplicationList = async () => {
    const accountDetailInfo: Account = await getAccount(
      accountSnap.app,
      accountSnap.account,
    );
    setAccountDetailInfo(accountDetailInfo);
  };

  // 登録・削除ボタン押下時の処理
  const onClickRegisterButton = async () => {
    try {
      if (accountSnap.id === NEWID) {
        // 登録処理
        await schema.validate(accountDetailInfo);
      }
      const alertMessage: string = accountSnap.id === NEWID ? "登録" : "削除";
      // アカウント情報を更新するか確認メッセージを表示
      if (!window.confirm(`アカウント情報を${alertMessage}しますか？`)) {
        return;
      }
      // 登録・削除処理
      accountSnap.id === NEWID
        ? await createAccount(accountDetailInfo)
        : await deleteAccount(accountDetailInfo);

      resetAccountStore();
      alert(`アカウント情報を${alertMessage}しました。`);
      navigate("/account/", { replace: true });
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        alert(error.message);
        return;
      }
      const alertMessage: string = accountSnap.id === NEWID ? "登録" : "削除";
      if ((error as Error).message === "Failed to fetch") {
        // Failed to fetchの場合は、登録・削除処理が成功しているとみなす
        // 暫定措置として実装するが、API側の修正が必要になりそう
        resetAccountStore();
        alert(`アカウント情報を${alertMessage}しました。`);
        navigate("/account/", { replace: true });
        return;
      }
      alert(
        `アカウント情報の${accountSnap.id === NEWID ? "登録" : "削除"}に失敗しました。: ${error}`,
      );
    }
  };

  // 戻るボタン押下時の処理
  const onClickBackButton = () => {
    resetAccountStore();
    navigate("/account/", { replace: true });
  };

  // 初期表示でアカウント情報を取得し、applicationDetailInfoとして設定する
  useState(() => {
    try {
      if (accountSnap.id === NEWID) {
        return;
      }
      fetchApplicationList();
    } catch (error: unknown) {
      alert(`アカウントマスター情報の取得に失敗しました: ${error}`);
    }
  });

  if (authSnap.authcd === AUTHCLASS.Admin && accountSnap.id === NEWID) {
    return (
      <div className="contents">
        <LoginUser caption={authSnap.jpnname} />
        <AppTitle caption="アカウントマスター詳細" />
        <div className="main">
          <Caption caption="アプリ名" />
          <Textbox
            type="text"
            id="app"
            placeholder="アプリケーション名"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAccountDetailInfo({
                ...accountDetailInfo,
                app: e.target.value,
              });
            }}
            val={accountDetailInfo.app}
          />
          <Caption caption="アカウント" />
          <Textbox
            type="text"
            id="account"
            placeholder="アカウント"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAccountDetailInfo({
                ...accountDetailInfo,
                account: e.target.value,
              });
            }}
            val={accountDetailInfo.account}
          />
        </div>
        <div className="footer" style={footerStyle}>
          <LargeButton
            caption="戻る"
            onClick={() => onClickBackButton()}
            isEnabled={true}
          />
          <LargeButton
            caption={accountSnap.id === NEWID ? "登録" : "削除"}
            onClick={() => onClickRegisterButton()}
            isEnabled={true}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="contents">
        <LoginUser caption={authSnap.jpnname} />
        <AppTitle caption="アカウントマスター詳細" />
        <div className="main">
          <Caption caption="アプリ名" />
          <ReadonlyTextbox
            type="text"
            id="app"
            placeholder="アプリケーション名"
            onChange={() => {}}
            val={accountDetailInfo.app}
          />
          <Caption caption="アカウント" />
          <ReadonlyTextbox
            type="text"
            id="account"
            placeholder="アカウント"
            onChange={() => {}}
            val={accountDetailInfo.account}
          />
        </div>
        <div className="footer" style={footerStyle}>
          <LargeButton
            caption="戻る"
            onClick={() => onClickBackButton()}
            isEnabled={true}
          />
          <LargeButton
            caption="削除"
            onClick={() => onClickRegisterButton()}
            isEnabled={authSnap.authcd === AUTHCLASS.Admin}
          />
        </div>
      </div>
    );
  }
};
