import React from "react";
import {
  Modal,
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableHighlight
} from "react-native";
import _ from "lodash";
import axios from "axios";
import { Button } from "react-native-elements";

import { connect } from "react-redux";
import * as actions from "../../actions";
import { rootIP } from "react-native-dotenv";

class ModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      result: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      result: nextProps.result
    });
    console.log(nextProps.result);
  }

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
              latitude: item.coordinates.latutde
            })
            .then(resultID => {
              this.props.restaurantLogin(resultID.data[0].id);
              this.props.savedDB();
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("restaurant exists");
          console.log("-- item id:", item.id);
          console.log(typeof item.id);
          axios
            .get(`http://${rootIP}:3001/api/restaurants/yelpid/${item.id}`)

            .then(restaurantID => {
              console.log("restaurant ID: ", restaurantID.data[0].id);
              ``;
              this.props.restaurantLogin(restaurantID.data[0].id);
              this.props.savedDB();
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
        <View style={styles.container}>
          <Text style={styles.header}>Is this your restaurant?</Text>
          <Image
            style={styles.image}
            source={{ uri: this.state.result.image_url }}
          />

          <Text style={styles.info}>
            Restaurant Name: {this.state.result.name}
          </Text>
          <Text style={styles.info}>
            Phone Number: {this.state.result.display_phone}
          </Text>
          <Button
            buttonStyle={styles.button}
            title="Confirm"
            onPress={() => {
              this.saveRestaurantToDB(this.state.result);
            }}
          />
          <Button
            buttonStyle={styles.button}
            title="Go Back"
            onPress={() => {
              this.props.setModalVisible(false);
            }}
          >
            <Text>Hide Modal</Text>
          </Button>
        </View>
      </Modal>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FC4E3E"
  },
  header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center"
  },
  image: {
    marginTop: 20,
    width: 400,
    height: 300,
    borderRadius: 10
  },
  info: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#000000",
    width: 200,
    borderRadius: 30,
    marginTop: 20,
    margin: 10,
    borderColor: "#FC4E3E"
  }
});
