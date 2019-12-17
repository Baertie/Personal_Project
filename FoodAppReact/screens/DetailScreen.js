import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import DefaultText from "../components/DefaultText";
import Title from "../components/Title";

const DetailScreen = props => {
  const restantId = props.navigation.getParam("restantId");
  const selectedRestant = useSelector(state =>
    state.restanten.restanten.find(restant => restant.id === restantId)
  );

  return (
    <View style={styles.screen}>
      <Image style={styles.image} source={{ uri: selectedRestant.imageUrl }} />
      <View style={styles.infoContainer}>
        <Title title={selectedRestant.title} />
        <DefaultText text={selectedRestant.date} />
        <DefaultText text={selectedRestant.description} />
        <View style={styles.check}>
          <DefaultText text="Gluten vrij:" />
          {selectedRestant.isGlutenFree ? (
            <Ionicons
              style={styles.icon}
              name="ios-checkmark-circle"
              size={35}
              color="green"
            />
          ) : (
            <Ionicons
              style={styles.icon}
              name="ios-close-circle"
              size={35}
              color="red"
            />
          )}
        </View>
        <View style={styles.check}>
          <DefaultText text="Vegan:" />
          {selectedRestant.isVegan ? (
            <Ionicons
              style={styles.icon}
              name="ios-checkmark-circle"
              size={35}
              color="green"
            />
          ) : (
            <Ionicons
              style={styles.icon}
              name="ios-close-circle"
              size={35}
              color="red"
            />
          )}
        </View>
        <View style={styles.check}>
          <DefaultText text="Vegetarisch:" />

          {selectedRestant.isVegetarianFree ? (
            <Ionicons
              style={styles.icon}
              name="ios-checkmark-circle"
              size={35}
              color="green"
            />
          ) : (
            <Ionicons
              style={styles.icon}
              name="ios-close-circle"
              size={35}
              color="red"
            />
          )}
        </View>
        <View style={styles.check}>
          <DefaultText text="Lactose vrij:" />

          {selectedRestant.isLactoseFree ? (
            <Ionicons
              style={styles.icon}
              name="ios-checkmark-circle"
              size={35}
              color="green"
            />
          ) : (
            <Ionicons
              style={styles.icon}
              name="ios-close-circle"
              size={35}
              color="red"
            />
          )}
        </View>
      </View>
    </View>
  );
};

DetailScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("title")
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  infoContainer: {
    width: "80%",
    maxWidth: 400,
    height: "50%",
    maxHeight: 400,
    justifyContent: "space-around"
  },
  check: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "40%",
    marginVertical: 10
  },
  image: {
    width: "100%",
    height: "40%",
    maxHeight: 400
  },
  icon: {
    marginHorizontal: 10
  }
});

export default DetailScreen;
