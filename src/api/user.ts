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

export const checkLogin = async (name: string, password: string) => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(
    APIURL + "/user/engname=" + name + "&password=" + password
  );
  const data = await response.json();
  return data;
};
