import { Dispatch, SetStateAction, FC } from "react";
import { SearchParams } from "types";
import { SearchBar } from "./SearchBar";
import { SearchHeader } from "./SearchHeader";
import "./style.scss";

interface SearchProps {
  onSearchChange: Dispatch<SetStateAction<SearchParams>>;
  searchParams: SearchParams;
}

export const Search: FC<SearchProps> = ({ onSearchChange, searchParams }) => {
  return (
    <div className="search__container" data-testid="search-container">
      <SearchHeader title="Search bar" />
      <SearchBar searchParams={searchParams} onSearch={onSearchChange} />
    </div>
  );
};
