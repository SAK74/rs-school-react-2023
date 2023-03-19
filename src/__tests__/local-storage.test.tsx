import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "components";

describe("local storage", () => {
  beforeAll(() => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
    });
  });

  it("should call getItem on render", () => {
    render(<Search />);
    expect(window.sessionStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it("should call setItem during unmount", async () => {
    const { unmount, getByRole } = render(<Search />);
    const input = getByRole("textbox");
    const testString = "asdfgh";
    await userEvent.type(input, testString);
    unmount();
    expect(window.sessionStorage.setItem).toBeCalledTimes(1);
    expect(window.sessionStorage.setItem).toBeCalledWith("input", testString);
  });
  it("", () => {});
});
