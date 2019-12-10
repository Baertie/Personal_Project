import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import RestantList from "../components/RestantList";

const CategoryRestantenScreen = props => {
  const catId = props.navigation.getParam("categoryId");

  const availableRestanten = useSelector(
    state => state.restanten.filteredRestanten
  );

  const displayedRestanten = availableRestanten.filter(
    restant => restant.categoryIds.indexOf(catId) >= 0
  );

  if (displayedRestanten.length === 0) {
    return (
      <View style={styles.content}>
        <Text>Er zijn geen restjes in deze categorie</Text>
      </View>
    );
  }

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
