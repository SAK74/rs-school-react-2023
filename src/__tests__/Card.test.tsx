import { render, screen } from "@testing-library/react";
import getData from "../services/getData";
import { UserType } from "types";
import { Card } from "components/cards/Card";

describe("Card component testing", () => {
  let exampleUser: UserType;
  let card: HTMLElement;

  beforeAll(async () => {
    exampleUser = (await getData)[0];
  });

  it("Should be render container in document", () => {
    render(<Card user={exampleUser} />);
    card = screen.getByTestId("wrapper");
    expect(card).toBeInTheDocument();
  });

  it("Should images render", () => {
    render(<Card user={exampleUser} />);
    card = screen.getByTestId("wrapper");
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    images.forEach((elem) => expect(card).toContainElement(elem));
    const fotoImage = screen.getByAltText(exampleUser.name.first);
    expect(card).toContainElement(fotoImage);
  });

  it("Name should be displayed", () => {
    render(<Card user={exampleUser} />);
    const _name = screen.getByTestId("name");
    expect(_name).toBeInTheDocument();
  });

  it("Mail should be displayed", () => {
    render(<Card user={exampleUser} />);
    const _mail = screen.getByTestId("mail");
    expect(_mail).toBeInTheDocument();
  });

  it("Adress should be displayed", () => {
    render(<Card user={exampleUser} />);
    const adress = screen.getByTestId("adress");
    expect(adress).toBeInTheDocument();
  });
});
