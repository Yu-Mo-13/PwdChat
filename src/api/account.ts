import { Account } from "../types/account";

export const getAccountList = async (app: string = "") => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(APIURL + "/account");
  const data = await response.json();
  const accountList: Account[] = new Array(data.length);
  if (app === "") {
    for (let i = 0; i < data.length; i++) {
      accountList[i] = {
        id: data[i].id,
        account: data[i].account,
        app: data[i].app,
        deleteflg: data[i].deleteflg,
        created_at: data[i].created_at,
        updated_at: data[i].updated_at,
      };
    }
    return accountList;
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].app === app) {
      accountList[i] = {
        id: data[i].id,
        account: data[i].account,
        app: data[i].app,
        deleteflg: data[i].deleteflg,
        created_at: data[i].created_at,
        updated_at: data[i].updated_at,
      };
    }
  }
  return accountList;
};

// アカウントマスター情報を取得する
// URL: /account/app={app}/account={account}
export const getAccount = async (app: string, account: string) => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(
    APIURL + "/account/app=" + app + "/account=" + account,
  );
  const data = await response.json();
  const accountInfo: Account = {
    id: data.id,
    account: data.account,
    app: data.app,
    deleteflg: data.deleteflg,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
  return accountInfo;
};

// アカウントマスター情報を登録する
// URL: /account/create/app={app}/account={account}
export const createAccount = async (accountInfo: Account) => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(
    `${APIURL}/account/create/app=${accountInfo.app}/account=${accountInfo.account}`,
    {
      method: "POST",
    },
  );
  const data = await response.json();
  return data;
};

// アカウントマスター情報を削除する
// URL: /account/delete/app={app}/account={account}
export const deleteAccount = async (accountInfo: Account) => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(
    `${APIURL}/account/delete/app=${accountInfo.app}/account=${accountInfo.account}`,
    {
      method: "POST",
    },
  );
  const data = await response.json();
  return data;
};
