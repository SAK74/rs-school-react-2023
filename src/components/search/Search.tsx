import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  FC,
  useState,
  useEffect,
} from "react";
import { SearchParams } from "services/getApi";
import { SearchBar } from "./SearchBar";
import { SearchHeader } from "./SearchHeader";
import "./style.scss";

const STOREDKEY = "input";

interface SearchProps {
  onSearchChange: Dispatch<SetStateAction<SearchParams>>;
}

export const Search: FC<SearchProps> = ({ onSearchChange }) => {
  const [input, setInput] = useState(
    window.sessionStorage.getItem(STOREDKEY) || ""
  );
  useEffect(() => () => window.sessionStorage.setItem(STOREDKEY, input));

  const inputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setInput(value);
  };

  return (
    <div className="search__container" data-testid="search-container">
      <SearchHeader title="Search bar" />
      <SearchBar
        value={input}
        onChange={inputChange}
        onSearch={onSearchChange}
      />
    </div>
  );
};
