import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { recipeActions } from "../store/recipe-slice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import classes from "./Bookmarks.module.css";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const bookmarkedRecipes = useSelector((state) => state.recipe.bookmarks);
  console.log(bookmarkedRecipes, "🤣");
  const bookmarkedRecipesLocalStorage = JSON.parse(
    localStorage.getItem("bookmarks")
  );

  useEffect(() => {
    if (!bookmarkedRecipesLocalStorage) {
      return;
    }
    if (bookmarkedRecipes.length !== 0) {
      return;
    }
    dispatch(recipeActions.updateBookmarks(bookmarkedRecipesLocalStorage));
  }, []);

  useEffect(() => {
    console.log(bookmarkedRecipes);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkedRecipes));
  }, [bookmarkedRecipes]);

  const noBookmarkedRecipes = bookmarkedRecipes.length === 0;

  const noBookmarksMessage = (
    <p className={classes["no-bookmarks-message"]}>
      No bookmarks yet! Find some delicious recipes and add them to your
      bookmarks!
    </p>
  );

  const bookmarkDeleteHandler = (event) => {
    console.log("delete!!");
    const recipeID = event.target.closest("div").id;
    dispatch(recipeActions.removeRecipeFromBookmarks(recipeID));
  };

  const bookmarksList = bookmarkedRecipes?.map((recipe) => {
    return (
      <div className={classes.recipe} key={recipe.id} id={recipe.id}>
        <Link to={`/search/${recipe.id}`}>
          <img src={recipe.imageURL} alt={recipe.recipeName} />
          <h3>{recipe.recipeName}</h3>
        </Link>
        <button className={classes.button} onClick={bookmarkDeleteHandler}>
          <p>Remove Bookmark</p>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    );
  });

  return (
    <Fragment>
      <div className={classes.title}>
        <h1>My Bookmarked Recipes</h1>
      </div>
      <div className={classes["bookmarks-container"]}>{bookmarksList}</div>
      {noBookmarkedRecipes ? noBookmarksMessage : ""}
    </Fragment>
  );
};

export default Bookmarks;
