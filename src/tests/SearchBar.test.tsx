import { render, screen } from "@testing-library/react";
import { SearchBar } from "components/search/SearchBar";

describe("Search bar testing", () => {
  beforeEach(() => {
    render(<SearchBar value="" onChange={() => {}} onSearch={() => {}} />);
  });
  it("All elements should be rendered", () => {
    const input = screen.getByRole("textbox");
    const selects = screen.getAllByRole("combobox");
    const btn = screen.getByRole("button", { name: "Search" });

    expect(input).toBeInTheDocument();
    expect(selects).toHaveLength(2);
    expect(btn).toBeInTheDocument();
  });
});
