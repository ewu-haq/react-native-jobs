import _ from "lodash";
import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import Slides from "../components/Slides";
import { AppLoading } from "expo";
const SLIDE_DATA = [
  { text: "Welcome to Jobapp", color: "#03A9F4" },
  { text: "set your location then swipe away", color: "#009688" }
];

class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    let token = await AsyncStorage.getItem("fb_token");

    if (token) {
      this.props.navigation.navigate("map");
      this.setState({ token });
    } else {
      this.setState({ token });
    }
  }

  // use onSlidesComplete() {} when you want to call .bind(this)
  // If not using .bind(this) we have to use this format
  onSlidesComplete = () => {
    this.props.navigation.navigate("auth");
  };

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
  }
}

export default WelcomeScreen;
