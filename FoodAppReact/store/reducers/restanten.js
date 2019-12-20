import { MEALS } from "../../data/example-data";
import {
  SET_FILTERS,
  DELETE_RESTANT,
  CREATE_RESTANT,
  UPDATE_RESTANT,
  SET_RESTANTEN
} from "../actions/restantAction";
import Restant from "../../models/restant";

const initialState = {
  restanten: [],
  userRestanten: [],
  filteredRestanten: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RESTANTEN:
      return {
        restanten: action.restanten,
        userRestanten: action.userRestanten,
        filteredRestanten: action.restanten
      };
    case CREATE_RESTANT:
      const nieuweRestant = new Restant(
        action.restantData.id,
        action.restantData.ownerId,
        action.restantData.categorie,
        action.restantData.date,
        action.restantData.description,
        action.restantData.title,
        action.restantData.imageUrl,
        action.restantData.isGlutenFree,
        action.restantData.isVegan,
        action.restantData.isVegetarian,
        action.restantData.isLactoseFree
      );
      return {
        ...state,
        restanten: state.restanten.concat(nieuweRestant),
        userRestanten: state.userRestanten.concat(nieuweRestant)
      };
    case UPDATE_RESTANT:
      const restantIndex = state.userRestanten.findIndex(
        rest => rest.id === action.rid
      );
      const updatedRestant = new Restant(
        action.rid,
        state.userRestanten[restantIndex].ownerId,
        state.userRestanten[restantIndex].categorie,
        state.userRestanten[restantIndex].date,
        action.restantData.description,
        action.restantData.title,
        action.restantData.imageUrl,
        state.userRestanten[restantIndex].isGlutenFree,
        state.userRestanten[restantIndex].isVegan,
        state.userRestanten[restantIndex].isVegetarian,
        state.userRestanten[restantIndex].isLactoseFree
      );

      const updatedUserRestanten = [...state.userRestanten];
      updatedUserRestanten[restantIndex] = updatedRestant;

      const restIndex = state.restanten.findIndex(
        restant => restant.id === action.rid
      );

      const updatedRestants = [...state.restanten];
      updatedRestants[restIndex] = updatedRestant;

      return {
        ...state,
        restanten: updatedRestants,
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
        restanten: state.restanten.filter(restant => restant.id !== action.rid)
      };

    default:
      return state;
  }
  return state;
};
