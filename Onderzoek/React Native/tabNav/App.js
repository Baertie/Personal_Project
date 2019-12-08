import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import DetailScreen from "./screens/DetailScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailScreen
});

const AboutStack = createStackNavigator({
  About: AboutScreen,
  Details: DetailScreen
});

const AppContainer = createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: HomeStack },
      About: { screen: AboutStack }
    },
    {
      /* Other configuration remains unchanged */
    }
  )
);

export default function App() {
  return <AppContainer />;
}
