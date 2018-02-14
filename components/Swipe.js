import React, { Component } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = Dimensions.get("window").width * 0.55;
const SWIPE_DURATION = 250;
class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    keyProp: "id"
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe("right");
          console.log("swipt right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe("left");
          console.log("swipt left");
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    //Android only, translate that if function is available, enable it
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    // next time component render, animate all movements
    LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x: x * 2, y: 0 },
      duration: SWIPE_DURATION
    }).start(() => {
      // this one will get called after animation is done
      this.onSwipeComplete(direction);
    });
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];
    const x = direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }

  resetPosition() {
    console.log("reset here");
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
      outputRange: ["-120deg", "0deg", "120deg"]
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    const { data, renderNoMoreCards, renderCard } = this.props;
    if (this.state.index >= data.length) {
      return renderNoMoreCards();
    }

    return data
      .map((item, i) => {
        if (i < this.state.index) {
          return null;
        }
        // stack first card on top
        const zIndeValue = { zIndex: i * -1 };
        const cascadeX = {
          top: 2 * (i - this.state.index),
          right: 1 * (i - this.state.index)
        };
        if (i === this.state.index) {
          return (
            <Animated.View
              key={item[this.props.keyProp]}
              style={[this.getCardStyle(), styles.cardStyle, zIndeValue]}
              {...this.state.panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item[this.props.keyProp]}
            style={[styles.cardStyle, zIndeValue, cascadeX]}
          >
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  }

  render() {
    console.log("render here");
    return <View>{this.renderCards()}</View>;
  }
}

const styles = {
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH
  }
};

export default Swipe;
