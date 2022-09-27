import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import { searchActions } from "../../store/search-slice";
import { fetchRecipesData } from "../../store/search-actions";
import SearchResult from "./SearchResult";

import classes from "./SearchResultsContainer.module.css";

const SearchResultsContainer = (props) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("useEffect ran from results container");
    const paramObject = Object.fromEntries([...searchParams]);
    // console.log(paramObject);
    if (Object.entries(paramObject).length === 0) {
      return;
    }
    const ingredientsUnformatted = paramObject.ingredients;
    const missingIngredientCount = paramObject.missingIngredientCount;
    const ingredientsFormatted = ingredientsUnformatted.replaceAll(" ", ",");

    // console.log(ingredientsFormatted);

    dispatch(fetchRecipesData(ingredientsFormatted, missingIngredientCount));
    dispatch(
      searchActions.updateMissingIngredientCount(missingIngredientCount)
    );
  }, [dispatch]);

  const searchResultList = useSelector(
    (state) => state.search.recipeSearchResults
  );
  // console.log(searchResultList);

  const searchResultCount = searchResultList.length;

  const noRecipesMessage = () => {
    return (
      <p className={classes["no-recipes-message"]}>
        No search results yet! Enter the ingredients you have and search for
        recipes!
      </p>
    );
  };

  const searchResultsMessage = () => {
    return <p>Search Results: {searchResultCount}</p>;
  };

  const fetchErrorMessage = () => {
    return (
      <div className={classes['fetch-error-message']}>
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p>
          Something went wrong when searching for recipes. Please try again
          later!
        </p>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      {searchResultCount === 0 && !props.fetchError && noRecipesMessage()}
      {searchResultCount !== 0 && !props.fetchError && searchResultsMessage()}
      {props.fetchError && fetchErrorMessage()}
      <div className={classes["search-results"]}>
        {searchResultList.map((recipe) => (
          <SearchResult recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsContainer;
