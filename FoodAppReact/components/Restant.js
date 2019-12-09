import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const Restant = props => {
  return (
    <View>
      <TouchableOpacity onPress={props.onSelectRestant}>
        <Image source={{ uri: props.imageUrl }} />
        <Text>{props.title}</Text>
        <View>
          <Text>{props.date}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Restant;
