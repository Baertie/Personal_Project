import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Restant from "./Restant";

const RestantList = props => {
  const renderRestantItem = itemData => {
    return (
      <Restant
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        date={itemData.item.date}
        onSelectRestant={() => {
          props.navigation.navigate({
            routeName: "RestantDetail",
            params: {
              restantId: itemData.item.id,
              title: itemData.item.title
            }
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderRestantItem}
        style={{ width: "100%" }}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
});

export default RestantList;
