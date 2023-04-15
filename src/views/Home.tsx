import { Search, ListShow } from "components";
import { STOREDKEY } from "glob-constans";
import { useState } from "react";
import { SearchParams } from "types";

export const Home = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    name: window.sessionStorage.getItem(STOREDKEY) || "",
    status: "",
    gender: "",
  });
  return (
    <>
      <Search onSearchChange={setSearchParams} />
      <hr />
      <ListShow searchParams={searchParams} />
    </>
  );
};
