import * as CSS from "csstype";
import { TextboxProps } from "../types/textbox";

export const Textbox = (props: TextboxProps) => {
  const { type, id, placeholder, val, onChange } = props;

  const textboxStyle: CSS.Properties = {
    width: "85%",
    height: "50px",
    fontSize: "20px",
    marginBottom: "4px",
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      style={textboxStyle}
      autoComplete="off"
      value={val}
      onChange={onChange}
    />
  );
};
