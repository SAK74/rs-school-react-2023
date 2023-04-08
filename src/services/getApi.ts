import axios, { isAxiosError } from "axios";
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

axios.defaults.baseURL = "https://rickandmortyapi.com/api";

export default function getApi(params: SearchParams) {
  return axios<RespType>("character", {
    params,
  })
    .then((resp) => resp.data.results)
    .catch((err: Error) => {
      let message = "";
      if (isAxiosError(err)) {
        message = JSON.stringify(err.response?.data);
      } else {
        message = err.message;
      }
      throw Error(message);
    });
}
