import { searchActions } from "./search-slice";

// const API_KEY = "99db511d728249f5ad0abe33f7595916";
const API_KEY = "b45171df5bad47b38275c58262ae1409";

export const fetchRecipesData = (ingredients, count) => {
  const ingredientsFormatted = ingredients;
  const missingIngredientCount = count;
  return async (dispatch) => {
    const fetchData = async () => {
      console.log(ingredientsFormatted, missingIngredientCount);

      console.log("sending response");
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredientsFormatted}&ignorePantry=true&number=50`
      );
      console.log("response sent");

      if (!response.ok) {
        throw new Error("Could not fetch recipes list!");
      }

      const data = await response.json();
      console.log("data retrieved");

      const filteredRecipes = data.filter(
        (recipe) => recipe.missedIngredientCount <= missingIngredientCount
      );

      return filteredRecipes;

      // const DUMMY_RECIPE = [
      //   {
      //     id: 1,
      //     image: "https://spoonacular.com/recipeImages/648615-312x231.jpg",
      //     missingIngredientCount: 4,
      //     missedIngredients: ["fish", "soy sauce"],
      //     title: "Test recipe!",
      //   },
      // ];

      // return DUMMY_RECIPE;
    };
    try {
      const recipes = await fetchData();
      console.log(recipes);
      dispatch(searchActions.updateSearchResults(recipes));
      console.log("finished");
    } catch (error) {
      console.error(error);
    }
  };
};

// let filteredRecipes;

// useEffect(() => {
//   const paramObject = Object.fromEntries([...searchParams]);
//   console.log(paramObject);
//   if (Object.entries(paramObject).length === 0) {
//     return;
//   }
//   const ingredientsUnformatted = paramObject.ingredients;
//   const missingIngredientCount = paramObject.missingIngredientCount;
//   const ingredientsFormatted = ingredientsUnformatted.replaceAll(" ", ",");

//   console.log(ingredientsFormatted);

//   const sendRequestFromURL = async () => {
//     const response = await fetch(
//       `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredientsFormatted}&ignorePantry=true&number=50`
//     );
//     const data = await response.json();

//     filteredRecipes = data.filter(
//       (recipe) => recipe.missedIngredientCount <= missingIngredientCount
//     );
//     console.log(filteredRecipes);
//   };

//   sendRequestFromURL();
//   dispatch(searchActions.updateSearchResults(filteredRecipes));
// }, []);

export const updateSearchIngredients = (ingredients) => {
  console.log("updating search ingredients");
  const newIngredients = ingredients;
  return (dispatch) => {
    dispatch(searchActions.updateIngredientsList(newIngredients));
  };
};
