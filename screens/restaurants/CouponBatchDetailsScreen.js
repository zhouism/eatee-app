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

export default class ModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      item: {},
    };
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    return (
      <ScrollView>
      <View>
          <View>
          <Image source={{uri: item.image}} style={{width: 400, height: 300}} />
            <Text>Id: {item.id}</Text>
            <Text>Dish Name: {item.dish_name}</Text>
            <Text>Time Limit: {item.time_limit}</Text>
            <Text>Unit Price: ${(item.price * 1).toFixed(2)}</Text>
            <Text>Your Price: ${(item.price * (item.discount / 100)).toFixed(2)} </Text>    
          </View>
        </View>
      </ScrollView>
    );
  }
}
