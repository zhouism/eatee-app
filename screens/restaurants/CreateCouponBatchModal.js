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

export default class ModalView extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     RestaurantAU: RestaurantAU,
  //   }
  // }

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
    axios
      .post("http://192.168.88.244:3001/api/coupon_batches/", {
        name: coupon.dish_name,
        timestamp: +new Date(),
        time_limit: coupon.time_limit,
        quantity: coupon.quantity,
        image: coupon.image,
        price: coupon.price,
        discount: coupon.discount
      })
      .then(() => {
        this.setState({
          modalVisible: false
        });
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
            <Text>Is this your restaurant?</Text>
            <Text>Restaurant: {this.state.coupon.name}</Text>

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
              title="Go Back"
            >
              <Text>Hide Modal</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}
