import { useSelector } from "react-redux";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";

import classes from "./RecipeDetails.module.css";

const RecipeDetails = () => {
  const ingredientsData = useSelector((state) => state.recipe.ingredients);
  const recipeName = useSelector((state) => state.recipe.recipeName);
  const recipeID = useSelector((state) => state.recipe.id);
  const missedIngredientsArray = useSelector(
    (state) => state.recipe.missedIngredients
  );
  const missedIngredientsIDs = missedIngredientsArray.map((ing) => ing.id);
  // console.log(missedIngredientsIDs);

  const ingredientStatuses = ingredientsData.map((ing) => {
    if (missedIngredientsIDs.includes(ing.id)) {
      return {
        id: ing.id,
        checked: true,
        amount: ing.amount,
        unit: ing.unit,
        name: ing.name,
        recipeName: recipeName,
        recipeID: recipeID,
      };
    } else {
      return {
        id: ing.id,
        checked: false,
        amount: ing.amount,
        unit: ing.unit,
        name: ing.name,
        recipeName: recipeName,
        recipeID: recipeID,
      };
    }
  });

  return (
    <div className={classes.container}>
      <Ingredients statuses={ingredientStatuses} />
      <Instructions />
    </div>
  );
};

export default RecipeDetails;
