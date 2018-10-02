import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
import { MapView } from "expo";
import { Marker } from "react-native-maps";
import axios from "axios";
import { rootIP } from "react-native-dotenv";
import { Ionicons } from "@expo/vector-icons";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from "react-native-material-cards";

export default class CouponDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Ionicons
          name="md-list"
          size={32}
          color="red"
          style={{ padding: 10}}
          onPress={() => navigation.goBack()}
        />
      )
    };
  };

  _redeemCoupon(itemid) {
    axios
      .post(`http://${rootIP}:3001/api/coupon_details/redeem/${itemid}`)
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item");

    const info = `Restaurant: ${item.name}\nRestaurant Address: ${
      item.address
    }\nYour Price: $${(item.price * (item.discount / 100)).toFixed(2)}`;

    return (
      <View>
        <ScrollView>
          <View>
            <View>
              <Card>
                <CardImage source={{ uri: item.image }} />
                <CardTitle title={item.dish_name} subtitle={item.description} />
                <CardContent text={info} />
                <CardAction separator={true} inColumn={false}>
                {item.is_redeemed ? <Text>Your Coupon Has Been Redeemed</Text> : (
                  <CardButton
                    onPress={() => this._redeemCoupon(item.id)}
                    title="Redeem Coupon"
                    color="green"
                  />
                )}
                  <CardButton
                    onPress={() => navigation.goBack()}
                    title="Go Back"
                    color="blue"
                  />
                </CardAction>
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
              </Card>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

{
  /* <Image
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
</Text> */
}
