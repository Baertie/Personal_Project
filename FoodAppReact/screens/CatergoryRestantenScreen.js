import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { CATEGORIES, MEALS } from "../data/example-data";
import RestantList from "../components/RestantList";

const CategoryRestantenScreen = props => {
  const catId = props.navigation.getParam("categoryId");

  const displayedRestanten = MEALS.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  return (
    <RestantList listData={displayedRestanten} navigation={props.navigation} />
  );
};

CategoryRestantenScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("title")
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CategoryRestantenScreen;
