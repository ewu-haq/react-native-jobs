import React, { Component } from "react";
import { View, Text, Platform, ScrollView, Dimensions } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";
import Swipe from "../components/Swipe";
import { MapView } from "expo";
import { Card, Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
class DeckScreen extends Component {
  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };
    return (
      <Card
        title={job.jobtitle}
        containerStyle={{ height: SCREEN_HEIGHT * 0.8 }}
      >
        <View>
          <View style={{ height: SCREEN_HEIGHT * 0.4 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === "android" ? true : false}
              initialRegion={initialRegion}
            />
          </View>
          <View style={styles.detailWrapper}>
            <Text> {job.company} </Text>
            <Text> {job.formattedRelativeTime} </Text>
          </View>
          <Text style={{ height: SCREEN_HEIGHT * 0.2 }}>
            {" "}
            {job.snippet.replace(/<b>/g, "").replace(/<\/b>/g, "")}{" "}
          </Text>
        </View>
      </Card>
    );
  }

  renderNoMoreCards() {
    return <Card title="No more jobs" />;
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp="jobkey"
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  }
};

const mapStateToProps = state => {
  return {
    jobs: state.jobs.results
  };
};

export default connect(mapStateToProps, actions)(DeckScreen);
