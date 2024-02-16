const getAllApplicationList = async () => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(APIURL + "/application");
  const data = await response.json();
  const applicationList: string[] = new Array(data.length);
  for (let i = 0; i < data.length; i++) {
    applicationList[i] = data[i].name;
  }
  return applicationList;
};

const getApplicationList = async () => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(APIURL + "/application");
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
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(APIURL + "/application/app=" + app);
  const data = await response.json();
  return data.accountclas;
};

const getAccountList = async (app: string, accountClas: string) => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  if (accountClas !== "1") return new Array(0);
  const response = await fetch(APIURL + "/account/app=" + app);
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
