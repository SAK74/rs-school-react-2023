import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CardsList } from "components";
import { results } from "./msw/data";

describe("Modal testing", () => {
  let modal: HTMLDivElement;
  let closeBtn: HTMLSpanElement;
  beforeEach(() => {
    render(<CardsList cards={results} type="api" />);
    modal = screen.getByTestId("modal");
    closeBtn = screen.getByTestId("close-modal-btn");
  });

  it("Should be invisible default", () => {
    expect(modal).toBeInTheDocument();
    expect(modal).not.toBeVisible();
  });

  it("Should be visible after card click, and invisible after close", async () => {
    const card = screen.getAllByTestId("wrapper")[Math.round(Math.random())];
    await waitFor(() => userEvent.click(card));
    expect(modal).toBeVisible();
    expect(closeBtn).toBeInTheDocument();
    await waitFor(() => userEvent.click(closeBtn));
    expect(modal).not.toBeVisible();
  });
});
