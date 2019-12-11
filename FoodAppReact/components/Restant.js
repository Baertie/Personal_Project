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
      <TouchableOpacity onPress={props.onSelect}>
        <View style={props.style}>
          <ImageBackground
            source={{ uri: props.imageUrl }}
            style={{
              width: props.width,
              height: props.height
            }}
          />
          <Text>{props.title}</Text>
          <View>
            <Text>{props.date}</Text>
          </View>
          <View style={styles.buttons}>{props.children}</View>
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
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around"
  }
});

export default Restant;
