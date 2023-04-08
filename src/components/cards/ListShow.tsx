import { useEffect, useState, FC } from "react";
import { RickandmortyType } from "types";
import getData, { SearchParams } from "../../services/getApi";
import "./style.scss";
import { CardsList } from "./CardsList";
import { Spinner } from "./spinner";

interface ListProps {
  searchParams: SearchParams;
}

export const ListShow: FC<ListProps> = ({ searchParams }) => {
  const [cards, setCards] = useState<RickandmortyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    getData(searchParams)
      .then((data) => {
        setCards(data);
      })
      .catch((err: Error) => {
        setIsError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  const content = isLoading ? (
    <Spinner />
  ) : isError ? (
    <div className="error">{isError}</div>
  ) : (
    <CardsList cards={cards} type="api" />
  );
  return <>{content}</>;
};
