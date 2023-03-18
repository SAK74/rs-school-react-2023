import { FC } from "react";

export const SearchHeader: FC<{ title: string }> = ({ title }) => (
  <div className="search__header">{title}</div>
);
