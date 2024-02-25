import * as CSS from "csstype";
import { AppTitleProps } from "../types/apptitle";

export const Caption = (props: AppTitleProps) => {
  const { caption } = props;

  const captionStyle: CSS.Properties = {
    width: "8rem",
    height: "3rem",
    fontSize: "1.3rem",
    marginBottom: "0rem",
    textAlign: "left",
  };

  const captionText = caption;

  return <p style={captionStyle}>{captionText}</p>;
};
