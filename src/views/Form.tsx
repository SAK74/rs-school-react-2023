import { CardsList } from "components";
import { Forms } from "components/form";
import { useTypedSelector } from "store";

export const Form = () => (
  <>
    <Forms />
    <CardsList type="user" cards={useTypedSelector((state) => state.form)} />
  </>
);
