<template>
  <app-navigator></app-navigator>
</template>

<script>
import { Ionicons } from "@expo/vector-icons";

import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createMaterialBottomTabNavigator
} from "vue-native-router";

import HomeScreen from "../screens/restanten/HomeScreen.vue";
import DetailScreen from "../screens/restanten/DetailScreen.vue";
import ProfileScreen from "../screens/user/ProfileScreen.vue";
import MessageScreen from "../screens/restanten/MessageScreen.vue";
import UserRestantenScreen from "../screens/user/UserRestantenScreen.vue";
import EditRestantScreen from "../screens/user/EditRestantScreen.vue";
import FilterScreen from "../screens/restanten/FilterScreen.vue";
import CategoryRestantenScreen from "../screens/restanten/CatergoryRestantenScreen.vue";
import AuthScreen from "../screens/user/AuthScreen.vue";
import StartupScreen from "../screens/StartupScreen.vue";

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

const AppNavigator = createAppContainer(MainNavigator);

export default {
  components: { AppNavigator }
};
</script>
