import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "components/search/SearchBar";
import { Provider } from "react-redux";
import store from "store";

describe("Search bar testing", () => {
  const searchFn = jest.fn();
  let input: HTMLInputElement,
    btn: HTMLButtonElement,
    selects: HTMLSelectElement[];
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SearchBar searchParams={{}} onSearch={searchFn} />
      </Provider>
    );
    input = screen.getByRole("textbox");
    btn = screen.getByRole("button", { name: "Search" });
    selects = screen.getAllByRole("combobox");
  });

  it("All elements should be rendered", () => {
    expect(input).toBeInTheDocument();
    expect(selects).toHaveLength(2);
    expect(btn).toBeInTheDocument();
  });

  it("Displayed values should be change after typed", async () => {
    await waitFor(() => userEvent.type(input, "rick"));
    expect(input).toHaveValue("rick");

    await waitFor(() => {
      userEvent.selectOptions(selects[0], "alive");
    });
    const _optionAlive: HTMLOptionElement = screen.getByRole("option", {
      name: "ALIVE",
    });
    expect(_optionAlive.selected).toBeTruthy();

    await waitFor(() => {
      userEvent.selectOptions(selects[1], "male");
    });
    const _optionMale: HTMLOptionElement = screen.getByRole("option", {
      name: "MALE",
    });
    expect(_optionMale.selected).toBeTruthy();
  });

  it("Search Fn should be called after submit", () => {
    userEvent.click(btn);
    expect(searchFn).toHaveBeenCalled();
  });
});
