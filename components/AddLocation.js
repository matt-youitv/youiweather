import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export class AddLocation extends Component {
  state = {
    city: "",
    submitting: false
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  onSubmit = () => {
    this.setState({ submitting: true });

    const { navigation } = this.props;
    navigation.state.params.onSubmit(this.state.city);
    navigation.goBack();
  };

  render() {
    const { submitting, city } = this.state;
    const shouldDisableSubmit = submitting || city.length === 0;
    console.log(
      `city is ${city}, should disable submit? ${shouldDisableSubmit}`
    );
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={this.goBack}>
          <Icon name="close" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Enter location name:</Text>

        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={city => this.setState({ city: city })}
          disabled={submitting}
        />

        {submitting && <ActivityIndicator size="large" />}

        <TouchableOpacity
          style={
            shouldDisableSubmit
              ? { ...styles.submitButton, ...styles.submitButtonDisabled }
              : styles.submitButton
          }
          onPress={this.onSubmit}
          disabled={shouldDisableSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 30,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 25,
    color: "#444",
    textAlign: "center",
    margin: 20
  },
  input: {
    height: 40,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 18
  },
  closeButton: {
    padding: 10
  },
  submitButton: {
    justifyContent: "center",
    marginBottom: 30,
    height: 60,
    width: 250,
    alignSelf: "center",
    backgroundColor: "#2196F3"
  },
  submitButtonDisabled: {
    opacity: 0.2
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    color: "white"
  }
});
