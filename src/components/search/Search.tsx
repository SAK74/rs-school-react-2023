import { ChangeEvent, Component, ReactNode } from "react";
import { SearchBar } from "./SearchBar";
import { SearchHeader } from "./SearchHeader";
import "./style.scss";

type Props = Record<string, never>;

interface State {
  input: string;
}

export class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const storage = window.sessionStorage.getItem("input");
    this.state = { input: storage || "" };
  }

  componentWillUnmount(): void {
    window.sessionStorage.setItem("input", this.state.input);
  }

  inputChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    this.setState({ input: value });
  }

  render(): ReactNode {
    return (
      <div className="search__container" data-testid="search-container">
        <SearchHeader title="Search bar" />
        <SearchBar
          value={this.state.input}
          onChange={this.inputChange.bind(this)}
        />
      </div>
    );
  }
}
