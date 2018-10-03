import axios from "axios";
import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  Alert,
  UIManager
} from "react-native";
import { Card, Button } from "react-native-elements";
import { rootIP } from "react-native-dotenv";
import { connect } from "react-redux";
import * as actions from "../actions";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const LIGHTHOUSE_IP = `http://${rootIP}:3001/api`;

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe("left");
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };

    this.likeOpacity = this.state.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    this.dislikeOpacity = this.state.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    });

    this.nextCardOpacity = this.state.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: [1, 0, 1],
      extrapolate: "clamp"
    });

    this.nextCardScale = this.state.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp"
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x: x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];
    console.log("current item:", item);

    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });

    if (direction === "right") {
      this.checkCouponLimit().then(data => {
        if (data < 5) {
          this.getCouponAndUpdateQuanity(item);
        } else {
          Alert.alert(
            "Limit Reach",
            "You can only have 5 coupons at a time.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
        this.updateImpression(item);
      });
    } else {
      this.updateImpression(item);
    }
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
      extrapolate: "clamp"
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  //Promise return number of coupons collected by current user.
  checkCouponLimit = async () => {
    let countCoupons = await axios.get(
      `${LIGHTHOUSE_IP}/coupon_details/users/${this.props.curUser}`
    );
    let numberOfCoupon = parseInt(countCoupons.data[0].count);
    return numberOfCoupon;
  };

  //user may swipe RIGHT to grab coupon
  getCouponAndUpdateQuanity = async coupon => {
    console.log(`you took this coupon with ID: ${coupon.id}`);
    let firstCoupon = await axios.get(
      `${LIGHTHOUSE_IP}/coupon_batches/${coupon.id}/coupon_details`
    );
    console.log("first coupon: ", firstCoupon.data);
    let selectCouponID = firstCoupon.data.id;
    console.log("selectCouponID: ", selectCouponID);

    console.log(`adding coupon to this user ID ${this.props.curUser}`);
    await axios.post(`${LIGHTHOUSE_IP}/users/add/coupon/${selectCouponID}`, {
      facebook_id: this.props.curUser
    });
    console.log(`${selectCouponID} is added.`);
    console.log(`current quantity of this item is: ${coupon.quantity}`);
    let updateCouponQuantity = coupon.quantity - 1;
    console.log(`new quantity return is: ${updateCouponQuantity}`);
    await axios.post(`${LIGHTHOUSE_IP}/coupon_batches/${coupon.id}/quantity`, {
      quantity: updateCouponQuantity
    });
    console.log("quantity is updated");
  };

  updateImpression = async coupon => {
    addImpression = coupon.impression + 1;
    await axios.post(
      `${LIGHTHOUSE_IP}/coupon_batches/${coupon.id}/impression`,
      {
        impression: addImpression
      }
    );
    console.log("impression is updated");
  };

  getDiscount(price, discount) {
    return (price - (price * discount) / 100).toFixed(2);
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return (
        <Card title="All Done!">
          <Text style={{ marginBottom: 10 }}>
            There's no more content here!
          </Text>
          <Button
            backgroundColor="#03A9F4"
            title="Get more!"
            onPress={() => {
              this.props.fetchCouponBatches();
            }}
          />
        </Card>
      );
    } else {
      return this.props.data.map((item, i) => {
        if (i < this.state.index) {
          return null;
        }
        if (i === this.state.index) {
          return (
            <Animated.View
              key={item.id}
              style={[
                this.getCardStyle(),
                styles.cardStyle,
                { zIndex: i * -1 }
              ]}
              {...this.state.panResponder.panHandlers}
            >
              <Animated.View
                style={{
                  opacity: this.likeOpacity,
                  transform: [{ rotate: "-30deg" }],
                  position: "absolute",
                  top: 50,
                  left: 20,
                  zIndex: 1000
                }}
              >
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: "green",
                    color: "black",
                    backgroundColor: "green",
                    fontSize: 28,
                    fontWeight: "900",
                    padding: 10
                  }}
                >
                  LIKE
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  opacity: this.dislikeOpacity,
                  transform: [{ rotate: "30deg" }],
                  position: "absolute",
                  top: 50,
                  right: 20,
                  zIndex: 1000
                }}
              >
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: "#FC4E3E",
                    color: "black",
                    backgroundColor: "#FC4E3E",
                    fontSize: 28,
                    fontWeight: "900",
                    padding: 10,
                    textShadowColor: "rgba(0, 0, 0, 0.75)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10
                  }}
                >
                  NOPE
                </Text>
              </Animated.View>
              {this.props.renderCard(item)}

              <Animated.View
                style={{
                  position: "absolute",
                  bottom: 110,
                  left: 10,
                  zIndex: 1000
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 35,
                    fontWeight: "900",
                    padding: 10,
                    textShadowColor: "rgba(0, 0, 0, 0.75)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10
                  }}
                >
                  {item.dish_name}
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  position: "absolute",
                  bottom: 75,
                  right: 10,
                  zIndex: 1000
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "900",
                    padding: 10,
                    marginBottom: 5,
                    textShadowColor: "rgba(0, 0, 0, 0.75)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10
                  }}
                >
                  {item.quantity} remaining
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  position: "absolute",
                  bottom: 75,
                  left: 10,
                  zIndex: 1000
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "900",
                    padding: 10,
                    textDecorationLine: "line-through",
                    textShadowColor: "rgba(0, 0, 0, 0.75)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10
                  }}
                >
                  ${item.price.toFixed(2)}
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  position: "absolute",
                  bottom: 45,
                  left: 10,
                  zIndex: 1000
                }}
              >
                <Text
                  style={{
                    color: "#FC4E3E",
                    fontSize: 23,
                    fontWeight: "900",
                    padding: 10,
                    textShadowColor: "rgba(0, 0, 0, 0.75)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10
                  }}
                >
                  NOW
                </Text>
              </Animated.View>

              <Animated.View
                style={{
                  position: "absolute",
                  bottom: 5,
                  left: 10,
                  zIndex: 1000
                }}
              >
                <Text
                  style={{
                    color: "#FC4E3E",
                    fontSize: 35,
                    fontWeight: "900",
                    padding: 10,
                    textShadowColor: "rgba(0, 0, 0, 0.75)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10
                  }}
                >
                  ${this.getDiscount(item.price, item.discount)}
                </Text>
              </Animated.View>

              <Animated.View
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  borderRadius: 20,
                  overflow: "hidden",
                  zIndex: 1000
                }}
              >
                <Text
                  style={{
                    borderWidth: 2,
                    borderColor: "#FC4E3E",
                    color: "white",
                    fontSize: 40,
                    fontWeight: "900",
                    padding: 10,
                    backgroundColor: "#FC4E3E",
                    textShadowColor: "rgba(0, 0, 0, 0.75)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10
                  }}
                >
                  {item.discount}% Off
                </Text>
              </Animated.View>
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={item.id}
            style={[
              styles.cardStyle,
              {
                zIndex: i * -1,
                opacity: this.nextCardOpacity,
                transform: [{ scale: this.nextCardScale }]
              }
            ]}
          >
            <Animated.View
              style={{
                opacity: 0,
                transform: [{ rotate: "-30deg" }],
                position: "absolute",
                top: 50,
                left: 40,
                zIndex: 1000
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "green",
                  color: "green",
                  fontSize: 28,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                LIKE
              </Text>
            </Animated.View>
            <Animated.View
              style={{
                opacity: this.dislikeOpacity,
                transform: [{ rotate: "30deg" }],
                position: "absolute",
                top: 50,
                right: 40,
                zIndex: 1000
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "#FC4E3E",
                  color: "#FC4E3E",
                  fontSize: 28,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                NOPE
              </Text>
            </Animated.View>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>{this.renderCards()}</View>
        <View style={{ height: 60 }} />
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 130,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
};

function mapStateToProps({ coupons }) {
  return { coupons };
}

export default connect(
  mapStateToProps,
  actions
)(Deck);
