import { recipeActions } from "./recipe-slice";

export const fetchRecipeInfo = (data) => {
  // console.log("from recipe actions");
  const recipeInfo = data;
  return (dispatch) => {
    dispatch(recipeActions.addRecipeData(recipeInfo));
  };
};
