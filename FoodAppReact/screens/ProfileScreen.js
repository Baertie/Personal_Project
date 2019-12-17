import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Colors } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/authAction";

const ProfileScreen = props => {
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Button
        title="Uitloggen"
        color={Colors.primaryColor}
        onPress={() => {
          dispatch(authActions.logout);
          props.navigation.navigate("Auth");
        }}
      />
    </View>
  );
};

ProfileScreen.navigationOptions = {
  headerTitle: "Profile"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ProfileScreen;
