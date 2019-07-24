import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  AsyncStorage
} from "react-native";

import { ActionCable, Cable } from "@kesha-antonov/react-native-action-cable";
//import ActionCable from 'react-native-actioncable'

const AUTH_TOKEN = "auth_token";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      //fetching: false,
      notifications: [],

      page: 0,
      hasMore: true,
      read: false
    };
  }

  componentDidMount() {
    // this.fetchNotifications();
    this.createSocket();
    // this.fetchNewNotification();
    //this.fetchNotifications();
  }

  createSocket() {
    const actionCable = ActionCable.createConsumer(
      "ws://bankss.herokuapp.com/cable"
    );

    ActionCable.startDebugging();
    const cable = new Cable({});

    const channel = cable.setChannel(
      `notification_channel`,
      actionCable.subscriptions.create({
        channel: "NotificationChannel"
      })
    );

    channel
      .on("connected", () => {
        console.log("connected");
        channel.send({ message: 'first notification' })
      })
      .on("received", data => {
        console.log("received", data.message);
      });

    setTimeout(() => {
      channel.send({ message: 'second notification' })
      setTimeout(() => {
        channel.send({ message: 'third notification' })
      }, 1000)
    }, 1000)
  }

  // createSocket() {
  //   let actionCable = ActionCable.createConsumer(
  //     "ws://notyy.herokuapp.com/cable"
  //   );

  //   this.chats = actionCable.subscriptions.create(
  //     {
  //       channel: "NotificationChannel"
  //     },
  //     {
  //       connected: () => {},
  //       received: data => {
  //         // this.props.getNotifications(AUTH_TOKEN);
  //         this.fetchNewNotification();
  //         //this.props.getPosts(AUTH_TOKEN);
  //       }
  //     }
  //   );
  // }

  /*
 randomKey = () => {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  };
  */

  fetchNewNotification = async (page = 0) => {
    let auth_token = await AsyncStorage.getItem(AUTH_TOKEN);
    fetch(`https://notyy.herokuapp.com/notifications`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Access: auth_token
      },
      params: { page }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ notifications: [], page: 0, loading: false });
      });
  };

  async infiniteNotification(page = 1) {
    try {
      let auth_token = await AsyncStorage.getItem(AUTH_TOKEN);
      const data = await makeRequest(
        `https://notyy.herokuapp.com/notifications?page=${page}`,
        { body: { page } },
        auth_token
      );
      var allData = this.state.notifications.concat(data.notifications);
      this.setState({
        notifications: allData,
        page: this.state.page + 1
      });
      const markedAsReadResponse = makeRequest(
        "https://notyy.herokuapp.com/notifications/mark_as_read",
        {
          method: "POST",
          body: {
            notification: { read: true }
          },
          auth_token
        }
      );
      this.props.changeNotifications();

      // TODO handle your errors
    } catch (e) {}
  }

  onPostShow = post => {
    this.props.navigation.navigate("PostShow", { post });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications) {
      this.setState(prevState => ({
        loading: false,
        fetching: false,
        page: prevState.page + 1,
        notifications: prevState.notifications.concat(nextProps.notifications)
      }));
    } else {
      this.setState({
        fetching: false
      });
    }
  }

  onNextPage = () => {
    if (this.state.fetching) {
      return;
    }
    this.setState(
      {
        fetching: true
      },
      () => this.infiniteNotification(this.state.page)
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",

          backgroundColor: "#CED0CE"
        }}
      />
    );
  };
  _renderItem = ({ item }) => {
    return (
      <View style={{ height: 100 }}>
        <Text onPress={() => this.onPostShow(item.post)}>
          {item.actor.username} {item.action}
          {item.notifiable_type} on {item.post.title}
        </Text>
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.notifications}
          keyExtractor={(_, index) => `item-${index}`}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this.onNextPage}
          onEndReachedThreshold={0.01}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    paddingTop: 10
  }
});

export default Notification;
