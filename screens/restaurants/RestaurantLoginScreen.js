import React from "react";
import {
  TouchableHighlight,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import axios from "axios";
import { SearchBar, Button } from "react-native-elements";
import ModalView from "./RestaurantLoginModalView.js";
import { TextInputMask } from "react-native-masked-text";
import LoadingScreen from "../LoadingScreen.js";

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
          <LoadingScreen />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ModalView
          modalVisible={this.state.modalVisible}
          setModalVisible={vis => {
            this.setModalVisible(vis);
          }}
          result={this.state.result}
          savedDB={() => this.navToCouponBatch()}
        />

        <TextInputMask
          ref={ref => (this.yelpPhoneNumber = ref)}
          type={"custom"}
          options={{
            mask: "+1 (999) 999-9999",
            getRawValue: function(value, settings) {
              return "+" + value.replace(/\D/g, "");
            }
          }}
          placeholder="🔍 INPUT PHONE NUMBER"
          placeholderTextColor="#D3D3D3"
          underlineColorAndroid="transparent"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={query => {
            this.setState({
              query
            });
          }}
          onCancel={this._handleSearchCancel}
          onClear={this._handleSearchClear}
          value={this.state.query}
        />

        <Button
          onPress={() =>
            this.getRestaurantData(this.yelpPhoneNumber.getRawValue())
          }
          buttonStyle={styles.button}
          title="LOOK FOR MY RESTAURANT"
        />
        <ScrollView>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => this._onPressItem(item)}>
                <View style={styles.result}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.image_url }}
                  />
                  <Text style={styles.header}>{item.name}</Text>
                  <Text style={styles.text}>{item.location.address1}</Text>
                  <Text style={styles.text}>{item.location.city}</Text>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FC4E3E"
  },
  result: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10
  },
  header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25
  },
  text: {
    color: "white",
    fontSize: 15
  },
  input: {
    marginTop: 20,
    padding: 10,
    width: 300,
    height: 50,
    color: "black",
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 30,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#000000",
    marginTop: 10,
    width: 300,
    borderRadius: 30,
    margin: 10,
    borderColor: "#FC4E3E"
  }
});
