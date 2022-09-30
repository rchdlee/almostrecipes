import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLinkClickHandler } from "react-router-dom";
import { recipeActions } from "../../store/recipe-slice";

import classes from "./SearchResult.module.css";

const SearchResult = (props) => {
  const dispatch = useDispatch();

  const [isHovering, setIsHovering] = useState(false);

  const { id, title, image, missedIngredientCount, missedIngredients } =
    props.recipe;

  // console.log(id, title, image, missedIngredientCount, missedIngredients);
  // console.log(missedIngredients);

  const hoverHandler = () => {
    setIsHovering(true);
  };

  const unhoverHandler = () => {
    setIsHovering(false);
  };

  const clickHandler = () => {
    console.log("clicked on a recipe!! 😀");
    dispatch(recipeActions.addMissingIngredients(missedIngredients));
  };

  return (
    // probably need to add react router stuff/logic (link) here for individual ingredient pages
    // and then also probably update some stuff in app component so that the actual route is there, and that's generated on the entire page

    // props stuff for missed Ingredients when generating page
    // (or if props doesn't work maybe some super quick/hacky redux thing onclick?)
    <Link
      to={id.toString()}
      onClick={clickHandler}
      style={{ textDecoration: "none" }}
    >
      <div className={classes["search-result"]}>
        <img
          className={classes["recipe-img"]}
          src={image}
          alt={`A picture of ${title}`}
        />
        <div className={classes["recipe-info"]}>
          <h4 className={classes["recipe-title"]}>{title}</h4>
          <p className={classes["missing-ing-count"]}>
            Missing Ingredients: {missedIngredientCount}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;
