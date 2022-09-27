import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { recipeActions } from "../../store/recipe-slice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as filledBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as emptyBookmark } from "@fortawesome/free-regular-svg-icons";

import classes from "./Instructions.module.css";

const Instructions = () => {
  const dispatch = useDispatch();
  const instructionsData = useSelector((state) => state.recipe.instructions);
  const id = useSelector((state) => state.recipe.id);
  const recipeName = useSelector((state) => state.recipe.recipeName);
  const imageURL = useSelector((state) => state.recipe.imageURL);

  const [bookmarkIsHovered, setBookmarkIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  useEffect(() => {
    if (!bookmarks) return;
    const bookmarkIDs = bookmarks.map((recipe) => recipe.id);
    if (bookmarkIDs.includes(id)) {
      setIsBookmarked(true);
    }
  }, []);

  const instructions = instructionsData[0].steps;
  // console.log(instructions);
  const instructionComponent = instructions.map((instruction) => {
    return (
      <div className={classes.step} key={instruction.number}>
        <h5>Step {instruction.number}</h5>
        <p>{instruction.step}</p>
      </div>
    );
  });
  // console.log(instructionComponent);

  const mouseOverHandler = () => {
    setBookmarkIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setBookmarkIsHovered(false);
  };

  const clickHandler = () => {
    setIsBookmarked((prevState) => !prevState);

    if (!isBookmarked) {
      console.log("added recipe to bookmarks!");
      const bookmarkData = {
        id,
        recipeName,
        imageURL,
      };
      dispatch(recipeActions.addRecipeToBookmarks(bookmarkData));

      const prevBookmarksListJSON = localStorage.getItem("bookmarks");
      const prevBookmarksList = JSON.parse(prevBookmarksListJSON);
      if (!prevBookmarksList) {
        localStorage.setItem("bookmarks", JSON.stringify([bookmarkData]));
        return;
      }
      const newBookmarksArray = [...prevBookmarksList, bookmarkData];
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarksArray));
    }

    if (isBookmarked) {
      console.log("removed recipe from bookmarks!");
      dispatch(recipeActions.removeRecipeFromBookmarks(id));

      const prevBookmarksListJSON = localStorage.getItem("bookmarks");
      const prevBookmarksList = JSON.parse(prevBookmarksListJSON);
      const index = prevBookmarksList.findIndex((recipe) => recipe.id === +id);
      prevBookmarksList.splice(index);
      localStorage.setItem("bookmarks", JSON.stringify(prevBookmarksList));
    }
  };

  const bookmarkButton = () => {
    if (isBookmarked && bookmarkIsHovered) {
      return <FontAwesomeIcon icon={emptyBookmark} className={classes.icon} />;
    }
    if (!isBookmarked && bookmarkIsHovered) {
      return <FontAwesomeIcon icon={filledBookmark} className={classes.icon} />;
    }
    if (isBookmarked) {
      return <FontAwesomeIcon icon={filledBookmark} className={classes.icon} />;
    }
    if (!isBookmarked) {
      return <FontAwesomeIcon icon={emptyBookmark} className={classes.icon} />;
    }
  };

  return (
    <div className={classes.instructions}>
      <div className={classes["instructions-header"]}>
        <h3>Instructions</h3>
        <div
          className={classes["bookmark-container"]}
          onMouseOver={mouseOverHandler}
          onMouseLeave={mouseLeaveHandler}
          onClick={clickHandler}
        >
          {bookmarkButton()}
        </div>
      </div>
      <div>{instructionComponent}</div>
    </div>
  );
};

export default Instructions;
