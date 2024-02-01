import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Textbox } from "./component/textbox.tsx";
import { AppTitle } from "./component/apptitle.tsx";
import { LargeButton } from "./component/largeButton.tsx";
import { checkLogin } from "./api/user.ts";
import * as yup from "yup"; // yupのインポート
import "./App.css";
import { AUTHCLASS } from "./utilities/const.tsx";

// yupによるバリデーションスキーマの定義
const LoginSchema = yup.object().shape({
  userId: yup.string().required("ログイン情報を入力してください。"),
  keyword: yup.string().required("ログイン情報を入力してください。"),
});

const Login = () => {
  const [userId, setUserId] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();

  const onClickLogin = async () => {
    try {
      // yupを使ってバリデーションを行う
      await LoginSchema.validate({ userId, keyword });
      const userInfo = await checkLogin(userId, btoa(keyword));

      // 権限コードを取得して、遷移先の画面を決定する
      const authCode = userInfo.authcd;

      // 管理者権限はメニュー画面へ遷移
      // 一般権限はパスワード検索画面へ遷移
      authCode === AUTHCLASS.Admin
        ? navigate("/menu", { replace: true })
        : navigate("/detail", { replace: true });
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        // バリデーションエラー
        alert(error.message);
        return;
      }
      if (error instanceof TypeError) {
        // ログインエラー
        alert("ユーザーIDまたはパスワードが間違っています。");
        return;
      }
      // その他のエラー
      alert(`重大なログインエラーが発生しました: ${error}`);
    }
  };

  return (
    <div className="contents">
      <AppTitle caption="PMAPP Mobile" />
      {/* ユーザーIDを入力するテキストボックス */}
      <Textbox
        type="text"
        id="USERID"
        placeholder="ユーザーID"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserId(e.target.value)
        }
        val={userId}
      />
      {/* パスワードを入力するテキストボックス */}
      <Textbox
        type="password"
        id="PASSWORD"
        placeholder="パスワード"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeyword(e.target.value)
        }
        val={keyword}
      />
      {/* ログインボタン */}
      <LargeButton caption="ログイン" onClick={onClickLogin} isEnabled={true} />
    </div>
  );
};

export default Login;
