import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { searchActions } from "../../store/search-slice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import classes from "./MissingIngredients.module.css";

const MissingIngredients = () => {
  const dispatch = useDispatch();
  const missingIngredientCountt = useSelector(
    (state) => state.search.missingIngredientCount
  );

  const missingIngSlider = useRef();
  const missingIngInput = useRef();

  // const [missingIngredientCount, setMissingIngredientCount] = useState(4);

  const sliderChangeHandler = function () {
    // setMissingIngredientCount(missingIngSlider.current.value);
    dispatch(
      searchActions.updateMissingIngredientCount(missingIngSlider.current.value)
    );
  };

  const inputChangeHandler = function () {
    // setMissingIngredientCount(missingIngInput.current.value);
    dispatch(
      searchActions.updateMissingIngredientCount(missingIngInput.current.value)
    );
  };

  return (
    <Fragment>
      <div className={classes["missing-ing-header"]}>
        <h4>Missing Ingredient Count</h4>
        <FontAwesomeIcon icon={faCircleQuestion} />
        <div className={classes.tooltip}>
          <p>
            Set the max number of missing ingredients in your recipe search! The
            max number of missing ingredients is 10.
          </p>
        </div>
      </div>
      <div className={classes["missing-ing-inputs"]}>
        <input
          type="range"
          min="0"
          max="10"
          value={missingIngredientCountt}
          onChange={sliderChangeHandler}
          ref={missingIngSlider}
        />
        <input
          type="number"
          value={missingIngredientCountt}
          onChange={inputChangeHandler}
          ref={missingIngInput}
        />
      </div>
    </Fragment>
  );
};

export default MissingIngredients;
