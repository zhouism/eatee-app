import React from "react";
import {
  Text,
  ScrollView,
  View,
  FlatList,
  Alert,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";
import axios from "axios";
import { rootIP } from "react-native-dotenv";
import { connect } from "react-redux";
import * as actions from "../../actions";
import {
  Card,
  CardTitle,
  CardContent,
  CardImage
} from "react-native-material-cards";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";

class CouponBatchesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "My Active Coupons",
      headerStyle: {
        backgroundColor: "#FC4E3E"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerRight: (
        <Ionicons
          name="ios-add-circle-outline"
          size={32}
          color="white"
          style={{ padding: 10 }}
          onPress={() => navigation.navigate("CreateCouponBatch")}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      item: {},
      res_swipe: "",
      res_impression: "",
      res_redeem: ""
    };
  }

  componentDidMount() {
    this._onFocusListener = this.props.navigation.addListener(
      "didFocus",
      payload => {
        axios
          .get(
            `http://${rootIP}:3001/api/restaurants/${
              this.props.currentRestaurant
            }/coupon_batches`
          )
          .then(response => {
            this.setState({
              data: response.data
            });
          })
          .catch(error => {
            console.log(error);
          });

        axios
          .get(
            `http://${rootIP}:3001/api/restaurants/${
              this.props.currentRestaurant
            }/swipe`
          )
          .then(response => {
            this.setState({
              res_swipe: response.data[0].count
            });
          })
          .catch(error => {
            console.log(error);
          });

        axios
          .get(
            `http://${rootIP}:3001/api/restaurants/${
              this.props.currentRestaurant
            }/impression`
          )
          .then(response => {
            this.setState({
              res_impression: response.data[0].sum
            });
          })
          .catch(error => {
            console.log(error);
          });

        axios
          .get(
            `http://${rootIP}:3001/api/restaurants/${
              this.props.currentRestaurant
            }/redeem`
          )
          .then(response => {
            this.setState({
              res_redeem: response.data[0].count
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { res_impression, res_swipe, res_redeem } = this.state;

    const metrics = `Total # of Impressions: ${res_impression}\nTotal # of Swipes: ${res_swipe}\nTotal # of redeemed ads: ${res_redeem}`;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Total Coupon Impressions</Text>
          {res_impression ? (
            <Text style={styles.metrics}>{res_impression}</Text>
          ) : (
            <Text style={styles.metrics}>0</Text>
          )}
          <Text style={styles.text}>Total Coupon Swipes</Text>
          <Text style={styles.metrics}>{res_swipe}</Text>
          <Text style={styles.text}>Total Coupons Redeemed</Text>
          <Text style={styles.metrics}>{res_redeem}</Text>
          <Button
            buttonStyle={styles.button}
            onPress={() => {
              navigate("CreateCouponBatch");
            }}
            title="CREATE A NEW COUPON"
          />
        </View>
        {this.state.data && (
          <ScrollView>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() => navigate("CouponBatchDetail", { item: item })}
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
                      source={{ uri: item.image }}
                      resizeMode="cover"
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
                    <CardContent text={`Impressions: ${item.impression}`} />
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
  },
  text: {
    fontSize: 14,
    paddingTop: 5,
    alignSelf: "center"
  },
  metrics: {
    fontWeight: "bold",
    fontSize: 22,
    paddingTop: 5,
    alignSelf: "center"
  },
  button: {
    backgroundColor: "#000000",
    marginTop: 10,
    width: 300,
    height: 40,
    borderRadius: 30,
    margin: 10,
    borderColor: "#FC4E3E",
    alignSelf: "center"
  }
});

function mapStateToProps({ currentRestaurant }) {
  return { currentRestaurant };
}

export default connect(
  mapStateToProps,
  actions
)(CouponBatchesScreen);
