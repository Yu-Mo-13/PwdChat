// ユーザーマスター一覧画面->ユーザーマスター詳細画面の遷移時に使用するプロキシ
import { proxy } from "valtio";

const muserStore = proxy({ id: 0, isAuthUpdated: false });

const setMuserStore = (id: number) => {
  muserStore.id = id;
};

const setIsAuthUpdated = (isAuthUpdated: boolean) => {
  muserStore.isAuthUpdated = isAuthUpdated;
};

const resetMuserStore = () => {
  muserStore.id = 0;
  muserStore.isAuthUpdated = false;
};

export { muserStore, setMuserStore, setIsAuthUpdated, resetMuserStore };
