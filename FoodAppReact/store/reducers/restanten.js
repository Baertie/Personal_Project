import { MEALS } from "../../data/example-data";
import { SET_FILTERS } from "../actions/restantAction";

const initialState = {
  restanten: MEALS,
  filteredRestanten: MEALS
};

const restantenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredRestanten = state.restanten.filter(restant => {
        if (appliedFilters.glutenFree && !restant.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !restant.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegetarian && !restant.isVegetarian) {
          return false;
        }
        if (appliedFilters.vegan && !restant.isVegan) {
          return false;
        }
        return true;
      });
      return { ...state, filteredRestanten: updatedFilteredRestanten };
    default:
      return state;
  }
  return state;
};

export default restantenReducer;
