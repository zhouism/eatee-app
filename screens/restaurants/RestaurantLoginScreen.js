import React from "react";
import { FlatList, ActivityIndicator, Text, View } from "react-native";
import axios from "axios";

const authToken =
  "Bearer JIba6FRPuS1u8_G-7HeYFxOEn1hP8OiBz8SNySU0VlWpzKY8hx0E9hJulfTId43tLaDk-0inreQzymHn54GF5wGULtbEUy8yggF0564R5ESptLfg4X9m_mA0FJ6mW3Yx";
const config = {
  headers: {
    Authorization: authToken
  },
  params: {
    phone: "+16046858817"
  }
};

export default class RestaurantLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };
  }

  componentWillMount() {
    axios
      .get("https://api.yelp.com/v3/businesses/search/phone", config)
      // .then(response => console.log(response.data.businesses[0]))
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

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      // console.log(this.state.data)
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <Text>
              Restaurant: {item.name}, Phone: {item.display_phone}, Price Range:{" "}
              {item.price}, Address: {item.location.address1}, City:{" "}
              {item.location.city}
            </Text>
          )}
          keyExtractor={item => item.phone}
        />
      </View>
    );
  }
}
