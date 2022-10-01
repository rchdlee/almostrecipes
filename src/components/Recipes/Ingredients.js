import { useState, useReducer, useEffect } from "react";
import { useDispatch } from "react-redux";

import { recipeActions } from "../../store/recipe-slice";

import classes from "./Ingredients.module.css";

const Ingredients = (props) => {
  const dispatch = useDispatch();

  const [checkedIngredientCount, setCheckedIngredientCount] = useState(0);
  const [submittedStatus, setSubmittedStatus] = useState(false);

  const ingredientReducer = function (state, action) {
    const index = state.findIndex((ing) => ing.id === +action.id);
    if (action.type === "CHECKBOX") {
      const checkedStatus = state[index].checked;
      state[index].checked = !checkedStatus;
      return state;
    }
    return props.statuses;
  };

  // console.log(props.statuses);
  const [ingredientsStatus, dispatchStatus] = useReducer(
    ingredientReducer,
    props.statuses
  );

  useEffect(() => {
    const checkedArrayLength = ingredientsStatus.filter(
      (ing) => ing.checked === true
    ).length;
    setCheckedIngredientCount(checkedArrayLength);
  }, []);

  const ingredientClickHandler = (event) => {
    dispatchStatus({ type: "CHECKBOX", id: event.target.id });

    const index = ingredientsStatus.findIndex(
      (ing) => ing.id === +event.target.id
    );
    if (ingredientsStatus[index].checked === false) {
      setCheckedIngredientCount((prevState) => prevState + 1);
    }
    if (ingredientsStatus[index].checked === true) {
      setCheckedIngredientCount((prevState) => prevState - 1);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setSubmittedStatus(true);
    const shoppingListIngredients = ingredientsStatus.filter(
      (ing) => ing.checked === true
    );
    console.log(shoppingListIngredients);
    dispatch(
      recipeActions.addIngredientsToShoppingList(shoppingListIngredients)
    );
    const prevListJSON = localStorage.getItem("shoppingList");
    const prevList = JSON.parse(prevListJSON);
    if (!prevList) {
      localStorage.setItem(
        "shoppingList",
        JSON.stringify(shoppingListIngredients)
      );
      return;
    }
    const newIngArray = [...prevList, ...shoppingListIngredients];
    console.log(newIngArray);

    localStorage.setItem("shoppingList", JSON.stringify(newIngArray));
  };

  const ingredientsList = ingredientsStatus.map((ingredient) => {
    const displayName = `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;

    return (
      <div className={classes.ingredient} key={ingredient.id}>
        <input
          type="checkbox"
          id={ingredient.id}
          name={ingredient.name}
          onChange={ingredientClickHandler}
          defaultChecked={ingredient.checked}
          disabled={submittedStatus}
        />
        <label htmlFor={ingredient.id}>{displayName}</label>
      </div>
    );
  });

  // const checkedIngredientsCount = ingredientsStatus
  //   ?.filter((ing) => ing.checked === true)
  //   .length();

  const buttonElement = () => {
    return (
      <div className={classes.button}>
        <button>
          Add Selected ({checkedIngredientCount}) <br /> to Shopping List
        </button>
      </div>
    );
  };

  return (
    <div className={classes["ingredients-container"]}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes["ingredients-section"]}>
          <h4>Ingredients</h4>
          <div className={classes["ingredients-list"]}>
            {/* {ingredientsStatus.length === 0 ? "" : ingredientsList} */}
            <div className={classes["ingredient-items-container"]}>
              {ingredientsList}
            </div>
            <hr
              style={{
                width: 25,
                color: "black",
                backgroundColor: "black",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 12,
                marginBottom: 12,
              }}
            />
            {!submittedStatus ? (
              buttonElement()
            ) : (
              <p>added to shopping list!</p>
            )}
            {/* <div className={classes.button}>
              <button>
                Add Selected ({checkedIngredientCount}) <br /> to Shopping List
              </button>
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Ingredients;

// const [ingredientsStatus, setIngredientsStatus] = useState(props.statuses); // https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object

// console.log(ingredientsStatus, "😋");

// // useEffect(() => {
// //   console.log("from Ingredients.js");

// //   // setIngredientsStatus()
// // }, []);

// const ingredientClickHandler = (event) => {
//   const ingredientID = event.target.id;
//   const checked = !event.target.checked;

//   console.log(event, ingredientID, checked);

//   const index = ingredientsStatus.findIndex(
//     (ing) => ing.id === +ingredientID
//   );
//   console.log(index);

//   setIngredientsStatus(
//     (prevState) => (prevState[index].checked = !prevState[index].checked)
//   );

//   console.log(ingredientsStatus);

//   // screw this gonna have to use usereducer

//   // setIngredientsStatus((prevState) => ({
//   //   ...prevState,
//   //   {id: prevState[index].id,
//   //   checked: !prevState[index].checked,
//   //   amount: prevState[index].amount,
//   //   unit: prevState[index].unit,
//   //   name: prevState[index].name,}
//   // }));

//   // const test = ingredientsStatus[index];
//   // test.checked = checked;

//   // console.log(test);

//   // setIngredientsStatus((prevState) => ({
//   //   ...prevState, prevState[index].checked
//   // }));

//   // setIngredientsStatus((prevState) => ({
//   //   ...prevState, currentIngredientState
//   // }))

//   // const ingredientID = event.target.id;
//   // const checked = event.target.checked;
//   // console.log(
//   //   "ingredient was clicked!",
//   //   ingredientID,
//   //   checked,
//   //   ingredientsStatus
//   // );

//   // const ingredientIDs = ingredientsStatus.map((ing) => ing.id);
//   // const index = ingredientIDs.findIndex((id) => id == ingredientID);
//   // console.log(ingredientsStatus[index], index, ingredientIDs);

//   // const currentIngredientState = ingredientsStatus[index];
//   // const checkedStatus = currentIngredientState.checked;
//   // console.log(currentIngredientState);

//   // // setIngredientsStatus((prevState) => ({
//   // //   ...prevState,
//   // //   currentIngredientState,
//   // // }));
//   // console.log(ingredientsStatus, "✅");
