import React from "react";
import {
  Modal,
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image
} from "react-native";
import axios from 'axios';
import { rootIP } from "react-native-dotenv";

export default class ModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      item: {},
      couponSwipe: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      item: nextProps.item,
    });
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.props.setModalVisible(false);
        }}
      >
      <ScrollView>
      <View>
          <View>
          <Image source={{uri: this.state.item.image}} style={{width: 400, height: 300}} />
            <Text>Id: {this.state.item.id}</Text>
            <Text>Dish Name: {this.state.item.dish_name}</Text>
            <Text>Time Limit: {this.state.item.time_limit}</Text>

            <Text>Unit Price: ${(this.state.item.price * 1).toFixed(2)}</Text>
            <Text>Your Price: ${(this.state.item.price * (this.state.item.discount / 100)).toFixed(2)} </Text>
            <Text>Total # of Impressions: {this.state.item.impression}</Text>
            <Text>Total # of Swipes: {this.state.couponSwipe}</Text>
            <TouchableHighlight
              onPress={() => {
                this.props.setModalVisible(false);
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
      </Modal>
    );
  }
}
