import { FC } from "react";
import { UserType } from "types";
import { Card } from "./Card";
import "./style.scss";

interface ListProps {
  cards: UserType[];
}

export const CardsList: FC<ListProps> = (props) => {
  return (
    <div className="card__container" data-testid="cards-list">
      {props.cards?.map((elem, ind) => (
        <Card key={ind + elem.name.first} user={elem} />
      ))}
    </div>
  );
};
