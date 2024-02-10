import { User } from "../types/user";

export const getUserList = async () => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(APIURL + "/user");
  const data = await response.json();
  const userList: User[] = new Array(data.length);
  for (let i = 0; i < data.length; i++) {
    userList[i] = {
      id: data[i].id,
      password: data[i].password,
      engname: data[i].engname,
      jpnname: data[i].jpnname,
      authcd: data[i].authcd,
      deleteflg: data[i].deleteflg,
      created_at: data[i].created_at,
      updated_at: data[i].updated_at,
    };
  }
  return userList;
};

// ユーザーマスター情報を取得する
// URL: /user/id={id}
export const getUser = async (id: number) => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(APIURL + "/user/id=" + String(id));
  const data = await response.json();
  const user: User = {
    id: data.id,
    password: data.password,
    engname: data.engname,
    jpnname: data.jpnname,
    authcd: data.authcd,
    deleteflg: data.deleteflg,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
  return user;
};

export const checkLogin = async (name: string, password: string) => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(
    APIURL + "/user/engname=" + name + "&password=" + password,
  );
  const data = await response.json();
  return data;
};

// ユーザーマスター情報を登録する
// URL: /user/create/engname={engname}&jpnname={jpnname}&password={password}&authcd={authcd}
export const createUser = async (user: User) => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(
    `${APIURL}/user/create/engname=${user.engname}&jpnname=${user.jpnname}&password=${user.password}&authcd=${user.authcd}`,
    {
      method: "POST",
    },
  );
  const data = await response.json();
  return data;
};

// ユーザーマスター情報を更新する
// URL: /user/update/id={id}&engname={engname}&jpnname={jpnname}&password={password}&authcd={authcd}
export const updateUser = async (user: User) => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(
    `${APIURL}/user/update/id=${user.id}&engname=${user.engname}&jpnname=${user.jpnname}&password=${user.password}&authcd=${user.authcd}`,
    {
      method: "POST",
    },
  );
  const data = await response.json();
  return data;
};
