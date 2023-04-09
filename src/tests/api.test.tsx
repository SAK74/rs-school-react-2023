import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { server } from "./msw/server";
import { ListShow } from "../components";
import getData from "../services/getApi";
import { rest } from "msw";

describe("API testing", () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close);

  it("Should be render 10 mocked items", async () => {
    const result = await getData({}, "mock-results");
    expect(result).toHaveLength(10);
  });

  it("Should be render loader during loading", () => {
    render(<ListShow url="mock-results" />);
    const loader = screen.getByText("... loading");
    expect(loader).toBeInTheDocument();
  });

  it("Should't be render loader after loading", async () => {
    render(<ListShow url="mock-results" />);
    const loader = screen.getByText("... loading");
    await waitForElementToBeRemoved(loader);
    expect(screen.queryByText("... loading")).toBeNull();
  });

  it("Should be render cards from mocked API", async () => {
    render(<ListShow url="mock-results" />);
    const cardsContainer = await screen.findByTestId("cards-list");
    expect(cardsContainer).toBeInTheDocument();
    const cards = await screen.findAllByTestId("wrapper");
    expect(cards).toHaveLength(10);
  });

  it("Should be render error", async () => {
    server.use(
      rest.get("mock-results", (req, res, ctx) => res(ctx.status(404)))
    );
    render(<ListShow url="mock-results" />);
    const _error = await screen.findByTestId("error-resp");
    expect(_error).toBeInTheDocument();
  });
});
