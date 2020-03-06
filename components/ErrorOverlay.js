import React, { Component } from "react";
import {
  View,
  Modal,
  TouchableHighlight,
  Text,
  StyleSheet
} from "react-native";

export class ErrorOverlay extends Component {
  render() {
    const {
      notificationVisible,
      notificationMessage,
      hideNotification
    } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={notificationVisible}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.textLarge}>{notificationMessage}</Text>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={hideNotification}
              style={styles.buttonStyle}
            >
              <Text>Close warning</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 0,
    backgroundColor: "red",
    height: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  textLarge: { fontSize: 30 },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: "white",
    height: 30,
    width: "40%",
    justifyContent: "center",
    alignItems: "center"
  }
});
