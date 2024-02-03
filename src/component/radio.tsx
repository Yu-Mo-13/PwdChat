// ラジオボタンコンポーネント
import { useState } from "react";
import * as CSS from "csstype";
import { RadioProps } from "../types/radio";

const RadioButtons = (props: RadioProps) => {
  const { keys, values, initValue } = props;
  const [selectedValue, setSelectedValue] = useState<string>("");
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };
  const radioDatas = (keys: string[], values: string[]) => {
    const radioData = [];
    for (let i = 0; i < keys.length; i++) {
      radioData.push({
        key: keys[i],
        value: values[i],
      });
    }
    return radioData;
  };
  const radioValue = radioDatas(keys, values);
  // ラジオボタンに設定するデータ
  // keysとvaluesのlengthは同じにする
  const radioStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "55%",
    height: "3rem",
    fontSize: "1.3rem",
    marginBottom: "0rem",
    textAlign: "left",
  };

  return (
    <form>
      {radioValue.map((radio) => (
        <label key={radio.key} style={radioStyle}>
          <input
            type="radio"
            name="radio"
            value={radio.value}
            checked={initValue === radio.value}
            defaultValue={initValue}
            onChange={changeValue}
          />
          {radio.key}
        </label>
      ))}
      <input type="hidden" className="selectedValue" value={selectedValue} />
    </form>
  );
};

export default RadioButtons;
