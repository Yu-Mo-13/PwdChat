export type Account = {
  id: number;
  // アカウント名
  account: string;
  // アプリケーション名
  app: string;
  deleteflg: string;
  created_at: string;
  updated_at: string;
};

export type AccountandPassword = Account & {
  password: string;
};
