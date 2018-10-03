import React from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView
} from "react-native";
import axios from "axios";
import { AppLoading } from "expo";
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
import { Ionicons } from "@expo/vector-icons";

const LIGHTHOUSE_IP = `http://${rootIP}:3001/api`;

class CouponListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "My Coupons",
      headerStyle: {
        backgroundColor: "#FC4E3E"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: (
        <Ionicons
          name="md-restaurant"
          size={32}
          color="white"
          style={{ padding: 10 }}
          onPress={() => navigation.goBack()}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      item: {},
      isReady: false
    };
  }

  componentDidMount() {
    this._onFocusListener = this.props.navigation.addListener(
      "didFocus",
      payload => {
        axios
          .get(`${LIGHTHOUSE_IP}/users/${this.props.currentUser}/coupon_list`)
          .then(response => {
            this.setState({
              data: response.data
            });
          })
          .catch(error => {
            console.log(error);
          });
      },
      this.setState({
        isReady: true
      })
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.data && (
          <ScrollView>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() =>
                    navigate("CouponDetail", {
                      item: item,
                      name: item.dish_name
                    })
                  }
                >
                  <Card
                    style={{
                      borderRadius: 10,
                      overflow: "hidden",
                      borderWidth: 1.25,
                      borderColor: "#d3d3d3"
                    }}
                  >
                    <CardImage
                      resizeMode="cover"
                      source={{ uri: item.image }}
                      style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2
                      }}
                    />
                    <CardTitle
                      title={item.dish_name}
                      subtitle={item.description}
                    />
                    {item.is_redeemed ? (
                      <CardContent text="Your Coupon Has Been Redeemed" />
                    ) : (
                      <CardContent text="" />
                    )}
                  </Card>
                </TouchableHighlight>
              )}
              keyExtractor={item => item.id.toString()}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

function mapStateToProps({ currentUser }) {
  console.log("current user: ", currentUser);
  return { currentUser };
}

export default connect(
  mapStateToProps,
  actions
)(CouponListScreen);
