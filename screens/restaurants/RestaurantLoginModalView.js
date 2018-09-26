import React from "react";
import {
  Modal,
  TouchableHighlight,
  Alert,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  AsyncStorage
} from "react-native";
import axios from "axios";

export default class ModalView extends React.Component {
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
  _saveRestaurantToDB({ result }) {
    let name = this.state.result.name;
    let yelpImgUrl = this.state.result.image_url;
    let yelpBusUrl = this.state.result.url;
    let rating = this.state.result.rating;
    let categories = this.state.result.categories; //this is an object
    let address = this.state.result.location.address1;
    let city = this.state.result.location.city;
    let country = this.state.result.location.country;
    let phone = this.state.result.phone;
    let longitude = this.state.result.coordinates.longitude;
    let latitude = this.state.result.coordinates.latutde;

    AsyncStorage.getItem(); // this stores into db??
  }
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.props.setModalVisible(false);
        }}
      >
        <View>
          <View>
            <Text>{this.state.result.name}</Text>
            <Button
              onPress={() => {
                Alert.alert("Save this to database");
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
