import { Component, ReactNode } from "react";
import { UserType } from "types";
import { Card } from "./Card";
import getData from "../../services/getData";
import "./style.scss";

interface State {
  cards: UserType[];
}

export class CardsList extends Component {
  state: Readonly<State> = { cards: [] };

  componentDidMount() {
    getData.then((data) => this.setState({ cards: data }));
  }

  render(): ReactNode {
    return (
      <div className="card__container">
        {this.state.cards?.map((user) => (
          <Card key={user.login.uuid} user={user} />
        ))}
      </div>
    );
  }
}
