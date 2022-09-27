import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { recipeActions } from "../store/recipe-slice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import classes from "./ShoppingList.module.css";
import { useEffect } from "react";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const shoppingListIngredients = useSelector(
    (state) => state.recipe.shoppingList
  );
  console.log(shoppingListIngredients);
  const shoppingListIngredientsLocalStorage = JSON.parse(
    localStorage.getItem("shoppingList")
  );

  useEffect(() => {
    console.log("useeffect ran 😅");
    if (!shoppingListIngredientsLocalStorage) {
      return;
    }
    if (shoppingListIngredients.length !== 0) {
      return;
    }
    dispatch(
      recipeActions.addIngredientsToShoppingList(
        shoppingListIngredientsLocalStorage
      )
    );
  }, []);

  useEffect(() => {
    console.log("useeffect !!!!!11");
    localStorage.setItem(
      "shoppingList",
      JSON.stringify(shoppingListIngredients)
    );
  }, [shoppingListIngredients]);

  console.log(shoppingListIngredients, shoppingListIngredientsLocalStorage);

  const noIngredientsInList = shoppingListIngredients.length === 0;

  const noIngredientsMessage = (
    <p className={classes["no-ings-message"]}>
      No ingredients yet! Add ingredients to your shopping list by visiting a
      recipe!
    </p>
  );

  const ingredientDeleteHandler = (event) => {
    const element = event.target;
    const ingID = element.closest("div").id;
    console.log(ingID);
    dispatch(recipeActions.removeIngredientFromShoppingList(ingID));
  };

  const shoppingListItems = shoppingListIngredients.map((ing) => {
    return (
      <div className={classes["chart-item"]} key={ing.id}>
        <p className={classes.ingredient}>{ing.name}</p>
        <p className={classes.amount}>{`${ing.amount} ${ing.unit}`}</p>
        <p className={classes.recipe}>
          <a href={`http://localhost:3000/search/${ing.recipeID}`}>
            {ing.recipeName}
          </a>
        </p>
        <div
          id={ing.id}
          className={classes["trash-icon"]}
          onClick={ingredientDeleteHandler}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
      </div>
    );
  });

  return (
    <Fragment>
      <div className={classes.title}>
        <h2>My Shopping List</h2>
      </div>
      <div>
        <div className={classes["chart-header"]}>
          <p className={classes.ingredient}>Ingredient</p>
          <p className={classes.amount}>Amount</p>
          <p className={classes.recipe}>Recipe + Link</p>
        </div>
        {noIngredientsInList ? noIngredientsMessage : shoppingListItems}
      </div>
    </Fragment>
  );
};

export default ShoppingList;
