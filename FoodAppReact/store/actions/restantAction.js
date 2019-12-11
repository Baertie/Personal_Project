export const SET_FILTERS = "SET_FILTERS";
export const DELETE_RESTANT = "DELETE_RESTANT";
export const CREATE_RESTANT = "CREATE_RESTANT";
export const UPDATE_RESTANT = "UPDATE_RESTANT";

export const setFilters = filterSettings => {
  return {
    type: SET_FILTERS,
    filters: filterSettings
  };
};

export const deleteRestant = restantId => {
  return {
    type: DELETE_RESTANT,
    rid: restantId
  };
};

export const createRestant = (title, imageUrl, date) => {
  return {
    type: CREATE_RESTANT,
    restantData: {
      title,
      imageUrl,
      date
    }
  };
};

export const updateRestant = (id, title, imageUrl) => {
  return {
    type: UPDATE_RESTANT,
    rid: id,
    restantData: {
      title,
      imageUrl
    }
  };
};
