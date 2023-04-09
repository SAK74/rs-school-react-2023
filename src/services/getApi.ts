import axios, { AxiosError } from "axios";
import { RickandmortyType } from "types";

interface RespType {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: RickandmortyType[];
}

export interface SearchParams {
  name?: string;
  status?: "alive" | "dead" | "unknown" | "";
  gender?: "female" | "male" | "genderless" | "unknown" | "";
}

const URL = "https://rickandmortyapi.com/api/character";

export default function getApi(params?: SearchParams, url: string = URL) {
  return axios
    .get<RespType>(url, {
      params,
    })
    .then((resp) => resp.data.results)
    .catch((err: Error) => {
      let message = "";
      if (err instanceof AxiosError) {
        message = err.response?.data || err.message;
      } else {
        message = err.message;
      }
      throw Error(JSON.stringify(message));
    });
}
