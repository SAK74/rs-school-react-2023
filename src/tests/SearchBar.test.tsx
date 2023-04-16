import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "components/search/SearchBar";

describe("Search bar testing", () => {
  const changeFn = jest.fn();
  const searchFn = jest.fn();
  let input: HTMLInputElement,
    btn: HTMLButtonElement,
    selects: HTMLSelectElement[];
  beforeEach(() => {
    render(<SearchBar value="" onChange={changeFn} onSearch={searchFn} />);
    input = screen.getByRole("textbox");
    btn = screen.getByRole("button", { name: "Search" });
    selects = screen.getAllByRole("combobox");
  });
  it("All elements should be rendered", () => {
    expect(input).toBeInTheDocument();
    expect(selects).toHaveLength(2);
    expect(btn).toBeInTheDocument();
  });

  it("Search Fn should be called after submit", () => {
    userEvent.click(btn);
    expect(searchFn).toHaveBeenCalled();
  });
});
