import * as CSS from "csstype";
import { AppTitleProps } from "../types/apptitle";

export const LoginUser = (props: AppTitleProps) => {
  const { caption } = props;

  const captionStyle: CSS.Properties = {
    width: "14rem",
    height: "2rem",
    fontSize: "0.8rem",
    marginTop: "0rem",
    marginBottom: "0rem",
    textAlign: "center",
    // 画面の右上に表示するためのスタイル
    position: "absolute",
    top: "1.5rem",
    right: "0.5rem",
  };

  const captionText = caption;

  return <p style={captionStyle}>ユーザー:{captionText}</p>;
};
