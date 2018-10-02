import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Card, Button } from "react-native-elements";
import Deck from "../../components/Deck.js";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class SwipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Ionicons
          name="md-settings"
          size={32}
          color="#FC4E3E"
          style={{ paddingLeft: 20 }}
          onPress={() => navigation.navigate("Settings")}
        />
      ),
      headerRight: (
        <Ionicons
          name="md-list"
          size={32}
          color="#FC4E3E"
          style={{ paddingRight: 20 }}
          onPress={() => navigation.navigate("CouponList")}
        />
      ),
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      }
    };
  };

  componentDidMount() {
    this.props.fetchCouponBatches();
  }

  renderCard(item) {
    return <Image style={styles.cardStyle} source={{ uri: item.image }} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={this.props.coupons}
          curUser={this.props.currentUser}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
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
  cardStyle: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: 20
  }
});

function mapStateToProps({ coupons, currentUser }) {
  return { coupons, currentUser };
}

export default connect(
  mapStateToProps,
  actions
)(SwipeScreen);
