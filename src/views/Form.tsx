import { CardsList } from "components";
import { Forms } from "components/form";
import { useTypedSelector } from "store";
import React from "react";

const Form = () => (
  <>
    <Forms />
    <CardsList type="user" cards={useTypedSelector((state) => state.form)} />
  </>
);

export default Form;
