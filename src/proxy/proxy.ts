import { proxy } from "valtio";
import { User } from "../types/user";

const store = proxy<User>({
  id: 0,
  password: "",
  engname: "",
  jpnname: "",
  authcd: "",
  deleteflg: "",
  created_at: "",
  updated_at: "",
});

const setStore = (user: User) => {
  store.id = user.id;
  store.password = user.password;
  store.engname = user.engname;
  store.jpnname = user.jpnname;
  store.authcd = user.authcd;
  store.deleteflg = user.deleteflg;
  store.created_at = user.created_at;
  store.updated_at = user.updated_at;
};

const resetStore = () => {
  store.id = 0;
  store.password = "";
  store.engname = "";
  store.jpnname = "";
  store.authcd = "";
  store.deleteflg = "";
  store.created_at = "";
  store.updated_at = "";
};

export { store, setStore, resetStore };
