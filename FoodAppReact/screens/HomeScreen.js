import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CategorieItem from "../components/CategorieItem";
import { CATEGORIES } from "../data/example-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import Restant from "../components/Restant";

import HeaderButton from "../components/HeaderButton";

import * as restantenActions from "../store/actions/restantAction";

const HomeScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const loadRestanten = useCallback(async () => {
    setIsLoading(true);
    await dispatch(restantenActions.fetchRestanten());
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    loadRestanten();
  }, [dispatch, loadRestanten]);

  useEffect(() => {
    const willFocusListener = props.navigation.addListener(
      "willFocus",
      loadRestanten
    );
    return () => {
      willFocusListener.remove();
    };
  }, [loadRestanten]);

  const restanten = useSelector(state => state.restanten.restanten);

  const renderCategoryItem = itemData => {
    console.log(itemData.item);
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
      <FlatList
        data={restanten}
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
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Home",
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Filter"
        iconName="ios-options"
        onPress={() => navigation.navigate({ routeName: "Filters" })}
      />
    </HeaderButtons>
  )
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

export default HomeScreen;
