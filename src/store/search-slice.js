import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    ingredients: [
      // {
      //   name: "CHICKEN",
      //   id: 1,
      // },
      // {
      //   name: "RICE",
      //   id: 2,
      // },
      // {
      //   name: "BREAD",
      //   id: 3,
      // },
    ],
    missingIngredientCount: 4,
    recipeSearchResults: [],
  },
  reducers: {
    addItemToIngredientsList(state, action) {
      const newItem = action.payload;
      state.ingredients.push(newItem);
    },
    removeItemFromIngredientsList(state, action) {
      const id = action.payload;
      const updatedList = state.ingredients.filter(
        (ingredient) => ingredient.id !== id
      );
      state.ingredients = updatedList;
    },
    updateIngredientsList(state, action) {
      const ingredientsArray = action.payload;
      console.log(ingredientsArray);
      state.ingredients = ingredientsArray;
    },
    updateMissingIngredientCount(state, action) {
      const newCount = action.payload;
      // console.log(newCount, "reducer ran");
      state.missingIngredientCount = newCount;
    },
    updateSearchResults(state, action) {
      const updatedSearchResults = action.payload;
      console.log(updatedSearchResults);
      state.recipeSearchResults = updatedSearchResults;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
