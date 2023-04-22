import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RespType, SearchParams } from "types";
import fetch from "cross-fetch";

interface ApiParamsType {
  url?: string;
  params?: SearchParams;
}

const URL = "https://rickandmortyapi.com/api/character";

export const rootApi = createApi({
  reducerPath: "rick_morty-api",
  baseQuery: fetchBaseQuery({ baseUrl: "", fetchFn: fetch }),
  endpoints: (build) => ({
    getAll: build.query<RespType, ApiParamsType>({
      query: ({ params, url }) => {
        return {
          url: url || URL,
          params,
        };
      },
    }),
  }),
});

export const { useGetAllQuery: getAllCharacters } = rootApi;
