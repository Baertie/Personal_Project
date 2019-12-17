import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Text
} from "react-native";
import { useDispatch } from "react-redux";

import Input from "../../components/Input";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/authAction";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    },
    inputValidities: {
      email: false,
      password: false,
      firstName: false,
      lastName: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Er is een fout opgetreden", error, [{ text: "Oke" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Rest");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputId
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <View style={styles.authContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>LEFT.OVER</Text>
        </View>
        <View>
          {isSignup ? (
            <View>
              <Input
                id="firstName"
                label="Voornaam"
                labelStyle={styles.label}
                inputStyle={styles.input}
                keyboardType="default"
                required
                autoCapitalize="words"
                errorText="Geef je voornaam in"
                onInputChange={inputChangeHandler}
                initialValue=""
                color="white"
              />
              <Input
                id="lastName"
                label="Acternaam"
                labelStyle={styles.label}
                inputStyle={styles.input}
                keyboardType="default"
                required
                autoCapitalize="words"
                errorText="Geef je achternaam in"
                onInputChange={inputChangeHandler}
                initialValue=""
                color="white"
              />
            </View>
          ) : null}
          <Input
            id="email"
            label="E-mail"
            labelStyle={styles.label}
            inputStyle={styles.input}
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Geef een geldig emailadres in!"
            onInputChange={inputChangeHandler}
            initialValue=""
            color="white"
          />
          <Input
            id="password"
            label="wachtwoord"
            labelStyle={styles.label}
            inputStyle={styles.input}
            keyboardType="default"
            required
            secureTextEntry
            minLength={6}
            autoCapitalize="none"
            errorText="Geef een geldig password in!"
            onInputChange={inputChangeHandler}
            initialValue=""
            color="white"
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primaryColor} />
            ) : (
              <Button
                title={isSignup ? "Registreren" : "Inloggen"}
                color={Colors.WhiteColor}
                onPress={authHandler}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={`Ga naar ${isSignup ? "inloggen" : "registreren"}`}
              color={Colors.YellowColor}
              onPress={() => {
                setIsSignup(prevState => !prevState);
              }}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    height: "50%",
    maxHeight: 500,
    justifyContent: "space-around"
  },
  buttonContainer: {
    marginTop: 10
  },
  textContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 25,
    color: "white"
  },
  label: {
    color: "white"
  },
  input: {
    color: "white"
  }
});

export default AuthScreen;
