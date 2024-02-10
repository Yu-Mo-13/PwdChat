export type TextboxProps = {
  type: string;
  id: string;
  placeholder: string;
  val: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
