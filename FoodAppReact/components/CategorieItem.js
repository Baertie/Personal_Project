import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const CategorieItem = props => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={props.onSelect}>
        <View style={styles.Container}>
          <Image source={props.imageUrl} style={{ width: 65, height: 65 }} />
          <Text style={styles.text}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 80,
    height: 110,
    marginHorizontal: 10
  },
  Container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 12
  }
});

export default CategorieItem;
