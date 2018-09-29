import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from '../../components/Deck.js';
import { connect } from 'react-redux';
import * as actions from '../../actions'


const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

class SwipeScreen extends React.Component {
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
