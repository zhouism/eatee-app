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
import { TextInputMask } from "react-native-masked-text";
import LoadingScreen from "../LoadingScreen.js";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from "react-native-material-cards";

const authToken =
  "Bearer JIba6FRPuS1u8_G-7HeYFxOEn1hP8OiBz8SNySU0VlWpzKY8hx0E9hJulfTId43tLaDk-0inreQzymHn54GF5wGULtbEUy8yggF0564R5ESptLfg4X9m_mA0FJ6mW3Yx";

export default class RestaurantLoginScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Restaurant Search',
    headerStyle: {
      backgroundColor: '#FC4E3E',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: {},
      query: "",
      rawText: "",
      result: {},
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

  _handleSearchCancel = () => this._handleQueryChange("");
  _handleSearchClear = () => this._handleQueryChange("");

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <LoadingScreen />
        </View>
      );
    }
    return (
      <ScrollView >
        <View style={styles.container}>
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
        </View>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => this.props.navigation.navigate('RestaurantConfirm', {item: item})}>
              <Card
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    borderWidth: 1.25,
                    borderColor: "#d3d3d3"
                  }}
                >
                {item.image_url ? (
                  <CardImage
                    source={{ uri: item.image_url }}
                    resizeMode="cover"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2
                    }}
                  />
                ) : (<Text>No Image :(</Text>)}

                  <CardTitle
                    title={item.name}
                    subtitle={item.description}
                  />
                  <CardContent 
                    text={`${item.location.address1}\n${item.location.city}`}
                  />
                </Card>
              </TouchableHighlight>
            )}
            keyExtractor={item => item.id}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
