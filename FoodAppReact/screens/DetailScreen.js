import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const DetailScreen = props => {
  const { navigation } = props;

  return (
    <View style={styles.screen}>
      <Text>Detail Screen</Text>
      <Text>
        itemId: {JSON.stringify(navigation.getParam("RestantId", "NO-ID"))}
      </Text>
    </View>
  );
};

DetailScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("title")
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default DetailScreen;
