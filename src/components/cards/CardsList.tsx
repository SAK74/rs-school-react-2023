import { FC } from "react";
import { CardType, UserType, RickandmortyType } from "types";
import { Card } from "./Card";
import { MortyCard } from "./MortCard";
import "./style.scss";

interface ListProps {
  type: "user" | "api";
  cards: CardType[];
}

export const CardsList: FC<ListProps> = (props) => {
  return (
    <div className="card__container" data-testid="cards-list">
      {props.cards?.map((elem, ind) =>
        props.type === "user" ? (
          <Card
            key={ind + (elem as UserType).name.first}
            user={elem as UserType}
          />
        ) : (
          <MortyCard
            key={(elem as RickandmortyType).id}
            person={elem as RickandmortyType}
          />
        )
      )}
    </div>
  );
};
