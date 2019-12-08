import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const DetailScreen = props => {
  const { navigation } = props;

  return (
    <View style={styles.screen}>
      <Text>Detail Screen</Text>
      <Text>
        itemId: {JSON.stringify(navigation.getParam("itemId", "NO-ID"))}
      </Text>
      <Text>
        otherParam:{" "}
        {JSON.stringify(navigation.getParam("otherParam", "default value"))}
      </Text>
      <Button
        title="Update the title"
        onPress={() => navigation.setParams({ otherParam: "Updated!" })}
      />
    </View>
  );
};

DetailScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("otherParam", "test")
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default DetailScreen;
