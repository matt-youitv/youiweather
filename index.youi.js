import React from 'react';
import { AppRegistry } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
//import { createStackNavigator } from "react-navigation-stack";

import { AddLocation } from 'components/AddLocation';
import { Lander } from 'components/Lander';
//import { WeatherInfo } from "components/WeatherInfo";

debugger

const AppNavigator = createStackNavigator(
  {
    Current: { screen: Lander }
    //Forecast: { screen: WeatherInfo }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: 125,
        backgroundColor: '#0a84ff'
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontSize: 25
      }
    }
  }
);

const ModalNavigator = createStackNavigator(
  {
    Current: { screen: AppNavigator },
    AddLocation: { screen: AddLocation }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

// This is not a React Component!
//const AppContainer = createAppContainer(ModalNavigator);

export default class App extends React.Component {
  render() {
    //return <AppContainer />;
    return <ModalNavigator />;
  }
}

AppRegistry.registerComponent('YiReactApp', () => App);