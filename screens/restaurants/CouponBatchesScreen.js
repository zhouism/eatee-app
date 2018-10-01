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
import ModalView from "./CouponBatchDetailsScreen.js";
import { rootIP } from "react-native-dotenv";
import { connect } from 'react-redux';
import * as actions from '../../actions';

class CouponBatchesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Coupon Batches',
      headerLeft: <Ionicons name="md-settings" size={32} color="red" onPress={() => navigation.navigate('CreateCouponBatch')} />,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      item: {}
    };
  }

  static navigationOptions = {
    title: "Your Coupon Ads"
  };

  componentDidMount() {
    axios
      .get(`http://${rootIP}:3001/api/restaurants/${this.props.currentRestaurant}/coupon_batches`)
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>STATISTICS FOR ALL ADS</Text>
        <Text>Total Impressions:</Text>
        <Text>Total # of Swipes: </Text>
        <Text>Total # of redeemed ads:</Text>
        <ScrollView>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => navigate('CouponBatchDetail',
                {item: item} 
              )}>
                <View>
                  <Text>Dish Name: {item.dish_name}</Text>
                  <Text>Total Impressions: {item.impression}</Text>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
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

function mapStateToProps({ currentRestaurant }) {
  return { currentRestaurant };
}

export default connect(mapStateToProps, actions)(CouponBatchesScreen);