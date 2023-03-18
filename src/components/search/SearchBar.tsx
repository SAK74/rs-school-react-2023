import { ChangeEvent, FC } from "react";

interface Props {
  value: string;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: FC<Props> = (props) => (
  <div className="search__bar">
    <input type="text" placeholder="" {...props} />
    <button>Search</button>
  </div>
);
