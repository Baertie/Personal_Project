import React from "react";
import { Text, StyleSheet } from "react-native";

const Title = props => {
  return <Text style={styles.titleText}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "open-sans-bold",
    fontSize: 20
  }
});

export default Title;
