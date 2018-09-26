import React from "react";
import {
  Modal,
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import ModalView from './CouponDetailModalView.js';

export default class CouponListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      modalVisible: false,
      id: null
    };
  }

  static navigationOptions = {
    title: "Your Food Options"
  };

  componentDidMount() {
    axios
      .get("http://192.168.88.173:3001/api/users/1/coupon_list")
      .then(response => {
        const datas = response.data;
        console.log("datas", datas);
        this.setState({
          data: datas
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _onPressItem(id) {
    this.setState({
      modalVisible: true,
      id: id
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
          id={this.state.id}
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this._onPressItem(item.id)}>
              <View>
                <Text>Id: {item.id}</Text>
                <Text>Restaurant: {item.name}</Text>
                <Text>Time Limit: {item.time_limit}</Text>
                <Text>Unit Price: {item.price}</Text>
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
