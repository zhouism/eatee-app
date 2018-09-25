import React from 'react';
import { Text, View, Button, FlatList } from "react-native";
import axios from 'axios';

export default class CouponListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  static navigationOptions = {
    title: 'Your Food Options',
  };

  componentDidMount(){
    axios.get('http://192.168.88.173:3001/api/users/1/coupon_list')
      .then(response => {
        const datas = response.data
        console.log(datas);
        this.setState({
          data: datas
        })
      })
      .catch((error) =>  {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
      <FlatList
        data={this.state.data}
        renderItem={({item}) => <Text>{item.name}</Text>} 
      />
      </View>
    )
  }
}