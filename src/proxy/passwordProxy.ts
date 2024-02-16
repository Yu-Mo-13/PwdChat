// パスワード検索画面のプロキシ
import { proxy } from "valtio";
import { Password } from "../types/password";
import { ACCOUNTCLASS } from "../utilities/const";

const passwordStore: Password = proxy({
  no: 0,
  pwd: "",
  app: "",
  email_address: "",
  other_info: "",
  firestoreflg: "",
  registered_date: "",
  appList: [],
  accountList: [],
  selectedAccount: "",
  accountClas: ACCOUNTCLASS.Init,
});

const setPasswordStore = (
  no: number,
  pwd: string,
  app: string,
  email_address: string,
  other_info: string,
  firestoreflg: string,
  registered_date: string,
  accountList: string[],
  selectedAccount: string,
  accountClas: string
) => {
  passwordStore.no = no;
  passwordStore.pwd = pwd;
  passwordStore.app = app;
  passwordStore.email_address = email_address;
  passwordStore.other_info = other_info;
  passwordStore.firestoreflg = firestoreflg;
  passwordStore.registered_date = registered_date;
  passwordStore.accountList = accountList;
  passwordStore.selectedAccount = selectedAccount;
  passwordStore.accountClas = accountClas;
};

const updateApplicationList = (appList: string[]) => {
  passwordStore.appList = appList;
};

const updateAccountList = (accountList: string[]) => {
  passwordStore.accountList = accountList;
};

const updateSelectedAccount = (selectedAccount: string) => {
  passwordStore.selectedAccount = selectedAccount;
};

const updateAccountClas = (accountClas: string) => {
  passwordStore.accountClas = accountClas;
};

const resetPasswordStore = () => {
  passwordStore.no = 0;
  passwordStore.pwd = "";
  passwordStore.app = "";
  passwordStore.email_address = "";
  passwordStore.other_info = "";
  passwordStore.firestoreflg = "";
  passwordStore.registered_date = "";
  passwordStore.accountList = [];
  passwordStore.selectedAccount = "";
};

export {
  passwordStore,
  setPasswordStore,
  resetPasswordStore,
  updateApplicationList,
  updateAccountList,
  updateSelectedAccount,
  updateAccountClas,
};
