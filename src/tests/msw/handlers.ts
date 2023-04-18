import { rest } from "msw";
import { results } from "./data";

export const handlers = [
  rest.get("mock-results", (req, res, ctx) => res(ctx.json({ results }))),
];
