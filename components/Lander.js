/**
 * Basic You.i RN app
 */
"use strict";

import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, NativeModules } from 'react-native';
import { FormFactor } from "@youi/react-native-youi";

import { HeaderTitle } from 'components/HeaderTitle';
import { AboutButton } from 'components/AboutButton';
import { CurrentWeather } from 'components/CurrentWeather';
import { CommonStyles } from '../styles';

import AppIcon from 'react-native-vector-icons/FontAwesome';

export class Lander extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
  
    return {
      headerLeft: () => (
        <AppIcon style={styles.appIcon} name="sun-o" color="orange" size={40} />
      ),
      headerTitle: () => <HeaderTitle title="Expo Weather" />,
      headerRight: () => (
        <View style={styles.headerButtonContainer}>
          <AboutButton launchOverlay={() => params.setAboutOverlay(true)} />
        </View>
      )
    }
  };

  citiesList = [{"id":1,"name":"New York,us","lat":null,"lon":null},{"id":2,"name":"London,uk","lat":null,"lon":null},{"id":3,"name":"Moscow,ru","lat":null,"lon":null},{"id":4,"name":"Tokyo,jp","lat":null,"lon":null}];

  onAddCityPressed = () => {
    console.log("add a city");
    this.props.navigation.navigate("AddLocation", { onSubmit: this.onSubmit });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.citiesList}
          renderItem={({ item, index }) => (
            <CurrentWeather
              city={item}
              updateTimestamp={Date.now()}
              navigation={this.props.navigation}
              completionCallback={this.onCurrentWeatherUpdated}
              removeItemCallback={this.onRemove}
              itemIndex={index}
            />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal={FormFactor.isTV}
        />
        <TouchableOpacity
          style={[CommonStyles.editButton, styles.button]}
          onPress={this.onAddCityPressed}
        >
          <Text style={styles.buttonText}>Add City</Text>
        </TouchableOpacity>
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