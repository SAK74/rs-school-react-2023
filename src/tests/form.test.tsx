import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Forms } from "components/form";
import { resourceFile } from "services/resourceFile";

describe("Forms testing", () => {
  beforeEach(() => {
    render(<Forms />);
  });
  afterEach(() => {
    cleanup();
  });

  it("should be specified quantity of fields", () => {
    const textInputs = screen.getAllByRole("textbox");
    const checkboxes = screen.getAllByRole("checkbox");
    const select = screen.getAllByRole("combobox");
    const dateInput = screen.getAllByLabelText("Date of birth:");
    const fileField = screen.getAllByTestId("file-field");
    const maiField = screen.getAllByPlaceholderText("Type You mail");
    expect(textInputs).toHaveLength(3);
    expect(checkboxes).toHaveLength(2);
    expect(select).toHaveLength(2);
    expect(dateInput).toHaveLength(1);
    expect(fileField).toHaveLength(1);
    expect(maiField).toHaveLength(1);
  });

  it("testing submit-button behavior before & after typing", async () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    const textInput = screen.getAllByRole("textbox");
    await waitFor(() => userEvent.type(textInput[1], "utifyc"));
    expect(button).toBeEnabled();
  });
});

describe("Testing form behavior", () => {
  beforeAll(() => {
    Object.defineProperty(window, "confirm", { value: jest.fn() });
  });
  let textInputs: HTMLInputElement[],
    fileField: HTMLInputElement,
    submitBtn: HTMLButtonElement,
    mailField: HTMLInputElement;
  beforeEach(() => {
    render(<Forms />);
    textInputs = screen.getAllByRole("textbox");
    fileField = screen.getByTestId("file-field");
    submitBtn = screen.getByRole("button", { name: "Submit" });
    mailField = screen.getByPlaceholderText("Type You mail");
  });

  it("Error fields should be rendered if form is not complete", async () => {
    await waitFor(() => userEvent.type(textInputs[0], "asd"));
    expect(submitBtn).toBeEnabled();
    await waitFor(() => userEvent.click(submitBtn));
    const errors = await screen.findAllByTestId("error");
    for (const error of errors) {
      expect(error).toBeInTheDocument();
    }
    const emptyFields = screen.getAllByText("Fill this field!");
    for (const field of emptyFields) {
      expect(field).toBeInTheDocument();
    }
    expect(screen.getByText("Choose a photo!")).toBeInTheDocument();
    expect(screen.getByText("Confirm Your choise")).toBeInTheDocument();
    await waitFor(() => userEvent.type(mailField, "ycjycr"));
    const mailError = await screen.findByText("Incorrect format");
    expect(mailError).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it("testing file uploading", async () => {
    const file = new File(["test"], "test.png");
    await waitFor(() => userEvent.upload(fileField, file));
    expect(fileField.files).toHaveLength(1);
    const filePath = await waitFor(() => resourceFile(file));
    const imgContainer = screen.getByRole<HTMLImageElement>("img");
    expect(imgContainer.src).toBe(filePath);
  });
});
