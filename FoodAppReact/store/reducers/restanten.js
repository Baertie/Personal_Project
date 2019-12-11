import { MEALS } from "../../data/example-data";
import {
  SET_FILTERS,
  DELETE_RESTANT,
  CREATE_RESTANT,
  UPDATE_RESTANT
} from "../actions/restantAction";
import Restant from "../../models/restant";

const initialState = {
  restanten: MEALS,
  userRestanten: MEALS.filter(prod => prod.ownerId === "u1"),
  filteredRestanten: MEALS
};

const restantenReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RESTANT:
      const nieuweRestant = new Restant(
        new Date().toString(),
        "u1",
        ["c1"],
        action.restantData.date,
        action.restantData.title,
        action.restantData.imageUrl,
        false,
        false,
        false,
        false
      );
      return {
        ...state,
        filteredRestanten: state.filteredRestanten.concat(nieuweRestant),
        userRestanten: state.userRestanten.concat(nieuweRestant)
      };
    case UPDATE_RESTANT:
      const restantIndex = state.userRestanten.findIndex(
        restant => restant.id === action.rid
      );
      const updatedRestant = new Restant(
        action.pid,
        state.userRestanten[restantIndex].ownerId,
        state.userRestanten[restantIndex].categoryIds,
        state.userRestanten[restantIndex].date,
        action.restantData.title,
        action.restantData.imageUrl,
        state.userRestanten[restantIndex].isGlutenFree,
        state.userRestanten[restantIndex].isVegan,
        state.userRestanten[restantIndex].isVegetarian,
        state.userRestanten[restantIndex].isLactoseFree
      );

      const updatedUserRestanten = [...state.userRestanten];
      updatedUserRestanten[restantIndex] = updatedRestant;

      const filteredRestantIndex = state.filteredRestanten.findIndex(
        restant => restant.id === action.rid
      );

      const updatedFilteredRestants = [...state.filteredRestanten];
      updatedFilteredRestants[filteredRestantIndex] = updatedRestant;

      return {
        ...state,
        filteredRestanten: updatedFilteredRestants,
        userRestanten: updatedUserRestanten
      };
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
    case DELETE_RESTANT:
      return {
        ...state,
        userRestanten: state.userRestanten.filter(
          restant => restant.id !== action.rid
        ),
        filteredRestanten: state.filteredRestanten.filter(
          restant => restant.id !== action.rid
        )
      };

    default:
      return state;
  }
  return state;
};

export default restantenReducer;
