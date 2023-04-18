import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "App";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import store from "store";

describe("Testing app structure", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  });
  afterEach(() => {
    cleanup();
  });

  it("Header should be rendered", () => {
    const _header = screen.getByRole("banner");
    expect(_header).toBeInTheDocument();
  });
  it("Named links should be in header", () => {
    const _home = screen.getByText("Home");
    expect(_home).toBeInTheDocument();
    const _about = screen.getByText("About us");
    expect(_about).toBeInTheDocument();
    const _form = screen.getByText("Form");
    expect(_form).toBeInTheDocument();
  });
  it("Search block should be rendered", () => {
    const searchBlock = screen.getByTestId("search-container");
    expect(searchBlock).toBeInTheDocument();
  });
  it("Page about-us should be rendered", async () => {
    const _about = screen.getByText("About us");
    await waitFor(() => userEvent.click(_about));
    expect(screen.getByText("Page about us...")).toBeInTheDocument();
  });
});

describe("Not found page", () => {
  it("Page not found should be rendered", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/anymore"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Sorry, page don't exist...")).toBeInTheDocument();
  });
});
