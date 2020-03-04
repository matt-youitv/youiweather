import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";

import { Icon } from 'react-native-vector-icons';

export function AboutButton(props) {
  return (
    <View style={styles.buttonContainer}>
      <Text>
        Testing
      </Text>
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
  }
});
