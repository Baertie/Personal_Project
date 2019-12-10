import React from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";

import CategorieItem from "../components/CategorieItem";
import { CATEGORIES } from "../data/example-data";

const HomeScreen = props => {
  const renderCategoryItem = itemData => {
    return (
      <CategorieItem
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "CategoryRestanten",
            params: {
              categoryId: itemData.item.id,
              title: itemData.item.title
            }
          });
        }}
      />
    );
  };
  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        horizontal={true}
      />
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Home",
  headerRight: (
    <Button
      title="Filt"
      onPress={() => navigation.navigate({ routeName: "Filters" })}
    />
  )
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default HomeScreen;
