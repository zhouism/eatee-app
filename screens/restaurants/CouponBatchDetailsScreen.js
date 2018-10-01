import React from "react";
import {
  Modal,
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image
} from "react-native";
import axios from 'axios';
import { rootIP } from "react-native-dotenv";

export default class ModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      couponSwipe: ''
    };
  }

  componentDidMount() {
    const newItem = this.props.navigation.getParam('item')
    this.getCouponSwipe(newItem.id)
  }

  getCouponSwipe(coupon) {
   axios
    .get(`http://${rootIP}:3001/api/coupon_batches/${coupon}/swipe`)
    .then(response => {

      console.log('state change')
      console.log('response', (response.data)[0].count)
      this.setState({
        couponSwipe: (response.data)[0].count
      })
    }).catch(error => {
      console.log(error);
    });

  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    return (
      <ScrollView>
      <View>
          <View>
          <Image source={{uri: item.image}} style={{width: 400, height: 300}} />
            <Text>{this.props.navigation.item}</Text>
            <Text>Id: {item.id}</Text>
            <Text>Dish Name: {item.dish_name}</Text>
            <Text>Time Limit: {item.time_limit}</Text>
            <Text>Unit Price: ${(item.price * 1).toFixed(2)}</Text>
            <Text>Your Price: ${(item.price * (item.discount / 100)).toFixed(2)} </Text>
            <Text>Impression: {item.impression}</Text>
            <Text>Total Swipe: {this.state.couponSwipe}</Text>

          </View>
        </View>
      </ScrollView>
    );
  }
}
