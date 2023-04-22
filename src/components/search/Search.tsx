import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  FC,
  useState,
  useEffect,
  useRef,
} from "react";
import { changeValue } from "store/searchValueSlice";
import { useTypedDispatch, useTypedSelector } from "store/store";
import { SearchParams } from "types";
import { SearchBar } from "./SearchBar";
import { SearchHeader } from "./SearchHeader";
import "./style.scss";

interface SearchProps {
  onSearchChange: Dispatch<SetStateAction<SearchParams>>;
}

export const Search: FC<SearchProps> = ({ onSearchChange }) => {
  const [input, setInput] = useState(
    useTypedSelector((state) => state.searchValue)
  );
  const tempRef = useRef(input);

  const dispatch = useTypedDispatch();
  useEffect(
    () => () => {
      dispatch(changeValue(tempRef.current));
    },
    [dispatch]
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
