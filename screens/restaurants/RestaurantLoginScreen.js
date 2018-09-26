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
import { SearchBar, Button } from "react-native-elements";

const authToken =
  "Bearer JIba6FRPuS1u8_G-7HeYFxOEn1hP8OiBz8SNySU0VlWpzKY8hx0E9hJulfTId43tLaDk-0inreQzymHn54GF5wGULtbEUy8yggF0564R5ESptLfg4X9m_mA0FJ6mW3Yx";

export default class RestaurantLoginScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: {},
      query: "",
      modalVisible: false,
      result: {}
    };
  }

  getRestaurantData(phoneNumber) {
    axios
      .get("https://api.yelp.com/v3/businesses/search/phone", {
        headers: {
          Authorization: authToken
        },
        params: {
          phone: phoneNumber
        }
      })
      .then(response => {
        this.setState({
          isLoading: false,
          data: response.data.businesses
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  _handleQueryChange = query =>
    this.setState(state => ({ ...state, query: query || "" }));

  _handleSearchCancel = () => this._handleQueryChange("");
  _handleSearchClear = () => this._handleQueryChange("");

  _saveRestaurantToDB({ result }) {
    let name = this.state.result.name;
    let yelpImgUrl = this.state.result.image_url;
    let yelpBusUrl = this.state.result.url;
    let rating = this.state.result.rating;
    let categories = this.state.result.categories; // this is an array with objects
    let address = this.state.result.location.address1;
    let city = this.state.result.location.city;
    let country = this.state.result.location.country;
    let phone = this.state.result.phone;
    let longitude = this.state.result.coordinates.longitude;
    let latitude = this.state.result.coordinates.latutde;

    AsyncStorage.getItem(); // this stores into db??
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View>
        <SearchBar
          onChangeText={this._handleQueryChange}
          onCancel={this._handleSearchCancel}
          onClear={this._handleSearchClear}
          value={this.state.query}
        />
        <Button
          onPress={() => this.getRestaurantData(this.state.query)}
          title="Look for my restaurant"
        />

        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this._saveRestaurantToDB(item)}>
              <View>
                <Text>Restaurant: {item.name}</Text>
                <Text>Phone: {item.display_phone}</Text>
                <Text>Price Range: {item.price}</Text>
                <Text>Address: {item.location.address1}</Text>
                <Text>City: {item.location.city}</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}
