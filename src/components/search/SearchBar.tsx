import React, {
  ChangeEvent,
  FC,
  Dispatch,
  SetStateAction,
  useState,
  ChangeEventHandler,
  FormEventHandler,
} from "react";
import { SearchParams } from "types";

interface Props {
  value: string;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  onSearch: Dispatch<SetStateAction<SearchParams>>;
}

export const SearchBar: FC<Props> = ({ onSearch, ...inputProps }) => {
  const [status, setStatus] = useState<SearchParams["status"]>("");
  const [gender, setGender] = useState<SearchParams["gender"]>("");

  const handleChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { name, value },
  }) => {
    switch (name) {
      case "status":
        setStatus(value as SearchParams["status"]);
        break;
      case "gender":
        setGender(value as SearchParams["gender"]);
        break;
      default:
        return undefined;
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    onSearch({ name: inputProps.value, status, gender });
  };
  return (
    <form className="search__bar" onSubmit={handleSubmit}>
      <input type="text" placeholder="" {...inputProps} />
      <select value={status} name="status" onChange={handleChange}>
        <option value="">--select status--</option>
        {["alive", "dead", "unknown"].map((elem) => (
          <option key={elem} value={elem}>
            {elem.toUpperCase()}
          </option>
        ))}
      </select>
      <select value={gender} name="gender" onChange={handleChange}>
        <option value="">--select gender--</option>
        {["female", "male", "genderless", "unknown"].map((elem) => (
          <option key={elem} value={elem}>
            {elem.toUpperCase()}
          </option>
        ))}
      </select>
      <button type="submit">Search</button>
    </form>
  );
};
