import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import moment from "moment";

export class ForecastInterval extends Component {
  cardText = text => {
    return (
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        ellipsizeMode="clip"
        style={styles.cardText}
      >
        {text}
      </Text>
    );
  };

  formatTime = timeStamp => {
    const millisFromNow = timeStamp - moment();
    return moment()
      .add(millisFromNow, "milliseconds")
      .calendar();
  };

  renderForecastItemByType = data => ({
    temps: this.cardText(`${data.temp && data.temp.toFixed()}˚C`),
    conditions: this.cardText(`${data.description}`),
    clouds: this.cardText(`Clouds: ${data.all}%`),
    humidity: this.cardText(`Humidity: ${data}%`),
    wind: this.cardText(`Wind: ${data.speed && data.speed.toFixed()}km/h`)
  });

  renderForecastItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        {this.renderForecastItemByType(item.data)[item.type]}
      </View>
    );
  };

  render() {
    console.log(
      `rendering ForecastInterval: props = ${JSON.stringify(this.props)}`
    );

    const { timeStamp, data } = this.props;

    return (
      <View style={styles.list}>
        <Text style={styles.dateText}>{this.formatTime(timeStamp)}</Text>

        <FlatList
          data={data}
          renderItem={this.renderForecastItem}
          keyExtractor={item => item.type}
          horizontal={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: 180,
    margin: 10,
    marginBottom: 15,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: Platform.OS === "ios" ? "#006BE6" : "#004300",
    shadowRadius: 2,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 1,
    flexDirection: "row",
    backgroundColor: Platform.OS === "ios" ? "#249EFF" : "#009038"
  },
  list: {
    height: Platform.OS === "ios" ? 125 : 140,
    margin: 5,
    padding: 5,
    backgroundColor: "#EBEBEB"
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center"
  },
  cardText: {
    fontSize: 24,
    color: "#FFFFFF"
  }
});
