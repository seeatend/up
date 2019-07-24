import React, { Component } from "react";
import { Text, StyleSheet, AsyncStorage } from "react-native";
import { Card, Button, CardSection, Input, Spinner } from "../style";

const AUTH_TOKEN = "auth_token";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",

      error: ""
    };
  }

  storeToken(responseData) {
    AsyncStorage.setItem(AUTH_TOKEN, responseData, err => {
      if (err) {
        console.log("Something went wrong");
        throw err;
      }

      console.log("Success");
    }).catch(err => {
      console.log("error is: " + err);
    });
  }

  async onLoginPressed() {
    // this.setState({showProgress: true})
    try {
      let response = await fetch("http://192.168.0.77:3001/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username
        })
      });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        let authToken = res;
        console.log(authToken);
        this.storeToken(authToken);

        this.props.navigation.navigate("Logged");
      } else {
        let error = res;
        throw error;
      }
    } catch (error) {
      this.setState({ error: error });
      console.log("Error" + error);
      // this.setState({ showProgress: false });
    }
    // this.props.navigation.navigate("Logged");
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Card>
        <CardSection>
          <Input
            onChangeText={text => this.setState({ username: text })}
            placeholder="Username"
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onLoginPressed.bind(this)}>Log in</Button>
        </CardSection>

        <Text style={styles.error}> {this.state.error} </Text>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    paddingTop: 10
  }
});

export default Login;
