import React from "react";
import {
  Modal,
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";
import axios from 'axios';

export default class ModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      item: {},
      is_redeemed: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      item: nextProps.item,
      is_redeemed: nextProps.item['is_redeemed']
    });
  }

  _redeemCoupon() { 
    axios.post(`http://192.168.0.191:3001/api/coupon_details/${this.state.item.id}`)
    .then(() =>  {
      this.setState({
        is_redeemed: true
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.props.setModalVisible(false);
          this.props.updateDB()
        }}
      >
        <View>
          <View>
          <Image source={{uri: this.state.item.image}} style={{width: 400, height: 300}} />
            <Text>Id: {this.state.item.id}</Text>
            <Text>Restaurant: {this.state.item.name}</Text>
            <Text>Restaurants Address: {this.state.item.address}</Text>
            <Text>Dish Name: {this.state.item.dish_name}</Text>
            <Text>Time Limit: {this.state.item.time_limit}</Text>
            <Text>Unit Price: ${(this.state.item.price * 1).toFixed(2)}</Text>
            <Text>Your Price: ${(this.state.item.price * (this.state.item.discount / 100)).toFixed(2)} </Text>
            <TouchableHighlight
              onPress={() => {
                this.props.setModalVisible(false);
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableHighlight>
            {this.state.is_redeemed ? 
            <Text>Your Coupon Has Been Redeemed</Text> : <Button onPress={() => this._redeemCoupon()} title="Redeem Coupon"/> }
          </View>
        </View>
      </Modal>
    );
  }
}
