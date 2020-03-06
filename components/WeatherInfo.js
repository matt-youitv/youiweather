import React, { Component } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import * as AppConstants from "util/Constants";
import { fetchWeatherForecast } from "util/OpenWeatherService";
import { AboutButton } from "components/AboutButton";
import { AboutOverlay } from "components/AboutOverlay";
import { ErrorOverlay } from "components/ErrorOverlay";
import { ForecastInterval } from "components/ForecastInterval";
import { HeaderTitle } from "components/HeaderTitle";
import { RefreshButton } from "components/RefreshButton";

export class WeatherInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const formattedTitle = `${params.city.name}`;

    return {
      headerTitle: () => <HeaderTitle title={formattedTitle} />,
      headerRight: () => (
        <View style={styles.headerButtonContainer}>
          <AboutButton launchOverlay={() => params.setAboutOverlay(true)} />
          <RefreshButton
            onConnectionFound={params.handleRefresh}
            onConnectionLost={() => params.setNotification(true)}
            refreshing={params.refreshing}
          />
        </View>
      ),
      headerTitleStyle: {
        fontSize: 18
      }
    };
  };

  state = {
    city: null,
    weatherForecast: [],
    notificationVisible: false,
    aboutVisible: false,
    error: null
  };

  setNotification = (
    feedback,
    msg = AppConstants.ERROR_MESSAGE_LOST_CONNECTION
  ) => {
    this.setState({
      notificationVisible: feedback,
      error: feedback ? msg : ""
    });
  };

  setAboutOverlay = feedback => {
    this.setState({ aboutVisible: feedback });
  };

  fetchForecast = city => {
    fetchWeatherForecast(city)
      .then(responseJson => {
        console.log(`fetched forecast for ${responseJson.city}`);
        this.setState({
          weatherForecast: responseJson.list,
          city: responseJson.city
        });
        this.props.navigation.setParams({
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({
          error: error.message,
          notificationVisible: true
        });
      });
  };

  restructureData = data => {
    let restructured = [];
    restructured.push({ type: "temps", data: data.main });
    restructured.push({ type: "conditions", data: data.weather[0] });
    restructured.push({ type: "humidity", data: data.main.humidity });
    restructured.push({ type: "clouds", data: data.clouds });
    restructured.push({ type: "wind", data: data.wind });
    return restructured;
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.navigation.setParams({
      refreshing: true
    });
    this.fetchForecast(this.state.city);
  };

  componentDidMount() {
    const { city } = this.props.navigation.state.params;
    this.setState({ city: city });
    this.props.navigation.setParams({ city: city });

    console.log(
      `WeatherInfo did mount: params = ${JSON.stringify(
        this.props
      )}, state = ${JSON.stringify(this.state)}`
    );
    this.props.navigation.setParams({
      handleRefresh: this.onRefresh,
      refreshing: false,
      setNotification: this.setNotification,
      setAboutOverlay: this.setAboutOverlay
    });

    this.fetchForecast(city);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(`Received new props = ${JSON.stringify(this.props)}`);

    this.props.updateTimestamp >
    prevProps.updateTimestamp + AppConstants.FETCHING_THROTTLE_MS
      ? this.fetchForecast(this.state.city)
      : console.log(`insufficient time has passed to issue a new data fetch`);
  }

  render() {
    console.log(`rendering WeatherInfo, state = ${JSON.stringify(this.state)}`);

    const {
      city,
      weatherForecast,
      notificationVisible,
      aboutVisible,
      error
    } = this.state;

    return (
      city && (
        <View style={styles.parentContainer}>
          <ErrorOverlay
            hideNotification={() => this.setNotification(false)}
            notificationVisible={notificationVisible}
            notificationMessage={error}
          />
          <AboutOverlay
            hideNotification={() => this.setAboutOverlay(false)}
            notificationVisible={aboutVisible}
          />
          <View>
            <FlatList
              data={weatherForecast}
              renderItem={({ item, index }) => (
                <ForecastInterval
                  timeStamp={item.dt * 1000}
                  data={this.restructureData(item)}
                />
              )}
              keyExtractor={item => item.dt.toString()}
            />
          </View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  loactionContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    paddingTop: 30,
    height: 100,
    backgroundColor: "#eee",
    alignSelf: "stretch"
  },
  locationText: {
    padding: 10,
    fontSize: 30,
    textAlign: "center"
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#eee"
  },
  parentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  titleText: {
    padding: 10,
    fontSize: 40,
    textAlign: "center"
  },
  appIcon: {
    alignSelf: "center"
  },
  refreshIcon: {
    alignSelf: "center"
  },
  headerButtonContainer: {
    flexDirection: "row"
  }
});
