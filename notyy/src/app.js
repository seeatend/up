import React, { Component } from "react";

import { AsyncStorage } from "react-native";

import { createRootNavigator } from "./router";
import { Container } from "./style";

import Reactotron from "reactotron-react-native";

const AUTH_TOKEN = "auth_token";

class App extends Component {
  state = {
    isLogged: null
  };

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    try {
      let authToken = await AsyncStorage.getItem(AUTH_TOKEN);
      if (!authToken) {
        console.log("Token not set");
        this.setState({ isLogged: false });
      } else {
        this.setState({ isLogged: true });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  }

  render() {
    const { isLogged } = this.state;
    Reactotron.configure({
      name: "Demo App",
      host: "10.0.3.2",
      port: 9090,
      enabled: true
    });
    // Reactotron.use(trackGlobalErrors())

    //Reactotron.use(asyncStorage())

    Reactotron.useReactNative();

    Reactotron.connect();

    // If we haven't checked AsyncStorage yet.
    if (isLogged === null) {
      return null;
    }

    const Layout = createRootNavigator(isLogged);
    return (
      <Container>
        <Layout />
      </Container>
    );
  }
}

export default App;
