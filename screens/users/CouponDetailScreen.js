import React from "react";
import { Text, View, StyleSheet, ScrollView, Alert } from "react-native";
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
      headerTitle: navigation.getParam("name"),
      headerStyle: {
        backgroundColor: "#FC4E3E"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: (
        <Ionicons
          name="md-list"
          size={32}
          color="white"
          style={{ paddingLeft: 20 }}
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

  printOk() {
    console.log("ok")
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item");
    const discount_price = (
      item.price -
      item.price * (item.discount / 100)
    ).toFixed(2);

    const info = `${item.name}\n${item.address}\n${item.city}\n$${discount_price}`;

    console.log(info);
    console.log("item", item);
    return (
      <View>
        <ScrollView>
          <View>
            <View>
              <Card
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  borderWidth: 1.25,
                  borderColor: "#d3d3d3"
                }}
              >
                <CardImage
                  resizeMode="cover"
                  source={{ uri: item.image }}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2
                  }}
                />
                <CardTitle title={item.dish_name} subtitle={item.description} />
                <CardContent text={info} />
                <CardAction separator={true} inColumn={false}>
                  {item.is_redeemed ? (
                    <Text>Your Coupon Has Been Redeemed</Text>
                  ) : (
                    <CardButton
                      onPress={() => {
                        Alert.alert(
                          'Redeem Coupon',
                          'Delicious food is ready!!!',
                          [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => {this._redeemCoupon(item.id)}},
                          ],
                          { cancelable: false }
                        )

                      }}
                      title="Redeem Coupon"
                      color="#FC4E3E"
                    />


                  )}
                  <CardButton
                    onPress={() => navigation.goBack()}
                    title="Go Back"
                    color="black"
                  />
                </CardAction>
                {item.latitude ? (
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
                ) : (
                  <Text />
                )}
              </Card>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
