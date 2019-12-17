import React from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import DefaultText from "../components/DefaultText";

import Colors from "../constants/Colors";

const typeSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <DefaultText text={props.label} />
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 15
  }
});

export default typeSwitch;
