import { UserType } from "types";
import json from "./users.json";

const data = new Promise<UserType[]>((res) => res(json));

export default data;
