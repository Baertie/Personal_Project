import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Restant from "../components/Restant";

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
    <FlatList
      data={displayedRestanten}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <Restant
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          date={itemData.item.date}
          style={styles.itemContainer}
          width={175}
          height={106}
          onSelect={() => {
            props.navigation.navigate({
              routeName: "RestantDetail",
              params: {
                restantId: itemData.item.id,
                title: itemData.item.title
              }
            });
          }}
        ></Restant>
      )}
      style={{ width: "100%" }}
      numColumns={2}
    />
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
  },
  itemContainer: {
    width: 175,
    height: 170,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5
  }
});

export default CategoryRestantenScreen;
