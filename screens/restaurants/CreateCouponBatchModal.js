import React from "react";
import {
  Modal,
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import navigation from "react-navigation";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { rootIP } from 'react-native-dotenv'

class ModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      coupon: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      coupon: nextProps.coupon
    });
  }

  saveCouponBatchToDB(coupon) {
    console.log("saveCouponBatchtoDB function", coupon);
    axios
      .post(`http://${rootIP}:3001/api/restaurants/${this.props.currentRestaurant}/coupon_batches`, {
        dish_name: coupon.dish_name,
        description: coupon.description,
        image: 'https://s3-media1.fl.yelpcdn.com/bphoto/NCX50ST3Hjg7y8wTcwQXog/o.jpg',
        timestamp: new Date().toISOString(),
        time_limit: coupon.time_limit,
        quantity: coupon.quantity,
        price: coupon.price,
        discount: coupon.discount,
        impression: 0
      })
      .then(() => {
        this.props.savedDB();
      })
      .catch(function(error) {
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
        }}
      >
        <View>
          <View>
            <Text>Confirm your coupon</Text>
            <Text>Dish Name: {this.state.coupon.dish_name}</Text>
            <Text>Dish Description: {this.state.coupon.description}</Text>
            <Text>Time Limit: {this.state.coupon.time_limit}</Text>
            <Text>Number of Coupons Created: {this.state.coupon.quantity}</Text>
            <Text>Original Price: {this.state.coupon.price}</Text>
            <Text>Percentage Off: {this.state.coupon.discount}</Text>
            <Button
              onPress={() => {
                this.saveCouponBatchToDB(this.state.coupon);
              }}
              title="Confirm"
            />
            <Button
              onPress={() => {
                this.props.setModalVisible(false);
              }}
              title="Continue Editing"
            >
              <Text>Hide Modal</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

function mapStateToProps({ currentRestaurant }) {
  return { currentRestaurant };
}

export default connect(mapStateToProps, actions)(ModalView);

