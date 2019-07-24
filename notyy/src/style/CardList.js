import React, { Component } from "react";
import { ScrollView, Text, FlatList, View } from "react-native";
import axios from "axios";
import { CardDetail } from "./CardDetail";
import { createStackNavigator } from "react-navigation";


class CardList extends Component {
  state = { posts: [] };

  componentDidMount() {
    axios
      .get("https://rankss.herokuapp.com/all_posts")
      .then(response => this.setState({ posts: response.data.posts }));
  }



   onPostShow = (post) => {
    this.props.navigation.navigate('PostShow', { post });
  };

  renderPosts() {
    return this.state.posts.map(post => (
      <View key={post.title} 
       post={post} 
       title={post.title}
  
       onPress={() => this.onPostShow(post)} />

    ));
  }

  render() {
    //const { navigate } = this.props.navigation;
    
    console.log(this.state);

    //return <ScrollView>{this.renderPosts()}</ScrollView>;
    
 var posts = this.state.posts.map(post => {
      return (
        <View key={post.id}>
        
          <Text onPress={() => this.onPostShow(post)}>{post.title}</Text>
         
        </View>
      );
    });

    return <View>{posts}</View>;
  
  }
}

export default CardList;
