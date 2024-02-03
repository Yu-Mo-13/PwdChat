// ユーザーマスター一覧画面->ユーザーマスター詳細画面の遷移時に使用するプロキシ
import { proxy } from "valtio";

const muserStore = proxy({ id: 0 });

const setMuserStore = (id: number) => {
  muserStore.id = id;
};

const resetMuserStore = () => {
  muserStore.id = 0;
};

export { muserStore, setMuserStore, resetMuserStore };
