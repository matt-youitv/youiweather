/**
 * Basic You.i RN app
 */
import React, { Component } from "react";
import { AppRegistry } from "react-native";

import { createStackNavigator } from 'react-navigation';

import Lander from 'components/Lander' 


export default class App extends Component {
  render() {
    /* In the root component we are rendering the app navigator */
    return <AppNavigator />;
  }
}

const AppNavigator = createStackNavigator({
  Home: { screen: Lander }
});

AppRegistry.registerComponent('YiReactApp', () => App);