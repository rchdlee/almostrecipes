import classes from "./NavBar.module.css";

import { useState, Fragment, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const menuClickHandler = () => {
    console.log("clicked menu!");
    setMenuIsOpen(true);
  };

  if (windowSize.innerWidth >= 700) {
    return (
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
    );
  } else {
    return (
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
    );
  }
};

export default NavBar;

/* <FontAwesomeIcon
icon={faBars}
onClick={menuClickHandler}
className={classes["menu-icon"]}
/>
<div className={classes["nav-menu"]}>
<NavLink
  to="search"
  className={({ isActive }) => (isActive ? classes.active : "")}
>
  RECIPE SEARCH
</NavLink>
<NavLink
  to="search"
  className={({ isActive }) => (isActive ? classes.active : "")}
>
  SHOPPING LIST
</NavLink>
<NavLink
  to="search"
  className={({ isActive }) => (isActive ? classes.active : "")}
>
  BOOKMARKS
</NavLink>
</div> */
