import { render, screen } from "@testing-library/react";
import { CardsList } from "components";
import getData from "../services/getData";

describe("Cards list testing", () => {
  beforeEach(async () => {
    const users = await getData;
    render(<CardsList cards={users} type="user" />);
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
