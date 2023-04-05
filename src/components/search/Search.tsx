import { ChangeEvent, useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchHeader } from "./SearchHeader";
import "./style.scss";

const STOREDKEY = "input";

export const Search = () => {
  const stored = window.sessionStorage.getItem(STOREDKEY);
  const [input, setInput] = useState(stored || "");

  useEffect(() => () => {
    window.sessionStorage.setItem(STOREDKEY, input);
  });

  const inputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setInput(value);
  };

  return (
    <div className="search__container" data-testid="search-container">
      <SearchHeader title="Search bar" />
      <SearchBar value={input} onChange={inputChange} />
    </div>
  );
};
