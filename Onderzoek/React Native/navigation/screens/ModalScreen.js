import React from "react";
import { View, Text, Button } from "react-native";

const ModalScreen = props => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => props.navigation.goBack()} title="Dismiss" />
    </View>
  );
};

export default ModalScreen;
