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
              height: props.height,
              borderRadius: 10
            }}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <View>
              <Text style={styles.text}>{props.date}</Text>
            </View>
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
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 15
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 12
  },
  infoContainer: {
    marginLeft: 10
  }
});

export default Restant;
