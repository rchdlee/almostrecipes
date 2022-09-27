import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

import { searchActions } from "../../store/search-slice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJugDetergent, faXmark } from "@fortawesome/free-solid-svg-icons";

import classes from "./IngredientItem.module.css";

const IngredientItem = (props) => {
  const dispatch = useDispatch();

  // // for experimental updating search query stuff
  // const [search, setSearch] = useSearchParams();
  // const ingredientsArray = useSelector((state) => state.search.ingredients);
  // const missingIngredientNumber = useSelector(
  //   (state) => state.search.missingIngredientCount
  // );

  const [isHovering, setIsHovering] = useState(false);
  const { name, id } = props;

  const mouseOverHandler = () => {
    setIsHovering(true);
  };

  const mouseOutHandler = () => {
    setIsHovering(false);
  };

  const ingredientDeleteHandler = () => {
    dispatch(searchActions.removeItemFromIngredientsList(id));

    // if you update the route here to delete the ingredient from the query as well, then when you delete
    // the ingredient, theoretically the url should change - so it's a smoother experience on refresh (?)

    // and I could do the same for when changing the value of the missing ingredients
    // but is all that url query changing even necessary/overkill?
    // console.log(ingredientsArray, missingIngredientNumber);

    // setSearch({
    //   ingredients: "test",
    //   missingIngredientCount: 1,
    // });
    // console.log(search);
  };

  return (
    <li className={classes["ingredient-item"]}>
      <p>{name}</p>
      <div onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler}>
        {!isHovering && <FontAwesomeIcon icon={faXmark} />}
        {isHovering && (
          <FontAwesomeIcon
            icon={faXmark}
            transform="grow-1.3"
            onClick={ingredientDeleteHandler}
          />
        )}
      </div>
    </li>
  );
};

export default IngredientItem;
