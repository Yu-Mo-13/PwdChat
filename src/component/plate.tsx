import * as CSS from "csstype";
import { ButtonProps } from "../types/button";

export const Plate = (props: ButtonProps, exProps: { key: string }) => {
  const { caption, isEnabled, onClick } = props;
  const { key } = exProps;

  const plateStyle: CSS.Properties = {
    width: "18rem",
    height: "5rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "white",
    marginBottom: "10px",
    marginTop: "15px",
    textAlign: "center",
    backgroundColor: isEnabled ? "#3cb371" : "#808080",
  };

  return (
    <button
      key={key}
      style={plateStyle}
      disabled={!isEnabled}
      onClick={onClick}
    >
      {caption}
    </button>
  );
};
