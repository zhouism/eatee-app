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
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
import Deck from '../../components/Deck.js';
import axios from 'axios';
import { rootIP } from 'react-native-dotenv'

export default class ModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      item: {},
      region: {
        latitude: 49.324,
        longitude: -123.021,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      },
      coordinate: {
        latitude: 49.324,
        longitude: -123.021,
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      item: nextProps.item,
      // region: {
      //   latitude: nextProps.item.latitude,
      //   longitude: nextProps.item.longitude,
      //   latitudeDelta: 0.005,
      //   longitudeDelta: 0.005
      // },
      // coordinate: {
      //   latitude: nextProps.item.latitude,
      //   longitude: nextProps.item.longitude,
      // }
    });
  }

  render() {
    return (
      <ScrollView>
      <View>
          <View>
          <Image source={{uri: this.state.item.image}} style={{width: 400, height: 300}} />
            <Text>Id: {this.state.item.id}</Text>
            <Text>Restaurant: {this.state.item.name}</Text>
            <Text>Restaurants Address: {this.state.item.address}</Text>
            <Text>Lat: {this.state.item.latitude}</Text>
            <Text>Long: {this.state.item.longitude}</Text>
            <Text>Dish Name: {this.state.item.dish_name}</Text>
            <Text>Time Limit: {this.state.item.time_limit}</Text>
            <Text>Unit Price: ${(this.state.item.price * 1).toFixed(2)}</Text>
            <Text>Your Price: ${(this.state.item.price * (this.state.item.discount / 100)).toFixed(2)} </Text>    
            <MapView
            style={{ width: 400, height: 300 }}
              region={this.state.region}
              onRegionChange={this.onRegionChange}
            >
            <Marker coordinate={this.state.coordinate}>
            </Marker>
            </MapView>
            <Button
              onPress={() => {
                this.props.setModalVisible(false);
              }}
              title="Go Back"
            >
              <Text>Hide Modal</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}
