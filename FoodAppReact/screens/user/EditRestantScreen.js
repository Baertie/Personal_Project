import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Input from "../../components/Input";
import * as restantActions from "../../store/actions/restantAction";

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

const EditRestantScreen = props => {
  const restId = props.navigation.getParam("restantId");
  const editedRestant = useSelector(state =>
    state.restanten.userRestanten.find(restant => restant.id === restId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedRestant ? editedRestant.title : "",
      imageUrl: editedRestant ? editedRestant.imageUrl : "",
      date: ""
    },
    inputValidities: {
      title: editedRestant ? true : false,
      imageUrl: editedRestant ? true : false,
      date: editedRestant ? true : false
    },
    formIsValid: editedRestant ? true : false
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert(
        "Verkeerde gegevens!",
        "Bekijk de bijstaande foutmeldingen in het formulier.",
        [{ text: "Oke" }]
      );
      return;
    }
    if (editedRestant) {
      dispatch(
        restantActions.updateRestant(
          restId,
          formState.inputValues.title,
          formState.inputValues.imageUrl
        )
      );
      console.log("update");
    } else {
      dispatch(
        restantActions.createRestant(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.date
        )
      );
      console.log("create");
    }
    props.navigation.goBack();
  }, [dispatch, restId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Titel"
            errorText="Geef een geldige titel!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedRestant ? editedRestant.title : ""}
            initValid={!!editedRestant}
            required
          />
          <Input
            id="imageUrl"
            label="Afbeelding"
            errorText="Dit is geen geldige afbeelding!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedRestant ? editedRestant.imageUrl : ""}
            initValid={!!editedRestant}
            required
          />
          {editedRestant ? null : (
            <Input
              id="date"
              label="Vervaldatum"
              errorText="Geef een geldige vervaldatum!"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditRestantScreen.navigationOptions = navData => {
  const submitfn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("restantId")
      ? "Edit Restant"
      : "Add Restant",
    headerRight: <Button title="toevoegen" onPress={submitfn} />
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  }
});

export default EditRestantScreen;
