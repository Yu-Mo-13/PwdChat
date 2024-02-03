export type Authority = {
  cd: number;
  name: string;
  adminflg: string;
  deleteflg: string;
  created_at: string;
  updated_at: string;
};

export const emptyAuthority: Authority = {
  cd: 0,
  name: "",
  adminflg: "",
  deleteflg: "",
  created_at: "",
  updated_at: "",
};
