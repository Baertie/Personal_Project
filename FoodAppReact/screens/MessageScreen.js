import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";

const MessageScreen = props => {
  return (
    <View style={styles.screen}>
      <DefaultText text="Message Screen" />
    </View>
  );
};

MessageScreen.navigationOptions = {
  headerTitle: "Berichten"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default MessageScreen;
