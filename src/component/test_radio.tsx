// import React from "react";
import { render } from "@testing-library/react";
import RadioButtons from "../component/radio";

test("Radio component should be checked when initValue matches radio value", () => {
  const initValue = "option1";
  const keyArray = ["1"];
  const radioValue = ["option1"];
  const { getByLabelText } = render(
    <RadioButtons keys={keyArray} values={radioValue} initValue={initValue} />
  );

  const radioInput = getByLabelText(radioValue[0]) as HTMLInputElement;
  expect(radioInput.checked).toBe(true);
});
