import React, { FC } from "react";
import { SearchParams } from "types";
import "./style.scss";
import { CardsList } from "./CardsList";
import { Spinner } from "../spinner";
import { getAllCharacters } from "services/rtk-query-api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/";

interface ListProps {
  searchParams?: SearchParams;
  url?: string;
}

export const ListShow: FC<ListProps> = ({ searchParams, url }) => {
  const { data, isLoading, isError, error, isFetching } = getAllCharacters({
    params: searchParams,
    url,
  });
  const content =
    isLoading || isFetching ? (
      <Spinner />
    ) : isError ? (
      <div className="error" data-testid="error-resp">
        {(error as FetchBaseQueryError).status +
          " " +
          JSON.stringify((error as FetchBaseQueryError).data as string)}
      </div>
    ) : (
      data && <CardsList cards={data.results} type="api" />
    );

  return <>{content}</>;
};
