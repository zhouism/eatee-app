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
  Button,
  TextInput
} from "react-native";
import axios from "axios";
import { ImagePicker, Camera, Permissions } from "expo";
import t from "tcomb-form-native";

var Form = t.form.Form;

// here we are: define your domain model
var foodCoupon = t.struct({
  dish_name: t.String,
  price: t.Number,
  discount: t.Number,
  quantity: t.Number,
  time_limit: t.Number
});

var options = {}; // optional rendering options (see documentation)

export default class CreateCouponBatchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      image: null
    };
  }

  static navigationOptions = {
    title: "Create Your Ad Here"
  };

  componentDidMount() {
    console.log("Component Mounted");
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
  _clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  }

  onPress() {
    let value = this.refs.form.getValue();
    if (value) {
      console.log(value);
      // clear all fields after submit
      this._clearForm();
    }
  }

  // Save IMAGE, DISH NAME, DESC, TIMER, QUANTITY
  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        {/* display */}
        <Form ref="form" type={foodCoupon} options={options} />

        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}

        <TouchableHighlight
          style={styles.button}
          onPress={this.onPress}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = {
  container: {
    justifyContent: "center",
    marginTop: 50,
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
