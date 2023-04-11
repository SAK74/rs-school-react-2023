import { STOREDKEY } from "glob-constans";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  FC,
  useState,
  useEffect,
  useRef,
} from "react";
import { SearchParams } from "services/getApi";
import { SearchBar } from "./SearchBar";
import { SearchHeader } from "./SearchHeader";
import "./style.scss";

interface SearchProps {
  onSearchChange: Dispatch<SetStateAction<SearchParams>>;
}

export const Search: FC<SearchProps> = ({ onSearchChange }) => {
  const storedValue = window.sessionStorage.getItem(STOREDKEY);
  const [input, setInput] = useState(storedValue || "");
  const tempRef = useRef(input);

  useEffect(
    () => () => window.sessionStorage.setItem(STOREDKEY, tempRef.current),
    []
  );

  useEffect(() => {
    tempRef.current = input;
  }, [input]);

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
