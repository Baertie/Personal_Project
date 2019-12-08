import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CategoryScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Category Screen</Text>
    </View>
  );
};

CategoryScreen.navigationOptions = {
  headerTitle: "Categorie"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CategoryScreen;
