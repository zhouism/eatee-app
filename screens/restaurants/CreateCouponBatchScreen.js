

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


import React from 'react';
import { Text, View, Button, TextInput } from "react-native";
import axios from 'axios';
import { ImagePicker } from 'expo';

export default class CreateCouponBatchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      image: null,
      
    };
  }

  static navigationOptions = {
    title: 'Create Your Ad Here',
  };

  componentDidMount(){
    console.log("Component Mounted")
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  // Save IMAGE, DISH NAME, DESC, TIMER, QUANTITY
  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        
      </View>
    )
  }
}
