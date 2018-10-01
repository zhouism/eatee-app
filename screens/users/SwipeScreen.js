import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from '../../components/Deck.js';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import { Ionicons } from '@expo/vector-icons';

class SwipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Ionicons name="md-settings" size={32} color="red" onPress={() => navigation.navigate('Settings')} />,
      headerRight: <Ionicons name="md-list" size={32} color="red" onPress={() => navigation.navigate('CouponList')} />
    }
  }

  componentDidMount() {
    this.props.fetchCouponBatches();
  }

  renderCard(item) {
    const discountPrice =  parseFloat(item.price) - (parseFloat(item.price) * parseFloat(item.discount) / 100);

    return(
      <Card
        key={ item.id }
        title={ item.name }
        image={{ uri: item.image }}
      >
        <Text style={{ marginBottom: 10 }}>
          I can customize the Card further.
        </Text>
        <Text>
          quantity: { item.quantity }
        </Text>
        <Text>
          time remaining: { item.time_limit }
        </Text>
        <Text>
          price: { item.price }
        </Text>
        <Text>
          discount: { item.discount }%
        </Text>
        <Text>
          price now: { discountPrice }
        </Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#03A9F4'
          title="View Coupon!"
          onPress={() => console.log('click view')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={ this.props.coupons }
          curUser={ this.props.currentUser }
          renderCard={ this.renderCard }
          renderNoMoreCards={ this.renderNoMoreCards }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

function mapStateToProps({ coupons, currentUser }) {

  return { coupons, currentUser };
}

export default connect(mapStateToProps, actions)(SwipeScreen);
