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

export default class ModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      id: null,
    };
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      id: nextProps.id,
    })
  }
  

  
  render() {
    return (
       <Modal
        animationType="slide"
        transparent={ false }
        visible={ this.state.modalVisible }
        onRequestClose={() => { this.props.setModalVisible(false) }}
       > 
         <View>
           <View>
            <Text>{ this.state.id }</Text>
            <TouchableHighlight
              onPress={() => { this.props.setModalVisible(false) }}
            > 
              <Text>Hide Modal</Text>
            </TouchableHighlight>
           </View>
         </View>
       </Modal>
    )
  }
  }