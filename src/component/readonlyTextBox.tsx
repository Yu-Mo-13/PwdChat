import * as CSS from "csstype";

export const ReadonlyTextbox = (props: any) => {
  const { type, id, placeholder, val } = props;

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
      readOnly
    />
  );
};
