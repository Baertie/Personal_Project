import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MessageScreen from "../screens/MessageScreen";
import UserRestantenScreen from "../screens/user/UserRestantenScreen";
import EditRestantScreen from "../screens/user/EditRestantScreen";
import FilterScreen from "../screens/FilterScreen";
import CategoryRestantenScreen from "../screens/CatergoryRestantenScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen"
};

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    CategoryRestanten: CategoryRestantenScreen,
    Filters: FilterScreen,
    RestantDetail: DetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FilterNavigator = createStackNavigator(
  {
    Filters: FilterScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);
const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);
const MessageNavigator = createStackNavigator(
  {
    Messages: MessageScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const ListNavigator = createStackNavigator(
  {
    List: UserRestantenScreen,
    EditRestant: EditRestantScreen,
    RestantDetail: DetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const AddNavigator = createStackNavigator(
  {
    AddRestant: EditRestantScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const tabScreenConfig = {
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Home</Text>
        ) : (
          "Home"
        )
    }
  },
  List: {
    screen: ListNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-list" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Lijst</Text>
        ) : (
          "Lijst"
        )
    }
  },
  Add: {
    screen: AddNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-create" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Add</Text>
        ) : (
          "Add"
        )
    }
  },
  Message: {
    screen: MessageNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-chatboxes" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Berichten</Text>
        ) : (
          "Berichten"
        )
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-contact" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Profiel</Text>
        ) : (
          "Profiel"
        )
    }
  }
};

const RestNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans"
          },
          activeTintColor: Colors.accentColor
        }
      });

const AuthNavigator = createStackNavigator(
  {
    auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Rest: RestNavigator
});

export default createAppContainer(MainNavigator);
