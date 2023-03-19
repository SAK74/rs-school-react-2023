import { FC } from "react";
import { UserType } from "types";
import CountryFlag from "react-country-flag";
import { ImLocation2 as LocationIcon } from "react-icons/im";

interface CardProps {
  user: UserType;
}

export const Card: FC<CardProps> = ({ user }) => {
  const {
    name,
    picture: { medium },
    email,
    nat,
    location: { city, country },
  } = user;
  return (
    <div className="card__item" data-testid="wrapper">
      <img src={medium} alt={name.first} />
      <CountryFlag countryCode={nat} svg />
      <div className="card__name">
        {`${name.title}. ${name.first} `}
        {name.last}
      </div>
      <div className="mail">{email}</div>
      <hr />
      <div className="adress">
        <LocationIcon />
        {`${city} (${country})`}
      </div>
    </div>
  );
};
