import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { server } from "./msw/server";
import { ListShow } from "../components";
import { Provider } from "react-redux";
import store from "store";
import { RespType } from "types";

describe("API testing", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close);

  it("Should be render 10 mocked items", async () => {
    const result: RespType = await fetch("mock-results").then((resp) =>
      resp.json()
    );
    expect(result.results).toHaveLength(10);
  });

  it("Should be render loader during loading", () => {
    render(
      <Provider store={store}>
        <ListShow url="mock-results" />
      </Provider>
    );
    const loader = screen.getByText("... loading");
    expect(loader).toBeInTheDocument();
  });

  it("Should't be render loader after loading", async () => {
    render(
      <Provider store={store}>
        <ListShow url="mock-results" />
      </Provider>
    );
    const loader = screen.getByText("... loading");
    await waitForElementToBeRemoved(loader);
    expect(screen.queryByText("... loading")).toBeNull();
  });

  it("Should be render cards from mocked API", async () => {
    render(
      <Provider store={store}>
        <ListShow url="mock-results" />
      </Provider>
    );
    const cardsContainer = await screen.findByTestId("cards-list");
    expect(cardsContainer).toBeInTheDocument();
    const cards = await screen.findAllByTestId("wrapper");
    expect(cards).toHaveLength(10);
  });
});
