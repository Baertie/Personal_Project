import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Profile Screen</Text>
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
