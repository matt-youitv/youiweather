import React, { Component } from "react";
import {
  View,
  Modal,
  TouchableHighlight,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import * as Device from "expo-device";

export class AboutOverlay extends Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.notificationVisible}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textLarge}>About</Text>
            <ScrollView>
              <View style={styles.textScrollContainer}>
                <Text style={styles.textMedium}>
                  Device Name: {Device.deviceName}
                </Text>
                <Text style={styles.textMedium}>
                  Device year: {Device.deviceYearClass}{" "}
                </Text>
                <Text style={styles.textMedium}>OS Name: {Device.osName}</Text>
                <Text style={styles.textMedium}>
                  Device Manifacturer: {Device.manufacturer}
                </Text>
                <Text style={styles.textMedium}>
                  OS Version: {Device.osVersion}
                </Text>
              </View>

              <Text style={styles.textSmall}>
                {"\n"}
                {"\n"}This is an app to check the weather in different regions
                and to view the current forcast. {"\n"}Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Morbi id leo lobortis,
                commodo tellus quis, porttitor massa. Proin lectus justo,
                pretium a turpis in, luctus rhoncus elit. Etiam feugiat, elit ac
                rhoncus rutrum, lectus tortor fermentum orci, ut pellentesque
                urna erat sollicitudin velit. Duis et ipsum justo. Nulla
                faucibus pharetra nulla, a pellentesque est dignissim in.
                Praesent blandit id leo et eleifend. Nulla vel tristique erat.
                Suspendisse lacinia, elit in posuere porta, orci elit fermentum
                felis, vitae eleifend est mi a ipsum. Aenean non velit ut elit
                pulvinar maximus ac pellentesque enim. Donec mattis odio a
                libero tincidunt interdum. Praesent convallis orci ligula, id
                gravida quam faucibus ac. Curabitur ante libero, consequat a
                ullamcorper id, consectetur vitae lectus. Aenean mollis sapien
                ex. Proin id tristique erat, vel viverra lacus. Maecenas et
                dignissim elit. Nam sagittis a erat vitae placerat. Donec eu
                lorem lectus. Sed non sem nec neque aliquam fermentum. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra,
                per inceptos himenaeos.
              </Text>
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={this.props.hideNotification}
              style={styles.buttonStyle}
            >
              <Text>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    marginTop: "25%",
    borderWidth: 3,
    borderRadius: 14,
    paddingTop: 60
  },
  textContainer: {
    marginTop: "15%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 120
  },
  textScrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },

  textLarge: { fontSize: 30 },
  textMedium: { fontSize: 15 },
  textSmall: { fontSize: 10 },
  buttonContainer: {
    marginTop: "5%",
    paddingTop: 5,

    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    marginTop: 40,
    backgroundColor: "white",
    height: 30,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 14
  }
});
