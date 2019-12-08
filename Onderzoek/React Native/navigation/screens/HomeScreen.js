import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import LogoTitle from "../components/LogoTitle";

const HomeScreen = props => {
  const [count, setCount] = useState(0);

  const increaseCountHandler = () => {
    setCount(curCount => curCount + 1);
  };

  useEffect(() => {
    props.navigation.setParams({ increaseCount: increaseCountHandler });
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <Text>Count:{count}</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          props.navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here"
          });
        }}
      />
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Home",
  headerLeft: () => (
    <Button onPress={() => navigation.navigate("MyModal")} title="Info" />
  ),
  headerRight: () => (
    <Button onPress={navigation.getParam("increaseCount")} title="+1" />
  )
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default HomeScreen;
