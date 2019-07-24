import React, { Component } from "react";

import { View, Image, StyleSheet, Keyboard, TextInput, TouchableOpacity, Text } from "react-native";


class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        //<TouchableOpacity

          //style={{ paddingLeft: 0 }}

          //onPress={this.props.onBackPress}
        //>
          //<Icon style={{ marginLeft: 0, fontSize: 35 }} name="arrow-back" />
      //  </TouchableOpacity>
      //  <Item>
          //<Icon name="ios-search" />
          <TextInput
            placeholder="Search"
            onChangeText={this.props.onChangeText}
            value={this.props.searchText}
          />
        //  <TouchableOpacity  onPress={this.props.onClear}>
            //<Icon name="ios-close" />
          //</TouchableOpacity>
        //</Item>
        <TouchableOpacity  onPress={this.props.onSearch}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SearchBar;
