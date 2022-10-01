import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCircleMinus,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import classes from "./RecipeHero.module.css";

const RecipeHero = () => {
  const title = useSelector((state) => state.recipe.recipeName);
  const imageURL = useSelector((state) => state.recipe.imageURL);
  const cookingTime = useSelector((state) => state.recipe.recipeTimeMinutes);
  const servingSize = useSelector((state) => state.recipe.servings);

  return (
    <div className={classes.hero}>
      <div>
        <h1>{title}</h1>
        <div className={classes["cooking-time"]}>
          <FontAwesomeIcon icon={faClock} className={classes.icon} />
          <p>Cooking Time: </p>
          <p className={classes.bold}>{cookingTime} min</p>
        </div>
        <div className={classes["serving-size"]}>
          <FontAwesomeIcon icon={faUtensils} className={classes.icon} />
          <p>Serving Size: </p>
          <div className={classes["edit-servings"]}>
            {/* <FontAwesomeIcon icon={faCircleMinus} /> */}
            <p className={classes.bold}>{servingSize}</p>
            {/* <FontAwesomeIcon icon={faCirclePlus} /> */}
          </div>
        </div>
      </div>
      <img src={imageURL} alt={title} />
    </div>
  );
};

export default RecipeHero;
