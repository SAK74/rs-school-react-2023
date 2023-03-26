import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Forms } from "components/form";

describe("Forms testing", () => {
  beforeEach(() => {
    render(<Forms />);
  });

  it("should be specified quantity of fields", () => {
    const textInputs = screen.getAllByRole("textbox");
    const checkboxes = screen.getAllByRole("checkbox");
    const select = screen.getAllByRole("combobox");
    const dateInput = screen.getAllByLabelText("Date of birth:");
    const fileField = screen.getAllByTestId("file-field");
    expect(textInputs).toHaveLength(2);
    expect(checkboxes).toHaveLength(2);
    expect(select).toHaveLength(2);
    expect(dateInput).toHaveLength(1);
    expect(fileField).toHaveLength(1);
  });

  it("testing submit-button behavior before & after typing", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    const textInput = screen.getAllByRole("textbox");
    userEvent.type(textInput[1], "utifyc");
    expect(button).toBeEnabled();
  });
});

describe("Testing form behavior", () => {
  let textInputs: HTMLInputElement[],
    // checkboxes: HTMLInputElement[],
    // dateInput: HTMLInputElement[],
    // fileField: HTMLInputElement[],
    submitBtn: HTMLButtonElement;
  // let selects: HTMLSelectElement[];
  beforeEach(() => {
    render(<Forms />);
    textInputs = screen.getAllByRole("textbox");
    // checkboxes = screen.getAllByRole("checkbox");
    // selects = screen.getAllByRole("combobox");
    // dateInput = screen.getAllByLabelText("Date of birth:");
    // fileField = screen.getAllByTestId("file-field");
    submitBtn = screen.getByRole("button", { name: "Submit" });
  });

  it("Error fields should be rendered if form is not complete", () => {
    userEvent.type(textInputs[0], "asd");
    expect(submitBtn).toBeEnabled();
    userEvent.click(submitBtn);
    const errors = screen.getAllByTestId("error");
    for (const error of errors) {
      expect(error).toBeInTheDocument();
    }
  });
});
