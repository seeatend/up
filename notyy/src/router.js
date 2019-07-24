import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Login from "./screens/Login";

import Home from "./screens/Home";
import Notification from "./screens/Notification";
const styles = {
  topcontainer: {
    flex: 1,
    flexDirection: "row"
  },

  applogocontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 15
  },
  applogo: {
    width: 150,
    height: 50
  }
};

const headerTitleStyle = {
  fontWeight: "300",

  color: "#333333",

  fontFamily: "Verdana",

  fontSize: 16
};

const headerStyle = {
  backgroundColor: "#F8F8F8",
  borderColor: "#ddd",
  borderBottomWidth: 1,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1
};

const headerSearch = {
  //marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

  height: 0
};

const cardStyle = {
  //marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

  backgroundColor: "red"
};

export const Logout = createStackNavigator({
  Login: {
    screen: Login,

    navigationOptions: {
      title: "Log In",
      headerTitleStyle,
      headerStyle
    }
  }
});

export const navigationOptions = ({ navigation }) => ({
  title: "Post",
  headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
});

export const Logged = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home"
    }
  },

  Notification: {
    screen: Notification,
    navigationOptions: {
      tabBarLabel: "Notification"
    }
  }
});
export const createRootNavigator = (isLogged = false) => {
  return createSwitchNavigator(
    {
      Logged: {
        screen: Logged
      },
      Logout: {
        screen: Logout
      }
    },
    {
      initialRouteName: isLogged ? "Logged" : "Logout"
    }
  );
};
