import { NavLink } from "react-router-dom";

export const Header = () => (
  <header>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="about_us">About us</NavLink>
    </nav>
  </header>
);
