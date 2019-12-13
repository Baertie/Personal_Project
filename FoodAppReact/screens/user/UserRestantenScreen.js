import React from "react";
import { FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Restant from "../../components/Restant";
import Colors from "../../constants/Colors";

import * as restantActions from "../../store/actions/restantAction";

const UserRestantenScreen = props => {
  const userRestanten = useSelector(state => state.restanten.userRestanten);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={userRestanten}
      keyExtractor={(item, index) => {
        return item.id;
      }}
      renderItem={itemData => (
        <Restant
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          date={itemData.item.date}
          style={styles.itemContainer}
          width={382}
          height={135}
          onSelect={() => {
            props.navigation.navigate({
              routeName: "RestantDetail",
              params: {
                restantId: itemData.item.id,
                title: itemData.item.title
              }
            });
          }}
        >
          <Button
            color={Colors.accentColor}
            title="Edit"
            onPress={() => {
              props.navigation.navigate("EditRestant", {
                restantId: itemData.item.id
              });
            }}
          />
          <Button
            color={Colors.accentColor}
            title="Delete"
            onPress={() => {
              dispatch(restantActions.deleteRestant(itemData.item.id));
            }}
          />
        </Restant>
      )}
      style={{ width: "100%" }}
    />
  );
};

UserRestantenScreen.navigationOptions = {
  headerTitle: "Eigen Restjes"
};

const styles = StyleSheet.create({
  itemContainer: {
    width: 382,
    height: 216,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5
  }
});
export default UserRestantenScreen;
