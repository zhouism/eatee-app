import React from "react";
import {
  Text,
  ScrollView,
  View,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import ModalView from "./CouponBatchDetailsModal.js";
import { rootIP } from "react-native-dotenv";

export default class CouponBatchesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      modalVisible: false,
      item: {}
    };
  }

  static navigationOptions = {
    title: "Your Coupon Ads"
  };

  componentDidMount() {
    axios
      .get(`http://${rootIP}:3001/api/restaurants/2/coupon_batches`)
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _onPressItem(item) {
    this.setState({
      modalVisible: true,
      item: item
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ModalView
          modalVisible={this.state.modalVisible}
          setModalVisible={vis => {
            this.setModalVisible(vis);
          }}
          item={this.state.item}
        />
        <Text>STATISTICS FOR ALL ADS</Text>
        <Text>Total Impressions:</Text>
        <Text>Total # of Swipes: </Text>
        <Text>Total # of redeemed ads:</Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this._onPressItem(item)}>
              <View>
                <Text>Dish Name: {item.dish_name}</Text>
                <Text>Total Impressions: {item.impression}</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={item => item.id.toString()}
        />
        <Button
          onPress={() => {
            navigate("CreateCouponBatch");
          }}
          title="Create a new coupon"
        />
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
