import { FC, ReactNode, useState } from "react";
import { CardType, UserType, RickandmortyType } from "types";
import { Card } from "./Card";
import { Modal } from "./Modal";
import { MortyCard } from "./MortCard";
import "./style.scss";

interface ListProps {
  type: "user" | "api";
  cards: CardType[];
}

export const CardsList: FC<ListProps> = (props) => {
  const [show, setShow] = useState<false | CardType>(false);
  return (
    <>
      <Modal show={Boolean(show)} onClose={() => setShow(false)}>
        {show && showEntries(show)}
      </Modal>
      <div className="card__container" data-testid="cards-list">
        {props.cards?.map((elem, ind) =>
          props.type === "user" ? (
            <Card
              key={ind + (elem as UserType).name.first}
              user={elem as UserType}
              onClick={() => setShow(elem)}
            />
          ) : (
            <MortyCard
              key={(elem as RickandmortyType).id}
              person={elem as RickandmortyType}
              onClick={() => {
                setShow(elem);
              }}
            />
          )
        )}
      </div>
    </>
  );
};

function showEntries(
  elem: string | number | CardType | { [k: string]: string | number }
): ReactNode {
  if (typeof elem === "object") {
    return Object.entries(elem).map(([name, value]) => (
      <div key={name} className="line-of-list">
        <span>{name}: </span>
        {showEntries(value)}
      </div>
    ));
  }
  return elem;
}
