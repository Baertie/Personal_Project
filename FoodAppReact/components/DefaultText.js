import React from "react";
import { Text, StyleSheet } from "react-native";

const DefaultText = props => {
  return <Text style={styles.basicText}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  basicText: {
    fontFamily: "open-sans",
    fontSize: 15
  }
});

export default DefaultText;
