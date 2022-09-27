import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { recipeActions } from "../../store/recipe-slice";

import RecipeHero from "./RecipeHero";
import RecipeDetails from "./RecipeDetails";
import { TailSpin } from "react-loader-spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Recipe.module.css";

import { fetchRecipeInfo } from "../../store/recipe-actions";
import { API_KEY } from "../Helpers/constants";

const Recipe = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  // console.log(location);

  const id = location.pathname.slice(8);

  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    // console.log("useeffect from recipe ran 🍴");
    const fetchData = async () => {
      try {
        // console.log("fetching data");
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`,
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            "Something went wrong when fetching recipe data. Please try again later!"
          );
        }
        const data = await response.json();

        // console.log(data);
        fetchRecipeInfo(data);
        dispatch(recipeActions.addRecipeData(data));
        setIsLoading(false);
      } catch (error) {
        setFetchError(true);
        setIsLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, [id, fetchRecipeInfo]);

  const backBtnClickHandler = () => {
    navigate(-1);
  };

  const fetchErrorMessage = () => {
    return (
      <div className={classes["fetch-error-message"]}>
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p>
          Something went wrong when fetching this recipe's data. Please try
          again later!
        </p>
      </div>
    );
  };

  if (isLoading && !fetchError) {
    return (
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
    );
  }

  if (fetchError) {
    return fetchErrorMessage();
  }

  return (
    <div className={classes["recipe-container"]}>
      <a href="http://localhost:3000/search" className={classes.link}>
        <div className={classes["back-btn"]} onClick={backBtnClickHandler}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <p>Back</p>
        </div>
      </a>
      <RecipeHero />
      {/* <div className={classes.divider}>
        <FontAwesomeIcon icon={faMinus} />
      </div> */}
      <hr
        style={{
          width: 25,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 64,
        }}
      />
      <RecipeDetails />
    </div>
  );
};

export default Recipe;
