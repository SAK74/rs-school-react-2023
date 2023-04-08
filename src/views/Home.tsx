import { Search, ListShow } from "components";
import { useState } from "react";
import { SearchParams } from "services/getApi";

export const Home = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    name: "",
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
