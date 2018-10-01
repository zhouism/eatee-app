import React from "react";
import {
  Modal,
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";
import axios from "axios";
import ModalView from './CouponDetailModalView.js';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import { rootIP } from 'react-native-dotenv'

// const CHRIS_IP = 'http://192.168.0.191:3001/api';
// const HOME_IP = 'http://192.168.1.97:3001/api';

const LIGHTHOUSE_IP = `http://${rootIP}:3001/api`;

class CouponListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Your Coupons',
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      modalVisible: false,
      item: {}
    };
  }

  static navigationOptions = {
    title: "Your Food Options"
  };

  componentDidMount() {
    axios
      .get(`${LIGHTHOUSE_IP}/users/${this.props.currentUser}/coupon_list`)
      .then(response => {
        console.log(response.data)
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

  _refreshScreen(){
    axios
      .get(`${LIGHTHOUSE_IP}/users/${this.props.currentUser}/coupon_list`)
      .then(response => {
        console.log(response.data)
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ModalView
          modalVisible={this.state.modalVisible}
          setModalVisible={vis => {
            this.setModalVisible(vis);
          }}
          item={this.state.item}
          updateDB={() => this._refreshScreen()}
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this._onPressItem(item)}>
              <View>
              <Image source={{uri: item.image}} style={{width: 400, height: 300}} />
                <Text>Id: {item.id}</Text>
                <Text>Dish Name: {item.dish_name}</Text>
                <Text>Restaurant Name: {item.name}</Text>
                <Text>Restaurants Address: {item.address}</Text>
                <Text>Time Limit: {item.time_limit}</Text>
                <Text>Unit Price: ${(item.price).toFixed(2)}</Text>
                <Text>Your Price: ${(item.price * (item.discount / 100)).toFixed(2)}</Text>
                {item.is_redeemed && <Text>Your Coupon Has Been Redeemed</Text>}
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={item => item.id.toString()}
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


function mapStateToProps({ currentUser }) {
  console.log("current user: ", currentUser);
  return { currentUser };
}

export default connect(mapStateToProps, actions)(CouponListScreen);