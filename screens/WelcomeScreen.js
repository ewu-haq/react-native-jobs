import React, { Component } from "react";
import { View, Text } from "react-native";
import Slides from "../components/Slides";

const SLIDE_DATA = [
  { text: "Welcome to Jobapp", color: "#03A9F4" },
  { text: "set your location then swipe away", color: "#009688" }
];

class WelcomeScreen extends Component {
  // use onSlidesComplete() {} when you want to call .bind(this)
  // If not using .bind(this) we have to use this format
  onSlidesComplete = () => {
    this.props.navigation.navigate("auth");
  };

  render() {
    return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
  }
}

export default WelcomeScreen;
