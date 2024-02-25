// パスワード検索画面のプロキシ
import { proxy } from "valtio";
import { Password } from "../types/password";

const passwordStore: Password = proxy({
  no: 0,
  pwd: "",
  app: "",
  email_address: "",
  other_info: "",
  firestoreflg: "",
  registered_date: "",
});

const resetPasswordStore = () => {
  passwordStore.no = 0;
  passwordStore.pwd = "";
  passwordStore.app = "";
  passwordStore.email_address = "";
  passwordStore.other_info = "";
  passwordStore.firestoreflg = "";
  passwordStore.registered_date = "";
};

export { passwordStore, resetPasswordStore };
