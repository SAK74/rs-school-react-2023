import { ReactNode, Component } from "react";
import { UserType } from "types";
import { Card } from "./Card";
import "./style.scss";

interface ListProps {
  cards: UserType[];
}

export class CardsList extends Component<ListProps> {
  render(): ReactNode {
    return (
      <div className="card__container">
        {this.props.cards?.map((elem, ind) => (
          <Card key={ind + elem.name.first} user={elem} />
        ))}
      </div>
    );
  }
}
