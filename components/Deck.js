import axios from 'axios';
import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { rootIP } from 'react-native-dotenv'


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const LIGHTHOUSE_IP = `http://${rootIP}:3001/api`;

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

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
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x: x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index]
    console.log('currentItem:',item);

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });

    if (direction === 'right') {
      this.getCouponAndUpdateQuanity(item);
    }
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
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

  //user may swipe RIGHT to grab coupon
  getCouponAndUpdateQuanity = async (coupon) => {
    console.log(`you took this coupon with ID: ${coupon.id}`);
    let firstCoupon = await axios.get(`${LIGHTHOUSE_IP}/coupon_batches/${coupon.id}/coupon_details`);
    let selectCouponID = firstCoupon.data.id;
    console.log('selectCouponID: ',selectCouponID);

    console.log(`adding coupon to this user ID ${this.props.curUser}`)
    await axios.post(`${LIGHTHOUSE_IP}/users/add/coupon/${selectCouponID}`,{
      facebook_id: this.props.curUser
    });
    console.log(`${selectCouponID} is added.`);
    console.log(`current quantity of this item is: ${coupon.quantity}`);
    let updateCouponQuantity = coupon.quantity - 1;
    console.log(`new quantity return is: ${updateCouponQuantity}`);
    await axios.post(`${LIGHTHOUSE_IP}/coupon_batches/${coupon.id}/quantity`, {
      quantity: updateCouponQuantity
    })
    console.log("quantity is updated");
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    return this.props.data.map((item, i) => {
      if (i < this.state.index) {
        return null;
      }
      if (i === this.state.index) {
        return (
          <Animated.View
            key={ item.id }
            style={[ this.getCardStyle(), styles.cardStyle, { zIndex: i * -1 } ]}
            { ...this.state.panResponder.panHandlers }
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={ item.id }
          style={[ styles.cardStyle, { top: 10 * (i - this.state.index) }, { zIndex: i * -1 } ]}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    })
  }

  render() {
    return (
      <View>
        <Text>Current User: {this.props.curUser}</Text>
        { this.renderCards() }
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH
  }
}

export default Deck;