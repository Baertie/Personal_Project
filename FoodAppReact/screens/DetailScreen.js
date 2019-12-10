import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

import { MEALS } from "../data/example-data";

const DetailScreen = props => {
  const restantId = props.navigation.getParam("restantId");

  const selectedRestant = MEALS.find(restant => restant.id === restantId);

  return (
    <View>
      <Image source={{ uri: selectedRestant.imageUrl }} />
      <View>
        <Text>{selectedRestant.title}</Text>
        <Text>Vervaldatum:{selectedRestant.date}</Text>
        <Text>
          Gluten vrij:{selectedRestant.isGlutenFree ? "true" : "false"}
        </Text>
      </View>
    </View>
  );
};

DetailScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("title")
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default DetailScreen;
