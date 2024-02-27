import { ACCOUNTCLASS, API_ROOT } from "../utilities/const";
import "cross-fetch/polyfill";

const getAllApplicationList = async () => {
  const response = await fetch(`${API_ROOT}/application`);
  const data = await response.json();
  const applicationList: string[] = new Array(data.length);
  for (let i = 0; i < data.length; i++) {
    applicationList[i] = data[i].name;
  }
  return applicationList;
};

const getApplicationList = async () => {
  const response = await fetch(`${API_ROOT}/application`);
  const data = await response.json();
  const applicationList: string[] = new Array(data.length);
  for (let i = 0; i < data.length; i++) {
    if (data[i].accountclas === "1") {
      applicationList[i] = data[i].name;
    }
  }
  return applicationList;
};

const getAccountClas = async (app: string) => {
  const response = await fetch(`${API_ROOT}/application/app=${app}`);
  const data = await response.json();
  return data.accountclas;
};

const getAccountList = async (app: string, accountClas: string) => {
  if (accountClas !== ACCOUNTCLASS.NeedAccount) return new Array(0);
  const response = await fetch(`${API_ROOT}/account/app=${app}`);
  const data = await response.json();
  const accountList: string[] = new Array(data.length);
  // 取得されたアカウントを配列に格納する
  for (let i = 0; i < data.length; i++) {
    accountList[i] = data[i].account;
  }
  return accountList;
};

export {
  getAllApplicationList,
  getApplicationList,
  getAccountClas,
  getAccountList,
};
