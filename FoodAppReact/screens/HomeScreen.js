import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          props.navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here"
          });
        }}
      />
      <Button
        title="categorie"
        onPress={() => {
          props.navigation.navigate("Category");
        }}
      />
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Home"
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default HomeScreen;
