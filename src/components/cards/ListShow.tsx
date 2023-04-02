import { Component, ReactNode, useEffect, useState } from "react";
import { UserType } from "types";
import getData from "../../services/getData";
import "./style.scss";
import { CardsList } from "./CardsList";

export const ListShow = () => {
  const [cards, setCards] = useState<UserType[]>([]);
  useEffect(() => {
    getData.then((data) => {
      setCards(data);
    });
  }, []);

  return <CardsList cards={cards} />;
};
