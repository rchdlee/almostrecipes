import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../../store/search-slice";
import SearchIngredients from "./SearchIngredients";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./Pantry.module.css";
import { useSearchParams } from "react-router-dom";
import { updateSearchIngredients } from "../../store/search-actions";

const Pantry = (props) => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const ingredientList = useSelector((state) => state.search.ingredients);

  const ingredientInputRef = useRef();

  const [ingredientInput, setIngredientInput] = useState("");

  useEffect(() => {
    const paramObject = Object.fromEntries([...searchParams]);
    if (Object.entries(paramObject).length === 0) {
      return;
    }
    const ingredients = paramObject.ingredients.split(" ");
    console.log(ingredients);

    const ingredientsArray = [];

    for (let i = 0; i < ingredients.length; i++) {
      ingredientsArray.push({
        name: ingredients[i],
        id: Math.random(),
      });
    }

    console.log(ingredientsArray);

    dispatch(updateSearchIngredients(ingredientsArray));
  }, [dispatch]);

  const ingredientSubmitHandler = function (e) {
    e.preventDefault();
    props.setSearchError(false);
    console.log(new Date().getTime());

    console.log(ingredientInput);
    setIngredientInput("");
    dispatch(
      searchActions.addItemToIngredientsList({
        name: ingredientInput,
        id: new Date().getTime(),
      })
    );
  };

  const ingredientInputChangeHandler = function () {
    console.log("updating state");
    setIngredientInput(ingredientInputRef.current.value);
  };

  const errorMessageRemoveHandler = () => {
    console.log("removed!");
    props.setSearchError(false);
  };

  const searchErrorComponent = () => {
    return (
      <div className={classes["no-ing-message"]}>
        <div className={classes["arrow-up"]}></div>
        <p>Please enter at least one ingredient to your pantry!</p>
        <div
          className={classes["x-button"]}
          onClick={errorMessageRemoveHandler}
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
    );
  };

  return (
    <div className={classes["left-col"]}>
      <div className={classes["pantry-header"]}>
        <h2>My Pantry</h2>
        <FontAwesomeIcon
          icon={faCircleQuestion}
          className={classes["question-icon"]}
        />
        <div className={classes.tooltip}>
          <p>
            The ingredients that you have at home! Enter your ingredients here
            and search for recipes based off your ingredient list! Common pantry
            ingredients like salt, pepper, water, and oil, will be automatically
            included as ingredient inputs.
          </p>
        </div>
      </div>
      <form
        onSubmit={ingredientSubmitHandler}
        className={classes["ing-input-form"]}
      >
        <input
          type="text"
          placeholder="add your ingredients here"
          ref={ingredientInputRef}
          value={ingredientInput}
          onChange={ingredientInputChangeHandler}
        />
        <button>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </form>
      {props.searchError && searchErrorComponent()}
      <SearchIngredients />
    </div>
  );
};

export default Pantry;
