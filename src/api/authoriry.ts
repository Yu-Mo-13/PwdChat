import type { Authority } from "../types/authority";
import { API_ROOT } from "../utilities/const";
import "cross-fetch/polyfill";

// 権限マスター一覧を取得する
// url: /authority/ method: get
export const getAuthorityList = async () => {
  const response = await fetch(`${API_ROOT}/authority`);
  const data = await response.json();
  const authorityList: Authority[] = new Array(data.length);
  for (let i = 0; i < data.length; i++) {
    authorityList[i] = {
      cd: data[i].cd,
      name: data[i].name,
      adminflg: data[i].adminflg,
      deleteflg: data[i].deleteflg,
      created_at: data[i].created_at,
      updated_at: data[i].updated_at,
    };
  }
  return authorityList;
};
