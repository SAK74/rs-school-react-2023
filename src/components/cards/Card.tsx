import { FC } from "react";
import { UserType } from "types";
import CountryFlag from "react-country-flag";
import { ImLocation2 as LocationIcon } from "react-icons/im";

interface CardProps {
  user: UserType;
  onClick?: () => void;
}

export const Card: FC<CardProps> = ({ user, onClick }) => {
  const {
    name,
    picture: { medium },
    email,
    nat,
    location: { city, country },
    dob: { age },
  } = user;
  return (
    <div className="card__item" data-testid="wrapper" onClick={onClick}>
      <img src={medium} alt={name.first} />
      <CountryFlag countryCode={nat} svg />
      <div className="card__name" data-testid="name">
        {`${name.title}. ${name.first} `}
        {name.last}
      </div>
      <div>age: {age}</div>
      <div className="mail" data-testid="mail">
        {email}
      </div>
      <hr />
      <div className="adress" data-testid="adress">
        <LocationIcon />
        {`${city} (${country})`}
      </div>
    </div>
  );
};
