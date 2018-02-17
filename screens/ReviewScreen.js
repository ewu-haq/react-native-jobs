import React, { Component } from "react";
import { View, Text, ScrollView, Linking, Platform } from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";
import { MapView } from "expo";

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Review Jobs",
      headerRight: (
        <Button
          title="Settings"
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0,122,255,1)"
          onPress={() => {
            navigation.navigate("settings");
          }}
        />
      )
    };
  };

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const {
        jobkey,
        jobtitle,
        company,
        formattedRelativeTime,
        url,
        longitude,
        latitude
      } = job;
      const { detailWrapper, textStyle } = styles;
      const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };
      return (
        <Card key={jobkey} title={jobtitle}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === "android"}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={detailWrapper}>
              <Text style={textStyle}>{company}</Text>
              <Text style={textStyle}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}

const styles = {
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  textStyle: {
    fontStyle: "italic"
  }
};

const mapStatToProp = state => {
  return {
    likedJobs: state.likeJobs
  };
};

export default connect(mapStatToProp, actions)(ReviewScreen);
