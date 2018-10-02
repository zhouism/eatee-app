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
import axios from "axios";
import navigation from "react-navigation";
import { rootIP } from "react-native-dotenv";
import { RNS3 } from "react-native-aws3";
import { accessKeyId, secretAccessKey } from "react-native-dotenv";
import { connect } from "react-redux";
import * as actions from "../../actions";

class ModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      coupon: {},
      image: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      coupon: nextProps.coupon,
      image: nextProps.image
    });
  }

  saveCouponBatchToDB(coupon, image) {
    // console.log("saveCouponBatchtoDB function", coupon);
    // console.log("image", image);

    const file = {
      uri: image,
      name: new Date().toISOString() + "_" + coupon.dish_name + ".png",
      type: "image/png"
    };

    const options = {
      keyPrefix: "Images/",
      bucket: "eatee",
      region: "ca-central-1",
      accessKey: accessKeyId,
      secretKey: secretAccessKey,
      successActionStatus: 201
    };

    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      else {
        // console.log(response.body.postResponse.location);
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
         *   }
         * }
         */
        axios
          .post(
            `http://${rootIP}:3001/api/restaurants/${
              this.props.currentRestaurant
            }/coupon_batches`,
            {
              dish_name: coupon.dish_name,
              description: coupon.description,
              image: response.body.postResponse.location,
              timestamp: new Date().toISOString(),
              time_limit: coupon.time_limit,
              quantity: coupon.quantity,
              price: coupon.price,
              discount: coupon.discount,
              impression: 0
            }
          )
          .then(() => {
            this.props.savedDB();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
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
            <Image
              source={{ uri: this.state.image }}
              style={{ width: 300, height: 300 }}
            />
            <Text>Dish Name: {this.state.coupon.dish_name}</Text>
            <Text>Dish Description: {this.state.coupon.description}</Text>
            <Text>Time Limit: {this.state.coupon.time_limit}</Text>
            <Text>Number of Coupons Created: {this.state.coupon.quantity}</Text>
            <Text>Original Price: {this.state.coupon.price}</Text>
            <Text>Percentage Off: {this.state.coupon.discount}</Text>
            <Button
              onPress={() => {
                this.saveCouponBatchToDB(this.state.coupon, this.state.image);
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

export default connect(
  mapStateToProps,
  actions
)(ModalView);
