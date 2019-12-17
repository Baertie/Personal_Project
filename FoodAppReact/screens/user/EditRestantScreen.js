import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  View,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Picker
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-native-datepicker";

import Input from "../../components/Input";
import ImageSelector from "../../components/ImageSelector";
import TypeSwitch from "../../components/typeSwitch";
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
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [categorie, setCategorie] = useState("c1");
  const [date, setDate] = useState(new Date().toISOString());

  const restId = props.navigation.getParam("restantId");
  const editedRestant = useSelector(state =>
    state.restanten.userRestanten.find(restant => restant.id === restId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedRestant ? editedRestant.title : "",
      categorie: "",
      imageUrl: editedRestant ? editedRestant.imageUrl : "",
      date: "",
      description: editedRestant ? editedRestant.description : "",
      isGlutenFree: "",
      isVegan: "",
      isVegetarian: "",
      isLactoseFree: ""
    },
    inputValidities: {
      title: editedRestant ? true : false,
      imageUrl: editedRestant ? true : false,
      description: editedRestant ? true : false
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
          formState.inputValues.imageUrl,
          formState.inputValues.description
        )
      );

      props.navigation.goBack();
    } else {
      dispatch(
        restantActions.createRestant(
          formState.inputValues.title,
          categorie,
          formState.inputValues.imageUrl,
          date,
          formState.inputValues.description,
          isGlutenFree,
          isVegan,
          isVegetarian,
          isLactoseFree
        )
      );

      props.navigation.navigate("Home");
    }
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
          <Input
            id="description"
            label="Omschrijving"
            errorText="Dit is geen geldige omschrijving!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedRestant ? editedRestant.description : ""}
            initValid={!!editedRestant}
            required
          />
          {editedRestant ? null : (
            <View style={styles.container}>
              <DatePicker
                style={{
                  width: "100%",
                  marginTop: 40,
                  borderColor: "black",
                  borderWidth: 1
                }}
                date={date} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="selecteer houdbaarheidsdatum"
                format="DD-MM-YYYY"
                minDate="16-12-2019"
                maxDate="01-01-2025"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={datum => {
                  setDate(datum);
                }}
              />
              <Picker
                selectedValue={categorie}
                onValueChange={itemValue => setCategorie(itemValue)}
              >
                <Picker.Item label="Italiaans" value="c1" />
                <Picker.Item label="Amerikaans" value="c2" />
                <Picker.Item label="Belgisch" value="c3" />
                <Picker.Item label="Mexicaans" value="c4" />
                <Picker.Item label="Japans" value="c8" />
                <Picker.Item label="Chinees" value="c9" />
                <Picker.Item label="Groenten" value="c5" />
                <Picker.Item label="Vlees" value="c6" />
                <Picker.Item label="Vis" value="c7" />
                <Picker.Item label="Fruit" value="c10" />
              </Picker>
              <TypeSwitch
                label="Gluten-free"
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
              />
              <TypeSwitch
                label="Lactose-free"
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
              />
              <TypeSwitch
                label="Vegan"
                state={isVegan}
                onChange={newValue => setIsVegan(newValue)}
              />
              <TypeSwitch
                label="Vegetarian"
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
              />
            </View>
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
