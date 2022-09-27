import classes from "./NavBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={classes.header}>
      <nav>
        <div className={classes.icon}>
          <FontAwesomeIcon icon={faCarrot} />
        </div>
        <ul>
          <li>
            <NavLink
              to="search"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              RECIPE SEARCH
            </NavLink>
          </li>
          <li>
            <NavLink
              to="shopping-list"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              SHOPPING LIST
            </NavLink>
          </li>
          <li>
            <NavLink
              to="bookmarks"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              BOOKMARKS
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
