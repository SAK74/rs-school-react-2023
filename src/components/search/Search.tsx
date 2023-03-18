import { Component, ReactNode } from "react";
import { SearchBar } from "./SearchBar";
import { SearchHeader } from "./SearchHeader";

export class Search extends Component {
  render(): ReactNode {
    return (
      <>
        <SearchHeader title="Search bar" />
        <SearchBar />
      </>
    );
  }
}
