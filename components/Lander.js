/**
 * Basic You.i RN app
 */
import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

//import { FontAwesome as AppIcon } from "@expo/vector-icons";

export default class Lander extends Component {

  static navigationOptions = {
    headerTitle: 'You.i Weather (Lander)',
    headerStyle: { backgroundColor: '#0A84FF' },
    headerLeft: () => (<Text>left</Text>)
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

