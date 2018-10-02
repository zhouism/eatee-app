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

const LIGHTHOUSE_IP = `http://${rootIP}:3001/api`;

class CouponListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Your Coupons"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      item: {}
    };
  }

  componentDidMount() {
    this._onFocusListener = this.props.navigation.addListener(
      "didFocus",
      payload => {
        axios
          .get(`${LIGHTHOUSE_IP}/users/${this.props.currentUser}/coupon_list`)
          .then(response => {
            console.log(response.data);
            this.setState({
              data: response.data
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
    return (
      <View style={styles.container}>
        {this.state.data && (
          <ScrollView>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() => navigate("CouponDetail", { item: item })}
                >
                  <Card>
                    <CardImage
                      source={{ uri: item.image }}
                    />
                    <CardTitle
                      title={item.dish_name}
                    />
                    <CardContent text={item.description} />
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
    fontWeight: "bold"
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

{
  /* <View>
<Image
  source={{ uri: item.image }}
  style={{ width: 400, height: 300 }}
/>
<Text>Id: {item.id}</Text>
<Text>Dish Name: {item.dish_name}</Text>
<Text>Restaurant Name: {item.name}</Text>
<Text>Restaurants Address: {item.address}</Text>
<Text>Time Limit: {item.time_limit}</Text>
<Text>Unit Price: ${item.price.toFixed(2)}</Text>
<Text>
  Your Price: $
  {(item.price * (item.discount / 100)).toFixed(2)}
</Text>
{item.is_redeemed && (
  <Text>Your Coupon Has Been Redeemed</Text>
)}
</View> */
}
