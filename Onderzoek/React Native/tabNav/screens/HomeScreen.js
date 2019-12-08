import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = props => (
  <Ionicons
    name={"md-home"}
    size={35}
    color={props.focused ? "tomato" : "grey"}
  />
);

const HomeScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <Button
        title="Go to About"
        onPress={() => props.navigation.navigate("About")}
      />
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate("Details")}
      />
    </View>
  );
};

HomeScreen.navigationOptions = {
  tabBarIcon: TabIcon
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default HomeScreen;
