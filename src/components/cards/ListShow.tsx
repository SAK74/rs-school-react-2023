import { Component, ReactNode } from "react";
import { UserType } from "types";
import getData from "../../services/getData";
import "./style.scss";
import { CardsList } from "./CardsList";

interface State {
  cards: UserType[];
}

export class ListShow extends Component {
  state: Readonly<State> = { cards: [] };

  componentDidMount() {
    getData.then((data) => this.setState({ cards: data }));
  }

  render(): ReactNode {
    return <CardsList cards={this.state.cards} />;
  }
}
