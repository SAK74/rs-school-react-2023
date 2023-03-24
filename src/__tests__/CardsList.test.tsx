import { render, screen } from "@testing-library/react";
import { CardsList } from "../components";

describe("Cards list testing", () => {
  it("Cards list should be rendered", () => {
    render(<CardsList />);
    const _list = screen.getByTestId("cards-list");
    expect(_list).toBeInTheDocument();
  });

  it("Cards list should render predefined number of cards", async () => {
    render(<CardsList />);
    const cards = await screen.findAllByTestId("wrapper");
    expect(cards).toHaveLength(10);
  });
});
