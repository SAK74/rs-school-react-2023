import { useEffect, useState, FC } from "react";
import { RickandmortyType } from "types";
import getData, { SearchParams } from "../../services/getApi";
import "./style.scss";
import { CardsList } from "./CardsList";
import { Spinner } from "./spinner";

interface ListProps {
  searchParams?: SearchParams;
  url?: string;
}

export const ListShow: FC<ListProps> = ({ searchParams, url }) => {
  const [cards, setCards] = useState<RickandmortyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    getData(searchParams, url)
      .then((data) => {
        setCards(data);
      })
      .catch((err: Error) => {
        setIsError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [searchParams]); // eslint-disable-line

  const content = isLoading ? (
    <Spinner />
  ) : isError ? (
    <div className="error" data-testid="error-resp">
      {isError}
    </div>
  ) : (
    <CardsList cards={cards} type="api" />
  );
  return <>{content}</>;
};
