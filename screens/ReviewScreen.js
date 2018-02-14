import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";

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
      return (
        <Card key={job.jobkey}>
          <View style={{ height: 200 }}>
            <View style={styles.detailWrapper}>
              <Text style={styles.textStyle}>{job.company}</Text>
              <Text style={styles.textStyle}>{job.formattedRelativeTime}</Text>
            </View>
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
