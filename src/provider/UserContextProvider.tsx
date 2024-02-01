import React from "react";
// import { useEffect, useState } from "react";
import type { User } from "../types/user";

export const UserContext = React.createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([
  {
    id: 0,
    password: "",
    engname: "",
    jpnname: "",
    authcd: "",
    deleteflg: "",
    created_at: "",
    updated_at: "",
  } as User,
  () => {},
]);
