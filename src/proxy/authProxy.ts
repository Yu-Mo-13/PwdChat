import { proxy } from "valtio";
import { User } from "../types/user";

const authStore = proxy<User>({
  id: 0,
  password: "",
  engname: "",
  jpnname: "",
  authcd: "",
  deleteflg: "",
  created_at: "",
  updated_at: "",
});

const setAuthStore = (user: User) => {
  authStore.id = user.id;
  authStore.password = user.password;
  authStore.engname = user.engname;
  authStore.jpnname = user.jpnname;
  authStore.authcd = user.authcd;
  authStore.deleteflg = user.deleteflg;
  authStore.created_at = user.created_at;
  authStore.updated_at = user.updated_at;
};

const resetAuthStore = () => {
  authStore.id = 0;
  authStore.password = "";
  authStore.engname = "";
  authStore.jpnname = "";
  authStore.authcd = "";
  authStore.deleteflg = "";
  authStore.created_at = "";
  authStore.updated_at = "";
};

export { authStore, setAuthStore, resetAuthStore };
