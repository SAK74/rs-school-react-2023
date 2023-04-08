import { useEffect, useState, FC } from "react";
import { RickandmortyType } from "types";
import getData, { SearchParams } from "../../services/getApi";
import "./style.scss";
import { CardsList } from "./CardsList";

interface ListProps {
  searchParams: SearchParams;
}

export const ListShow: FC<ListProps> = ({ searchParams }) => {
  const [cards, setCards] = useState<RickandmortyType[]>([]);
  useEffect(() => {
    getData(searchParams).then((data) => {
      setCards(data);
    });
  }, [searchParams]);

  return <CardsList cards={cards} type="api" />;
};
