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
import CategoryRestantenScreen from "../screens/restanten/CategoryRestantenScreen.vue";
import AuthScreen from "../screens/user/AuthScreen.vue";
import StartupScreen from "../screens/StartupScreen.vue";

import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },

  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen"
};

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
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
    screen: HomeNavigator
  },
  List: {
    screen: ListNavigator
  },
  Add: {
    screen: AddNavigator
  },
  Message: {
    screen: MessageNavigator
  },
  Profile: {
    screen: ProfileNavigator
  }
};

const RestNavigator = createBottomTabNavigator(tabScreenConfig);

const AuthNavigator = createStackNavigator(
  {
    auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Rest: RestNavigator,
  Auth: AuthNavigator
});

const AppNavigator = createAppContainer(MainNavigator);

export default {
  components: { AppNavigator }
};
</script>
