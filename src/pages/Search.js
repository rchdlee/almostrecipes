import { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Search.module.css";
import { TailSpin } from "react-loader-spinner";

import { searchActions } from "../store/search-slice";
import Pantry from "../components/Search/Pantry";
import MissingIngredients from "../components/Search/MissingIngredients";
import SearchResultsContainer from "../components/Search/SearchResultsContainer";
import { useSearchParams } from "react-router-dom";

import { API_KEY } from "../components/Helpers/constants";

const Search = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [ingredientErrorStatus, setIngredientErrorStatus] = useState(false);

  const [fetchError, setFetchError] = useState(false);

  const ingredientList = useSelector((state) => state.search.ingredients);
  const missingIngredientCount = useSelector(
    (state) => state.search.missingIngredientCount
  );

  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    const callback = (event) => {
      // event.metaKey - pressed Command key on Macs
      // event.ctrlKey - pressed Control key on Linux or Windows
      if ((event.metaKey || event.ctrlKey) && event.code === "Enter") {
        submitHandler();
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  let ingredientsString;

  const submitHandler = async function () {
    try {
      if (ingredientList.length === 0) {
        console.log("please add ingredient to query!");
        setIngredientErrorStatus(true);
        return;
      }
      console.log("submitted request");
      const ingredientsArray = ingredientList
        .map((ingredient) => ingredient.name)
        .map((ingredient) => ingredient.toLowerCase());
      console.log(ingredientsArray);
      ingredientsString = ingredientsArray.join(",");
      const ingredientsStringSpaces = ingredientsArray.join(" ");
      setIsLoading(true);
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredientsString}&ignorePantry=true&number=50`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error("something went wrong with fetching search results!");
      }

      const filteredRecipes = data.filter(
        (recipe) => recipe.missedIngredientCount <= missingIngredientCount
      );
      // console.log(filteredRecipes);
      setIsLoading(false);
      dispatch(searchActions.updateSearchResults(filteredRecipes));

      setSearch({
        ingredients: ingredientsStringSpaces,
        missingIngredientCount: missingIngredientCount,
      });
      // console.log(search);
      console.log("finished request");

      // potential for validation of queries when searching
      // if ingerdient isn't in any of the recipe's usedingredients arrays (transform strings and compare)
      // then remove from the ingredientsList array in redux store
    } catch (error) {
      setFetchError(true);
      console.error(error);
    }
  };

  const setSearchError = (bool) => {
    setIngredientErrorStatus(bool);
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <Pantry
          searchError={ingredientErrorStatus}
          setSearchError={setSearchError}
        />
        <div className={classes["right-col"]}>
          <MissingIngredients />
          <div className={classes["submit-btn-div"]}>
            <button onClick={submitHandler} className={classes["submit-btn"]}>
              <h4>Search for Recipes!</h4>
              {/* <p>(ctrl + enter)</p> */}
            </button>
          </div>
        </div>
      </div>
      {isLoading && !fetchError && (
        <div className={classes.spinner}>
          <TailSpin
            height="80"
            width="80"
            color="#522d80"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <SearchResultsContainer fetchError={fetchError} loading={isLoading} />
    </Fragment>
  );
};

export default Search;
