import React, { FC } from "react";
import { RickandmortyType } from "types";
import "./style.scss";

interface MortyCardProps {
  person: RickandmortyType;
  onClick?: () => void;
}
export const MortyCard: FC<MortyCardProps> = ({ person, onClick }) => {
  const { name, image, status, gender } = person;
  return (
    <div className="card__item" data-testid="wrapper" onClick={onClick}>
      <img src={image} alt={name} />
      <div className="name">
        {name}
        <div>{status}</div>
        <div>{gender}</div>
      </div>
      <hr />
    </div>
  );
};
