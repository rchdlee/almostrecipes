import IngredientItem from "./IngredientItem";
import classes from "./SearchIngredients.module.css";

import { useSelector } from "react-redux";

const SearchIngredients = () => {
  const ingredientList = useSelector((state) => state.search.ingredients);

  return (
    <ul className={classes.ingredients}>
      {ingredientList.map((ingredient) => (
        <IngredientItem
          name={ingredient.name}
          key={ingredient.id}
          id={ingredient.id}
        />
      ))}
    </ul>
  );
};

export default SearchIngredients;
