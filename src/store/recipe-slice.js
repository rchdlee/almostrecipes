import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    id: null,
    recipeName: "",
    imageURL: "",
    recipeTimeMinutes: null,
    servings: null,
    ingredients: [],
    instructions: null,
    missedIngredients: [],
    shoppingList: [],
    bookmarks: [],
  },
  reducers: {
    addRecipeData(state, action) {
      const data = action.payload;
      // console.log("addrecipedata from recipe slice ran");

      const id = data.id;
      const name = data.title;
      const image = data.image;
      const cookingTime = data.readyInMinutes;
      const servingSize = data.servings;
      const ingredients = data.extendedIngredients;
      const instructions = data.analyzedInstructions;

      state.id = id;
      state.recipeName = name;
      state.imageURL = image;
      state.recipeTimeMinutes = cookingTime;
      state.servings = servingSize;
      state.ingredients = ingredients;
      state.instructions = instructions;
    },
    addMissingIngredients(state, action) {
      const data = action.payload;
      state.missedIngredients = data;
    },
    addIngredientsToShoppingList(state, action) {
      const data = action.payload;
      const shoppingListIngredients = data.filter(
        (ing) => ing.checked === true
      );
      console.log(shoppingListIngredients);
      state.shoppingList.push(...shoppingListIngredients);
    },
    removeIngredientFromShoppingList(state, action) {
      const id = action.payload;
      console.log(id);
      const newShoppingList = state.shoppingList.filter(
        (ing) => +ing.id !== +id
      );
      state.shoppingList = newShoppingList;
    },
    addRecipeToBookmarks(state, action) {
      const data = action.payload;
      console.log(data);
      if (data.length > 1) {
        console.log("big array");
      }

      state.bookmarks.push(data);
    },
    removeRecipeFromBookmarks(state, action) {
      const id = action.payload;
      const newBookmarks = state.bookmarks.filter(
        (recipe) => recipe.id !== +id
      );
      state.bookmarks = newBookmarks;
    },
    updateBookmarks(state, action) {
      const data = action.payload;
      state.bookmarks.push(...data);
    },
  },
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice;
