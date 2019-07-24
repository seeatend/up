import React, { Component } from "react";
import { View, Image } from "react-native";

class Icon extends Component {
  renderIcon = (iconName, color) => {
    iconName = this.props.iconName;
    color = this.props.color;
    return (
      <Image
        style={{ width: 20, height: 20 }}
        source={require(`/assets/icons/${exampleIcon}${color}.png`)}
      />
    );
  };

  render() {
    return <View>{this._renderIcon}</View>;
  }
}

export default Icon;
