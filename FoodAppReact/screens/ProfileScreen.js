import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Colors } from "react-native-paper";

const ProfileScreen = props => {
  return (
    <View style={styles.screen}>
      <Button
        title="Uitloggen"
        color={Colors.primaryColor}
        onPress={() => {}}
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
