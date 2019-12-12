import Restant from "../../models/restant";

export const SET_FILTERS = "SET_FILTERS";
export const DELETE_RESTANT = "DELETE_RESTANT";
export const CREATE_RESTANT = "CREATE_RESTANT";
export const UPDATE_RESTANT = "UPDATE_RESTANT";
export const SET_RESTANTEN = "SET_RESTANTEN";

export const fetchRestanten = () => {
  return async dispatch => {
    const response = await fetch(
      "https://foodapp-567b3.firebaseio.com/restanten.json"
    );
    const restData = await response.json();
    const loadedRestanten = [];

    for (const key in restData) {
      loadedRestanten.push(
        new Restant(
          key,
          "u1",
          ["c1"],
          restData[key].date,
          restData[key].title,
          restData[key].imageUrl,
          false,
          false,
          false,
          false
        )
      );
    }
    dispatch({ type: SET_RESTANTEN, restanten: loadedRestanten });
  };
};

export const setFilters = filterSettings => {
  return {
    type: SET_FILTERS,
    filters: filterSettings
  };
};

export const deleteRestant = restantId => {
  return async dispatch => {
    await fetch(
      `https://foodapp-567b3.firebaseio.com/restanten/${restantId}.json`,
      {
        method: "DELETE"
      }
    );
    dispatch({ type: DELETE_RESTANT, rid: restantId });
  };
};

export const createRestant = (title, imageUrl, date) => {
  return async dispatch => {
    const response = await fetch(
      "https://foodapp-567b3.firebaseio.com/restanten.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          imageUrl,
          date
        })
      }
    );
    const restData = await response.json();

    dispatch({
      type: CREATE_RESTANT,
      restantData: {
        id: restData.name,
        title,
        imageUrl,
        date
      }
    });
  };
};

export const updateRestant = (id, title, imageUrl) => {
  return async dispatch => {
    await fetch(`https://foodapp-567b3.firebaseio.com/restanten/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        imageUrl
      })
    });

    dispatch({
      type: UPDATE_RESTANT,
      rid: id,
      restantData: {
        title,
        imageUrl
      }
    });
  };
};
