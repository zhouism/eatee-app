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
import ModalView from "./RestaurantLoginModalView.js";
import { TextInputMask } from "react-native-masked-text";

const authToken =
  "Bearer JIba6FRPuS1u8_G-7HeYFxOEn1hP8OiBz8SNySU0VlWpzKY8hx0E9hJulfTId43tLaDk-0inreQzymHn54GF5wGULtbEUy8yggF0564R5ESptLfg4X9m_mA0FJ6mW3Yx";

export default class RestaurantLoginScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: {},
      query: "",
      rawText: "",
      result: {},
      modalVisible: false
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

  // _handleQueryChange = query => {
  //   this.setState(state => ({ ...state, query: query || "" }));
  //   console.log(this.yelpPhoneNumber.getRawValue());
  // };

  // query => console.log(this.yelpPhoneNumber.getRawValue());

  _handleSearchCancel = () => this._handleQueryChange("");
  _handleSearchClear = () => this._handleQueryChange("");

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _onPressItem(item) {
    this.setState({
      modalVisible: true,
      result: item
    });
  }

  navToCouponBatch() {
    this.setModalVisible(false);
    console.log("has connected to navToCouponBatch");
    this.props.navigation.navigate("RestaurantNav");
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
        <ModalView
          modalVisible={this.state.modalVisible}
          setModalVisible={vis => {
            this.setModalVisible(vis);
          }}
          result={this.state.result}
          savedDB={() => this.navToCouponBatch()}
        />
        {/* <SearchBar
          onChangeText={this._handleQueryChange}
          onCancel={this._handleSearchCancel}
          onClear={this._handleSearchClear}
          value={this.state.query}
        /> */}
        <TextInputMask
          ref={ref => (this.yelpPhoneNumber = ref)}
          type={"custom"}
          options={{
            mask: "+1 (999) 999-9999",
            getRawValue: function(value, settings) {
              return "+" + value.replace(/\D/g, "");
            }
          }}
          placeholder="Restaurant Phone Number"
          placeholderTextColor="#DBCCC0"
          selectionColor="#CF0821"
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          onChangeText={query => {
            this.setState({
              query
            });

            // console.log(this.yelpPhoneNumber.getElement());
            // console.log(this.yelpPhoneNumber.isValid());
            // console.log(this.yelpPhoneNumber.getRawValue());
          }}
          onCancel={this._handleSearchCancel}
          onClear={this._handleSearchClear}
          value={this.state.query}
        />

        <Button
          onPress={() =>
            this.getRestaurantData(this.yelpPhoneNumber.getRawValue())
          }
          title="Look for my restaurant"
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this._onPressItem(item)}>
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
