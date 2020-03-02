/**
 * Basic You.i RN app
 */
import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

//import { FontAwesome as AppIcon } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Lander extends Component {

  static navigationOptions = {
    headerTitle: 'You.i Weather (Lander)',
    headerTitleStyle: { color: '#FFF' },
    headerStyle: { backgroundColor: '#0A84FF' },
    headerLeft: () => (<Icon style={styles.appIcon} name='sun-o' color='orange' size={40} />)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 30,
    backgroundColor: "#fff"
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#eee"
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    alignContent: "center",
    height: 60,
    marginLeft: 40,
    marginRight: 40
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  titleText: {
    padding: 10,
    fontSize: 40,
    textAlign: "center"
  },
  appIcon: {
    paddingLeft: 20,
    alignSelf: "center"
  },
  refreshIcon: {
    alignSelf: "center"
  },
  headerButtonContainer: {
    flexDirection: "row"
  }
});