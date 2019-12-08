import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = props => (
  <Ionicons
    name={"ios-settings"}
    size={35}
    color={props.focused ? "tomato" : "grey"}
  />
);

const AboutScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>About Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate("Details")}
      />
      <Button
        title="Go to Home"
        onPress={() => props.navigation.navigate("Home")}
      />
    </View>
  );
};

AboutScreen.navigationOptions = {
  tabBarIcon: TabIcon
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AboutScreen;
