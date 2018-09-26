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
import axios from 'axios';

export default class ModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      result: {},
    };
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      result: nextProps.result,
    })
  }
  
  saveRestaurantToDB(item) {
    axios
      .post("http://192.168.88.173:3001/api/restaurants/", {
        name: item.name,
        Yelp_image_URL: item.image_url,
        Yelp_business_URL: item.url,
        rating: item.rating,
        categories: null, // this is an array with objects, not sure if this is how it's saved to sql
        address: item.location.address1,
        city: item.location.city,
        country: item.location.country,
        phone: item.phone,
        longitude: item.coordinates.longitude,
        latitude: item.coordinates.latutde
      })
      .then(results => {
        this.setState({
          id: results.id
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
       <Modal
        animationType="slide"
        transparent={ false }
        visible={ this.state.modalVisible }
        onRequestClose={() => { this.props.setModalVisible(false) }}
       > 
      

         <View>
          <View>
            <Text>Result.name: { this.state.result.name }</Text>
            <Button
              onPress={() => {
                this.saveRestaurantToDB(this.state.result)
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
    )
  }
  }