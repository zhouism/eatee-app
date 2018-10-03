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
import axios from "axios";
import { rootIP } from "react-native-dotenv";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from "react-native-material-cards";

export default class ModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      couponSwipe: ""
    };
  }

  componentDidMount() {
    const newItem = this.props.navigation.getParam("item");
    this.getCouponSwipe(newItem.id);
  }

  getCouponSwipe(coupon) {
    axios
      .get(`http://${rootIP}:3001/api/coupon_batches/${coupon}/swipe`)
      .then(response => {
        // console.log('state change')
        // console.log('response', (response.data)[0].count)
        this.setState({
          couponSwipe: response.data[0].count
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item");

    return (
      <ScrollView>
        <View>
          <View>
          <Card style={{ borderRadius: 10, overflow: 'hidden', borderWidth: 1.25, borderColor: '#d3d3d3'}}>
                    <CardImage source={{ uri: item.image }} resizeMode="cover" style={{shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2}}/>
                    <CardTitle title={item.dish_name} subtitle={item.description} />
                    <CardContent text={`Impressions: ${item.impression}\nNumber of Swipes: ${this.state.couponSwipe}`}/>
                  </Card>
          </View>
        </View>
      </ScrollView>
    );
  }
}
