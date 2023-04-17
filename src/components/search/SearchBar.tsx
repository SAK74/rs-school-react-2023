import {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
} from "react";
import { useTypedDispatch } from "store";
import { changeValue } from "store/searchValueSlice";
import { SearchParams } from "types";

interface Props {
  searchParams: SearchParams;
  onSearch: Dispatch<SetStateAction<SearchParams>>;
}

export const SearchBar: FC<Props> = ({ onSearch, searchParams }) => {
  const [name, setName] = useState(searchParams.name || "");
  const [status, setStatus] = useState<SearchParams["status"]>(
    searchParams.status || ""
  );
  const [gender, setGender] = useState<SearchParams["gender"]>(
    searchParams.gender || ""
  );

  const tempRef = useRef({ name, status, gender });
  useEffect(() => {
    tempRef.current = { name, status, gender };
  }, [name, status, gender]);

  const dispatch = useTypedDispatch();
  useEffect(
    () => () => {
      dispatch(changeValue(tempRef.current));
    },
    [dispatch]
  );

  const handleChange: ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = ({ target: { name, value } }) => {
    switch (name) {
      case "status":
        setStatus(value as SearchParams["status"]);
        break;
      case "gender":
        setGender(value as SearchParams["gender"]);
        break;
      case "name":
        setName(value);
        break;
      default:
        return undefined;
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    onSearch({ name, status, gender });
  };
  return (
    <form className="search__bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="🔍"
        name="name"
        value={name}
        onChange={handleChange}
      />
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
