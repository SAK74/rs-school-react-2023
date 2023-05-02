import { Search, ListShow } from "components";
import React, { useState } from "react";
import { useTypedSelector } from "store/store";
import { SearchParams } from "types";

export const Home = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>(
    useTypedSelector((state) => state.searchValue)
  );

  return (
    <>
      <Search onSearchChange={setSearchParams} searchParams={searchParams} />
      <hr />
      <ListShow searchParams={searchParams} />
    </>
  );
};
