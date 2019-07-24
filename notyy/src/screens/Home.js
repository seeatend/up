import React, { Component } from "react";
import { View, Text, ScrollView, AsyncStorage } from "react-native";
import axios from "axios";
const AUTH_TOKEN = "auth_token";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.getPosts();
  }
  async getPosts() {
    // this.setState({showProgress: true})
    let auth_token = await AsyncStorage.getItem(AUTH_TOKEN);

    const response = await axios
      .get(`https://notyy.herokuapp.com/posts`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Access: auth_token
        }
      })

      .then(result => {
        this.setState({
          posts: result.data.posts
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setState({
        loading: false,
        posts: nextProps.posts
      });
    }
    if (this.props.filteredPosts !== nextProps.filteredPosts) {
      this.setState({
        loading: false,
        filteredPosts: nextProps.filteredPosts
      });
    }
  }

  onPostShow = post => {
    // alert(JSON.stringify(post));
    this.props.navigation.navigate("PostShow", { post });
  };

  render() {
    const data = this.state.posts;

    const posts = data.map(post => {
      return (
        <View key={post.id} style={styles.itemContainer}>
          <Text style={styles.text} onPress={() => this.onPostShow(post)}>
            {post.title}
          </Text>
        </View>
      );
    });

    return (
      <View>
        <ScrollView>{posts}</ScrollView>
      </View>
    );
  }
}

const styles = {
  itemContainer: {
    width: "100%",
    height: 50,
    marginTop: 10,
    justifyContent: "center"
  },
  text: {
    marginHorizontal: 15
  }
};

export default HomeScreen;
