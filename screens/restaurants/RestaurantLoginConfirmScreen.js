import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import _ from "lodash";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { rootIP } from "react-native-dotenv";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from "react-native-material-cards";

class ModalView extends React.Component {
  saveRestaurantToDB(item) {
    console.log("itemid", item.id);

    axios
      .get(`http://${rootIP}:3001/api/restaurants/yelpid/${item.id}`)
      .then(itemID => {
        if (_.isEmpty(itemID.data)) {
          console.log("create new restaurant");
          axios
            .post(`http://${rootIP}:3001/api/restaurants/`, {
              name: item.name,
              Yelp_image_URL: item.image_url,
              Yelp_business_URL: item.url,
              rating: item.rating,
              categories: null, // this is an array with objects, not sure if this is how it's saved to sql
              address: item.location.address1,
              city: item.location.city,
              country: item.location.country,
              phone: item.phone,
              yelp_id: item.id,
              price: item.price,
              longitude: item.coordinates.longitude,
              latitude: item.coordinates.latitude
            })
            .then(resultID => {
              this.props.restaurantLogin(resultID.data[0].id);
              this.props.navigation.navigate("RestaurantNav");
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("restaurant exists");
          console.log("-- item id:", item.id);
          axios
            .get(`http://${rootIP}:3001/api/restaurants/yelpid/${item.id}`)

            .then(restaurantID => {
              console.log("restaurant ID: ", restaurantID.data[0].id);
              ``;
              this.props.restaurantLogin(restaurantID.data[0].id);
              this.props.navigation.navigate("RestaurantNav");
            });
        }
      });
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item");
    console.log('this is the item.location.display_address[0]', item.location.display_address[0])


    return (
      <View>
        <ScrollView>
              <Card>
                {item.image_url ? (
                  <CardImage source={{ uri: item.image_url }} />
                ) : (
                  <Text>No Iamge</Text>
                )}
                <CardTitle title={item.name} />
                <CardContent text={`Phone Number: ${item.phone}\n${item.location.display_address[0]}\n${item.location.display_address[1]}\n${item.location.display_address[2]}`} />
                <CardAction separator={true} inColumn={false}>
                  <CardButton
                    onPress={() => {
                      this.saveRestaurantToDB(item);
                    }}
                    title="Confirm"
                    color="green"
                  />
                  <CardButton
                    onPress={() => navigation.goBack()}
                    title="Go Back"
                    color="blue"
                  />
                </CardAction>
              </Card>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps({ currentRestaurant }) {
  console.log(
    "current restaurant id in restaurant login modal view: ",
    currentRestaurant
  );
  return { currentRestaurant };
}

export default connect(
  mapStateToProps,
  actions
)(ModalView);