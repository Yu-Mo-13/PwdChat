import * as CSS from "csstype";
import { ListboxProps } from "../types/listbox";

export const Listbox = (props: ListboxProps) => {
  const { id, optionItems, isEnabled, isWidemode, selectedAuthName, onChange } =
    props;

  const listBoxStyle: CSS.Properties = {
    width: isWidemode ? "220px" : "80px",
    height: "50px",
    fontSize: "20px",
    marginBottom: "10px",
    paddingRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    maxWidth: "95%",
    // はみ出す場合は、・・・で省略する
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const labelStyle: CSS.Properties = {
    fontSize: "20px",
    marginBottom: "10px",
    paddingLeft: "20px",
    paddingRight: "15px",
    // はみ出す場合は、・・・で省略する
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const divStyle: CSS.Properties = {
    textAlign: "left",
    marginLeft: "0.5rem",
  };

  return (
    <div className="list" style={divStyle}>
      <select
        style={listBoxStyle}
        onChange={onChange}
        value={selectedAuthName.cd}
      >
        {/* propsで渡された配列の個数分optionを生成 */}
        {optionItems.map((item: string) => {
          return (
            <option id={id} value={item} disabled={!isEnabled}>
              {item}
            </option>
          );
        })}
      </select>
      {!isWidemode && (
        <label className="name" style={labelStyle}>
          {selectedAuthName.name}
        </label>
      )}
    </div>
  );
};
