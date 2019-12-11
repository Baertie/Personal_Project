import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  Button,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as restantActions from "../../store/actions/restantAction";

const EditRestantScreen = props => {
  const restId = props.navigation.getParam("restantId");
  const editedRestant = useSelector(state =>
    state.restanten.userRestanten.find(restant => restant.id === restId)
  );

  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedRestant ? editedRestant.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedRestant ? editedRestant.imageUrl : ""
  );
  const [date, setDate] = useState("");

  const submitHandler = useCallback(() => {
    if (editedRestant) {
      dispatch(restantActions.updateRestant(restId, title, imageUrl));
    } else {
      dispatch(restantActions.createRestant(title, imageUrl, date));
    }
  }, [dispatch, restId, title, imageUrl, date]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>ImageUrl</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {editedRestant ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Vervaldatum</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={text => setDate(text)}
            />
          </View>
        )}
      </View>
    </ScrollView>
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
  },
  formControl: {
    width: "100%"
  },
  label: {
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1
  }
});

export default EditRestantScreen;
