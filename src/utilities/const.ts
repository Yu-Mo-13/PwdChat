// APIのルートパス
// export const API_ROOT = process.env.VITE_API_BASE_URL;
export const API_ROOT = import.meta.env.VITE_API_BASE_URL;

// アカウント区分
export const ACCOUNTCLASS = {
  NoNeedAccount: "0",
  NeedAccount: "1",
};

// add モバイルマスター追加対応
export const AUTHCLASS = {
  Admin: "1",
  General: "2",
  Read: "3",
};

// ユーザーマスターの権限
export const AUTHCDARRAY: string[] = ["1", "2", "3"];

export const FUNCLIST: string[] = ["ユーザーマスター", "アカウントマスター"];

// 新規登録画面遷移時に渡すパラメータ
export const ADDUSERPARAM: number = 0;
export const ADDACCOUNTPARAM: { Id: number; Other: string } = {
  Id: 0,
  Other: "",
};
