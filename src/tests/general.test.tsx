import { render, screen } from "@testing-library/react";
import App from "App";
import { BrowserRouter } from "react-router-dom";

describe("Testing app structure", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
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
});
