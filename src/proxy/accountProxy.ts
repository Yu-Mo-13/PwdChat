// アカウントマスター一覧画面->アカウントマスター詳細画面への遷移時に使用するプロキシ
import { proxy } from "valtio";

const accountStore: {
  id: number;
  app: string;
  account: string;
  appList: string[];
} = proxy({
  id: 0,
  app: "",
  account: "",
  appList: [],
});

const setAccountStore = (
  id: number,
  app: string,
  account: string,
  appList: string[],
) => {
  accountStore.id = id;
  accountStore.app = app;
  accountStore.account = account;
  accountStore.appList = appList;
};

const resetAccountStore = () => {
  accountStore.id = 0;
  accountStore.app = "";
  accountStore.account = "";
};

export { accountStore, setAccountStore, resetAccountStore };
