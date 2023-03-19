import { cleanup, render, screen } from "@testing-library/react";
import { CardsList } from "../components";

describe("Cards list testing", () => {
  beforeEach(() => {
    render(<CardsList />);
  });
  afterEach(() => {
    cleanup();
  });

  it("Cards list should be rendered", () => {
    const _list = screen.getByTestId("cards-list");
    expect(_list).toBeInTheDocument();
  });

  it("Cards list should render predefined number of cards", async () => {
    const cards = await screen.findAllByTestId("wrapper");
    expect(cards).toHaveLength(10);
  });
});
