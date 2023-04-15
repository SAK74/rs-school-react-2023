import { Search, ListShow } from "components";
import { useState } from "react";
import { useTypedSelector } from "store/store";
import { SearchParams } from "types";

export const Home = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    name: useTypedSelector((state) => state.searchValue),
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
