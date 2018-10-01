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
import { MapView } from "expo";
import { Marker } from "react-native-maps";
import axios from "axios";
import { rootIP } from "react-native-dotenv";

export default class CouponDetailScreen extends React.Component {
  
  _redeemCoupon(itemid) {
    axios
      .post(`http://${rootIP}:3001/api/coupon_details/redeem/${itemid}`)
      .then(() => {
        this.props.navigation.navigate('CouponList')
      })
      .catch(function(error) {
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
            <Image
              source={{ uri: item.image }}
              style={{ width: 400, height: 300 }}
            />
            <Text>Id: {item.id}</Text>
            <Text>Restaurant: {item.name}</Text>
            <Text>Restaurants Address: {item.address}</Text>
            <Text>Dish Name: {item.dish_name}</Text>
            <Text>Time Limit: {item.time_limit}</Text>
            <Text>Unit Price: ${(item.price * 1).toFixed(2)}</Text>
            <Text>
              Your Price: ${(item.price * (item.discount / 100)).toFixed(2)}{" "}
            </Text>
            {item.latitude && (
              <MapView
                style={{ width: 400, height: 300 }}
                initialRegion={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005
                }}
              >
                <Marker
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude
                  }}
                />
              </MapView>
            )}
            {item.is_redeemed ? (
              <Text>Your Coupon Has Been Redeemed</Text>
            ) : (
              <Button
                onPress={() => this._redeemCoupon(item.id)}
                title="Redeem Coupon"
              />
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}
