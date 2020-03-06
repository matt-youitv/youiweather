import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function HeaderTitle(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 10,
    fontSize: 32,
    color: "#FFFFFF",
    alignContent: "center",
    alignSelf: "center"
  }
});
