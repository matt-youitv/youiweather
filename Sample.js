/**
 * Basic You.i RN app
 */
import React, { Component } from "react";
import { Text, View } from "react-native";

export default class Sample extends Component {

  static navigationOptions = {
    title: 'Something!'
  };

  render() {
    return (
      <View>
        <Text>
          Hello, world!
        </Text>
      </View>
    );
  }
};