import { Component, createRef, RefObject, ChangeEvent, FormEvent } from "react";
import { Switch, Input } from "./";
import "./form-style.scss";
import { resourceFile } from "services/resourceFile";
import { FormValues, UserType } from "types";
import { CardsList } from "components";

type Props = Record<string, never>;

const buttonRef = createRef<HTMLButtonElement>();

export class Forms extends Component<Props, { cards: FormValues[] }> {
  formValues: FormValues;
  errRefObj: Partial<{
    [key in keyof FormValues]: RefObject<HTMLSpanElement>;
  }>;
  constructor(props: Props) {
    super(props);
    this.formValues = {
      title: "",
      firstName: "",
      lastName: "",
      date: "",
      switch: "male",
      check: false,
      file: {
        name: "",
        content: "",
      },
      nat: "",
    };
    this.errRefObj = {
      firstName: createRef(),
      lastName: createRef(),
      date: createRef(),
      file: createRef(),
      nat: createRef(),
      check: createRef(),
    };
    this.state = { cards: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    let name: keyof typeof this.formValues;
    for (name in this.formValues) {
      const elem = form.elements.namedItem(name) as
        | HTMLSelectElement
        | HTMLInputElement;
      const errorToShow = this.errRefObj[name]?.current;
      if (!elem.value) {
        if (buttonRef.current) {
          buttonRef.current.disabled = true;
        }
        if (errorToShow) {
          errorToShow.innerText = `Field ${name} not filled!`;
          errorToShow.style.display = "inline";
        } else {
          throw new Error("Required ref to span Element!");
        }
      } else {
        if (elem.type === "checkbox" && !(elem as HTMLInputElement).checked) {
          if (errorToShow) {
            errorToShow.style.display = "inline";
            errorToShow.innerText = "You must approve choose!";
          }
        } else if (errorToShow) {
          errorToShow.style.display = "none";
        }
        if (name === "check") {
          this.formValues[name] = (elem as HTMLInputElement).checked;
        } else if (name === "switch") {
          this.formValues[name] = !(elem as HTMLInputElement).checked
            ? "male"
            : "female";
        } else if (name === "file") {
          const fileList = (elem as HTMLInputElement).files;
          if (fileList) {
            this.formValues.file.name = fileList[0].name;
            this.formValues.file.content = await resourceFile(fileList[0]);
          }
        } else {
          this.formValues[name] = elem.value;
        }
      }
    }
    if (
      Object.values(this.errRefObj).some(
        (elem) => elem.current?.style.display !== "none"
      )
    ) {
      return;
    }
    this.setState(({ cards }) => {
      const temp = [...cards];
      temp.push(this.formValues);
      return { cards: [...temp] };
    });
    this.showAlert();
    form.reset();
  };
  showAlert() {
    let isInit = true;
    alert(
      `Saved data: ${JSON.stringify(
        this.formValues,
        function (key, val) {
          if (isInit) {
            isInit = false;
            return val;
          }
          return key === "file" ? val.name : val;
        },
        2
      )}`
    );
  }

  nat = ["UA", "US", "GE", "FR", "GB", "CA", "FI", "NO", "BR", "DE"];

  handleChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (buttonRef.current) {
      buttonRef.current.disabled = !value;
    }
    const temp = name as keyof FormValues;
    const err = this.errRefObj[temp]?.current;
    if (err) {
      err.style.display = "none";
    }
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="form__form">
          <select name="title" defaultValue="Ms.">
            <option value="Mr.">Mr</option>
            <option value="Ms.">Ms</option>
            <option value="Mss.">Mss</option>
          </select>

          <Input
            ref={this.errRefObj.firstName}
            name="firstName"
            placeholder="You first name"
            onChange={this.handleChange}
            label="Your first name: "
          />
          <Input
            name="lastName"
            placeholder="You second name"
            onChange={this.handleChange}
            ref={this.errRefObj.lastName}
            label="Your last name: "
          />
          <Switch name="switch" label="Male" label2="Female" />
          <Input
            type="checkbox"
            name="check"
            // defaultChecked
            ref={this.errRefObj.check}
            label="Approve choose"
          />
          <Input
            type="date"
            name="date"
            onChange={this.handleChange}
            ref={this.errRefObj.date}
            label="Date of birth: "
          />
          <div>
            <select name="nat" onChange={this.handleChange}>
              <option value="">-Select nationality-</option>
              {this.nat.map((val, i) => (
                <option key={val + i} value={val}>
                  {val}
                </option>
              ))}
            </select>
            <span ref={this.errRefObj.nat} />
          </div>
          <Input
            type="file"
            name="file"
            accept="image/*"
            ref={this.errRefObj.file}
            onChange={this.handleChange}
            data-testid="file-field"
          />
          <button type="submit" ref={buttonRef} disabled>
            Submit
          </button>
        </form>
        <CardsList
          cards={this.state.cards.map(
            (card) =>
              ({
                name: {
                  first: card.firstName,
                  last: card.lastName,
                  title: card.title,
                },
                dob: {
                  date: card.date,
                  age:
                    new Date().getFullYear() -
                    new Date(card.date).getFullYear(),
                },
                nat: card.nat,
                picture: {
                  medium: card.file.content,
                },
                email: "asdfg",
                location: {
                  city: "Lviv",
                  country: "Ukraine",
                },
              } as UserType)
          )}
        />
      </>
    );
  }
}
