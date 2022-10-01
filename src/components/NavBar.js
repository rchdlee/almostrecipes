import classes from "./NavBar.module.css";

import { useState, Fragment, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
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

  const cssClasses = [
    classes["side-navbar"],
    menuIsOpen ? classes["open"] : classes["closed"],
  ];

  const menuClickHandler = () => {
    console.log("clicked menu!");
    setMenuIsOpen((prevState) => !menuIsOpen);
  };

  const menuCloseHandler = () => {
    console.log("closed menu!");
    setMenuIsOpen(false);
  };

  if (windowSize.innerWidth >= 700) {
    return (
      <nav className={classes.navbar}>
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

    // MINI SIDE NAVBAR
  } else {
    return (
      <div className={classes["navbar-small-container"]}>
        <nav className={classes["navbar-small"]}>
          <div className={classes.icon}>
            <FontAwesomeIcon icon={faCarrot} />
          </div>
          <FontAwesomeIcon
            icon={faBars}
            onClick={menuClickHandler}
            className={classes["menu-icon"]}
          />
        </nav>
        <div className={cssClasses.join(" ")}>
          <FontAwesomeIcon
            icon={faXmark}
            className={classes.xmark}
            onClick={menuCloseHandler}
          />
          <ul>
            <li>
              <NavLink
                to="search"
                className={({ isActive }) => (isActive ? classes.active : "")}
                onClick={menuCloseHandler}
              >
                RECIPE SEARCH
              </NavLink>
            </li>
            <li>
              <NavLink
                to="shopping-list"
                className={({ isActive }) => (isActive ? classes.active : "")}
                onClick={menuCloseHandler}
              >
                SHOPPING LIST
              </NavLink>
            </li>
            <li>
              <NavLink
                to="bookmarks"
                className={({ isActive }) => (isActive ? classes.active : "")}
                onClick={menuCloseHandler}
              >
                BOOKMARKS
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
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
