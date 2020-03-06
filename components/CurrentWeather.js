import React, { Component } from "react";
import {
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";

import * as AppConstants from "util/Constants";
import { fetchCurrentWeather } from "util/OpenWeatherService";
import { WeatherIcon } from "components/WeatherIcon";
import { CommonStyles } from "../styles";

export class CurrentWeather extends Component {
  RENDER_MODE = {
    cardView: "cardView",
    editView: "editView",
    errorView: "errorView"
  };

  state = {
    city: null,
    country: "",
    temp: "",
    temp_hi: "",
    temp_lo: "",
    humidity: "",
    weather_description: "",
    weather_icon: "",
    wind_speed: "",
    cloud_cover: "",
    error: null,
    fetching: false,
    lastRefreshed: Date.now(),
    renderMode: this.RENDER_MODE.cardView
  };

  fetchWeatherData = city => {
    this.setState({ fetching: true });
    fetchCurrentWeather(city)
      .then(responseJson => {
        this.setState({
          city: {
            ...this.props.city,
            name: responseJson.name,
            country: responseJson.sys.country
          },
          temp: responseJson.main.temp.toFixed(0),
          temp_hi: responseJson.main.temp_max.toFixed(0),
          temp_lo: responseJson.main.temp_min.toFixed(0),
          humidity: responseJson.main.humidity,
          weather_description: responseJson.weather[0].main,
          weather_icon: responseJson.weather[0].icon,
          wind_speed: responseJson.wind.speed,
          cloud_cover: responseJson.clouds.all,
          error: null,
          renderMode: this.RENDER_MODE.cardView,
          fetching: false,
          lastRefreshed: Date.now()
        });

        console.log(`Fetch completed: ${this.state}`);
        const { completionCallback } = this.props;
        completionCallback && completionCallback(city);
      })
      .catch(error => {
        this.setState({
          error: error.message,
          renderMode: this.RENDER_MODE.errorView,
          fetching: false
        });
      });
  };

  isGeoLocatedCity = () => {
    const { city } = this.state;
    return Boolean(city && city.lat && city.lat.length !== 0);
  };

  onPress = () => {
    !this.state.error &&
      this.props.navigation.navigate("Forecast", {
        city: this.state.city
      });
  };

  onLongPress = () => {
    this.setState({ renderMode: this.RENDER_MODE.editView });
  };

  onEditCancel = () => {
    const { error } = this.state;
    this.setState({
      renderMode: error ? this.RENDER_MODE.errorView : this.RENDER_MODE.cardView
    });
  };

  onEditDelete = () => {
    const { removeItemCallback, itemIndex } = this.props;
    this.setState({ fetching: true });
    removeItemCallback && removeItemCallback(itemIndex);
  };

  componentDidMount() {
    const { city } = this.props;
    console.log(`CurrentWeather did mount for ${JSON.stringify(city)}`);

    this.setState({ city: city });
    this.fetchWeatherData(city);
  }

  componentDidUpdate(prevProps, prevState) {
    const { updateTimestamp, city } = this.props;

    if (
      updateTimestamp >
      prevProps.updateTimestamp + AppConstants.FETCHING_THROTTLE_MS
    ) {
      this.fetchWeatherData(city);
    } else {
      console.log(`insufficient time has passed to issue a new data fetch`);
    }
  }

  renderCardView = () => {
    const {
      city,
      temp,
      weather_icon,
      weather_description,
      temp_lo,
      temp_hi,
      fetching
    } = this.state;
    console.log(`rendering card view for ${city.name}`);
    console.log(`~~~ ${Platform.OS} ~~~`);
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.onPress}
        onLongPress={this.onLongPress}
        disabled={fetching}
      >
        {fetching ? (
          <ActivityIndicator style={styles.spinner} size="large" />
        ) : (
          <View style={styles.buttonContent}>
            <View style={styles.temperatureContainer}>
              <Text style={[styles.topContainer, styles.temperatureText]}>
                {temp}˚C
              </Text>
              <WeatherIcon
                type={AppConstants.WEATHER_ICON_STYLE_2}
                name={weather_icon}
                color="white"
                size={50}
              />
            </View>
            <View style={styles.cityContainer}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.leftContainer, styles.titleText]}
              >
                {city.name}
              </Text>
              <View>
                <Text style={styles.mediumText}>{weather_description}</Text>
                <Text style={styles.smallText}>
                  {temp_lo} / {temp_hi}
                </Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  renderErrorView = () => {
    const { error, city } = this.state;
    console.log(`rendering error view for ${city.name}`);
    return (
      <TouchableOpacity
        style={styles.button}
        onLongPress={this.onLongPress}
        disabled={false}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderEditView = () => {
    console.log(`rendering edit view for ${this.state.city.name}`);
    const shouldDisableButton = this.isGeoLocatedCity();
    return (
      <View style={styles.editContainer}>
        <TouchableOpacity
          style={[
            CommonStyles.editButton,
            shouldDisableButton ? styles.disabledButton : {}
          ]}
          onPress={this.onEditDelete}
          disabled={shouldDisableButton}
        >
          <Text style={CommonStyles.editButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CommonStyles.editButton}
          onPress={this.onEditCancel}
        >
          <Text style={CommonStyles.editButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderByMode = () => ({
    cardView: this.renderCardView(),
    errorView: this.renderErrorView(),
    editView: this.renderEditView()
  });

  render() {
    const { renderMode, city } = this.state;

    console.log(
      `rendering CurrentWeather for city: ${JSON.stringify(
        city
      )}, mode: ${renderMode}`
    );

    return (
      city && (
        <View style={styles.parentContainer}>
          {this.renderByMode()[renderMode]}
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    alignSelf: "stretch",
    padding: 10,
    paddingTop: 10
  },
  spinner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  errorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 125,
    borderRadius: 5,
    backgroundColor: "#cc0000"
  },
  errorText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  editContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 125,
    borderRadius: 5,
    backgroundColor: "#F1F3F3",
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "#000000",
    shadowOpacity: 0.2
  },
  parentContainer: {
    alignSelf: "stretch",
    padding: 10,
    paddingTop: 10
  },
  buttonContent: {
    height: 125,
    borderRadius: 5,
    borderRadius: 5,
    shadowColor: NativeModules.PlatformConstants.platform === 'android' ? "#004300" : "#006BE6",
    shadowRadius: 2,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 1,
    flexDirection: "row",
    backgroundColor: NativeModules.PlatformConstants.platform === 'android' ?  "#009038" : "#249EFF"
  },
  temperatureContainer: {
    flex: 4,
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
    marginLeft: 15
  },
  temperatureText: {
    color: "#FFFFFF",
    fontSize: 45
  },
  cityContainer: {
    flex: 10,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  cityDetail: {
    flex: 3,
    alignItems: "flex-start",
    flexDirection: "row"
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left"
  },
  titleText: {
    fontSize: 35,
    color: "#FFFFFF"
  },
  mediumText: {
    fontSize: 25,
    color: "#FFFFFF"
  },
  smallText: {
    fontSize: 15,
    color: "#FFFFFF",
    marginTop: 15
  },
  disabledButton: {
    opacity: 0.2
  }
});
