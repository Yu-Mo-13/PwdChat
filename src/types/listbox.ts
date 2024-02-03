import { Authority } from "./authority";

export type ListboxProps = {
  id: string;
  optionItems: string[];
  isEnabled: boolean;
  isWidemode: boolean;
  selectedAuthName: Authority;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
