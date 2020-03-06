import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
//import { FontAwesome as AppIcon } from "@expo/vector-icons";
import AppIcon from 'react-native-vector-icons/FontAwesome';
import NetInfo from "@react-native-community/netinfo";

checkNetwork = props => {
  try {
    NetInfo.fetch().then(network => {
      console.log("is network connected ", network.isConnected);
      network.isConnected
        ? props.onConnectionFound()
        : props.onConnectionLost();
    });
  } catch (err) {
    console.log("error getting network info", err);
  }
};

export function RefreshButton(props) {
  return (
    <View style={styles.buttonContainer}>
      {props.refreshing ? (
        <ActivityIndicator size="large" color="#f4f3e7" />
      ) : (
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            props.refreshDisabled ? styles.disabled : {}
          ]}
          onPress={() => checkNetwork(props)}
          disabled={props.refreshDisabled}
        >
          <AppIcon name="refresh" color="#f4f3e7" size={30} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    alignSelf: "center",
    margin: 5
  },
  buttonStyle: {
    padding: 5,
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f4f3e7"
  },
  disabled: {
    opacity: 0.2
  }
});
