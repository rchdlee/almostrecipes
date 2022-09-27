import { configureStore } from "@reduxjs/toolkit";

import searchSlice from "./search-slice";
import recipeSlice from "./recipe-slice";

const store = configureStore({
  reducer: { search: searchSlice.reducer, recipe: recipeSlice.reducer },
});

// store.subscribe(() => {
//   const state = store.recipe.shoppingList.getState();
//   c
// })

export default store;
