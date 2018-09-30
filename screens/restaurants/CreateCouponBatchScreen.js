// This is how to upload an image to the AMAZON S3 server I've set up with Nima
// import { accessKeyId, secretAccessKey } from 'react-native-dotenv'
// ApiClient.init(accessKeyId, secretAccessKey)

// const AWS = require('aws-sdk');
// const fs = require('fs');
// const path = require('path');

// //configuring the AWS environment
// AWS.config.update({
//     accessKeyId: accessKeyId,
//     secretAccessKey: secretAccessKey
//   });

// const s3 = new AWS.S3();

// let filePath = "Headshot.jpg";

// //configuring parameters
// const params = {
//   Bucket: 'eatee',
//   Body : fs.createReadStream(filePath),
//   Key : "Images/"+Date.now()+"_"+path.basename(filePath)
// };

// s3.upload(params, function (err, data) {
//   //handle error
//   if (err) {
//     console.log("Error", err);
//   }

//   //success
//   if (data) {
//     console.log("Uploaded in:", data.Location);
//   }
// });

import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Button,
  Modal,
  TextInput
} from "react-native";
import axios from "axios";
import { ImagePicker, Camera, Permissions } from "expo";
import t from "tcomb-form-native";
import ModalView from "./CreateCouponBatchModal";

// Functions setting up the form

const Form = t.form.Form;

//Price and time limit field must be positive
const Positive = t.refinement(t.Number, function(n) {
  return n >= 0;
});

//Discount field must be percentage between 1-99
const Percent = t.refinement(t.Number, function(n) {
  return n > 0 && n < 100;
});

// Food coupon form fields with restrictions
const foodCoupon = t.struct({
  dish_name: t.String,
  description: t.String,
  price: Positive,
  discount: Percent,
  quantity: t.Number,
  time_limit: Positive
});

// Form options
const options = {
  fields: {
    price: {
      help: "What was the original price of this dish?",
      error: "Price must be a positive number"
    },
    discount: {
      help: "Percentage off the dish?",
      error: "Discount must be between 1% - 99"
    },
    quantity: {
      help: "How many coupons are you creating?"
    },
    time_limit: {
      help: "How many hours are these coupons available for?"
    }
  }
};

export default class CreateCouponBatchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      image: null,
      coupon: {},
      modalVisible: false
    };
  }

  static navigationOptions = {
    title: "Create Your Ad Here"
  };

  componentDidMount() {
    // give focus to the name textbox
    this.refs.form.getComponent("dish_name").refs.input.focus();
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  onPress() {
    let coupon = this.refs.form.getValue();
    if (coupon) {
      // console.log(coupon);
      this.setState({
        modalVisible: true,
        coupon: coupon
      });
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  navToCouponBatch() {
    this.setModalVisible(false);
    console.log("has connected to navToCouponBatch");
    this.props.navigation.navigate("CouponBatchesStack");
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <ModalView
            modalVisible={this.state.modalVisible}
            setModalVisible={vis => {
              this.setModalVisible(vis);
            }}
            coupon={this.state.coupon}
            savedDB={() => this.navToCouponBatch()}
          />
          <Form
            ref="form"
            type={foodCoupon}
            options={options}
            value={this.state.coupon}
          />

          <Button
            style={styles.button}
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}

          <TouchableHighlight
            style={styles.button}
            onPress={this.onPress.bind(this)}
            underlayColor="#99d9f4"
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff"
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
};
