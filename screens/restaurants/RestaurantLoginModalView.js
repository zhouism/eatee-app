import React from "react";
import {
  Modal,
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import _ from 'lodash';
import axios from "axios";
import navigation from "react-navigation";

import { connect } from 'react-redux';
import * as actions from '../../actions';
import { rootIP } from 'react-native-dotenv'


class ModalView extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     RestaurantAU: RestaurantAU,
  //   }
  // }

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
  }

  saveRestaurantToDB(item){
    console.log('itemid', item.id)
    axios
      .get(`http://${rootIP}:3001/api/restaurants/yelpid/${item.id}`)
      .then((itemID) => {
        if (_.isEmpty(itemID.data)) {
          console.log("create new restaurant");
          axios.post(`http://${rootIP}:3001/api/restaurants/`, {
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
            longitude: item.coordinates.longitude,
            latitude: item.coordinates.latutde
          }).then((resultID) => {
            this.props.restaurantLogin((resultID.data)[0]);
            this.props.savedDB();
          })
          .catch(function(error) {
            console.log(error);
          });
        } else {
          console.log("restaurant exists");
          axios
            .get(`http://${rootIP}:3001/api/restaurants/yelpid/${item.id}`)
            .then((restaurantID) => {
              this.props.restaurantLogin((restaurantID.data)[0].id);
              this.props.savedDB();
            })
        }
      })
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
            <Text>Is this your restaurant?</Text>
            <Text>Restaurant: {this.state.result.name}</Text>
            <Text>Phone Number: {this.state.result.phone}</Text>

            <Button
              onPress={() => {
                this.saveRestaurantToDB(this.state.result);
              }}
              title="Confirm"
            />
            <Button
              onPress={() => {
                this.props.setModalVisible(false);
              }}
              title="Go Back"
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
  console.log('current restaurant id: ', currentRestaurant);
  return { currentRestaurant };
}

export default connect(mapStateToProps, actions)(ModalView);
