import { AsyncStorage } from "react-native";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
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
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    ).toISOString();
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate
    })
  );
};
