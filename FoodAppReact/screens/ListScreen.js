import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ListScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>List Screen</Text>
    </View>
  );
};

ListScreen.navigationOptions = {
  headerTitle: "Lijst"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ListScreen;
