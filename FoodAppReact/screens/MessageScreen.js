import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const MessageScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Message Screen</Text>
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
