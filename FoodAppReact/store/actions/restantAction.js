import Restant from "../../models/restant";

export const SET_FILTERS = "SET_FILTERS";
export const DELETE_RESTANT = "DELETE_RESTANT";
export const CREATE_RESTANT = "CREATE_RESTANT";
export const UPDATE_RESTANT = "UPDATE_RESTANT";
export const SET_RESTANTEN = "SET_RESTANTEN";

export const fetchRestanten = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://foodapp-567b3.firebaseio.com/restanten.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedRestanten = [];

      for (const key in resData) {
        loadedRestanten.push(
          new Restant(
            key,
            resData[key].ownerId,
            resData[key].categorie,
            resData[key].date,
            resData[key].description,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].isGlutenFree,
            resData[key].isVegan,
            resData[key].isVegetarian,
            resData[key].isLactoseFree
          )
        );
      }

      dispatch({
        type: SET_RESTANTEN,
        restanten: loadedRestanten,
        userRestanten: loadedRestanten.filter(rest => rest.ownerId === userId)
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const setFilters = filterSettings => {
  return {
    type: SET_FILTERS,
    filters: filterSettings
  };
};

export const deleteRestant = restantId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await fetch(
      `https://foodapp-567b3.firebaseio.com/restanten/${restantId}.json?auth=${token}`,
      {
        method: "DELETE"
      }
    );
    dispatch({ type: DELETE_RESTANT, rid: restantId });
  };
};

export const createRestant = (
  title,
  categorie,
  imageUrl,
  date,
  description,
  isGlutenFree,
  isVegan,
  isVegetarian,
  isLactoseFree
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://foodapp-567b3.firebaseio.com/restanten.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          categorie,
          imageUrl,
          date,
          description,
          isGlutenFree,
          isVegan,
          isVegetarian,
          isLactoseFree,
          ownerId: userId
        })
      }
    );
    const restData = await response.json();

    dispatch({
      type: CREATE_RESTANT,
      restantData: {
        id: restData.name,
        title,
        categorie,
        imageUrl,
        date,
        description,
        isGlutenFree,
        isVegan,
        isVegetarian,
        isLactoseFree,
        ownerId: userId
      }
    });
  };
};

export const updateRestant = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://foodapp-567b3.firebaseio.com/restanten/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_RESTANT,
      rid: id,
      restantData: {
        title,
        imageUrl,
        description
      }
    });
  };
};
