import { AsyncStorage } from "react-native";
import User from "../../models/user";
// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_USERS = "SET_USERS";
export const CREATE_USER = "CREATE_USER";

let timer;

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://foodapp-567b3.firebaseio.com/users.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedUsers = [];

      for (const key in resData) {
        loadedUsers.push(
          new User(
            key,
            resData[key].ownerId,
            resData[key].firstName,
            resData[key].LastName
          )
        );
      }

      dispatch({
        type: SET_USERS,
        users: loadedUsers,
        user: loadedUsers.filter(user => user.ownerId === userId)
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPUYf8-8DIcmh_gfy4KUVFNEV1M1puv64`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application.json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Er is een fout opgetreden.";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Dit emailadres werd niet teruggevonden";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Het ingegeven wachtwoord is onjuist.";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    ).toISOString();
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPUYf8-8DIcmh_gfy4KUVFNEV1M1puv64`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application.json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Er is een fout opgetreden.";
      if (errorId === "EMAIL_EXISTS") {
        message = "Dit emailadres is al in gebruik";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    ).toISOString();
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate
    })
  );
};

export const createUser = (firstName, LastName) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://foodapp-567b3.firebaseio.com/users.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ownerId: userId,
          firstName,
          LastName
        })
      }
    );
    const restData = await response.json();

    dispatch({
      type: CREATE_USER,
      userData: {
        id: restData.firstName,
        ownerId: userId,
        firstName,
        LastName
      }
    });
  };
};
