import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Platform
} from "react-native";

const Restant = props => {
  return (
    <View style={styles.gridItem}>
      <TouchableOpacity onPress={props.onSelectRestant}>
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: props.imageUrl }}
            style={{
              width: 175,
              height: 106
            }}
          />
          <Text>{props.title}</Text>
          <View>
            <Text>{props.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21 ? "hidden" : "visible"
  },
  container: {
    borderRadius: 10,
    height: 170,
    width: 175,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5
  }
});

export default Restant;
