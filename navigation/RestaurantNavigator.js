import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CouponBatchesScreen from '../screens/restaurants/CouponBatchesScreen';

const CouponBatchesStack = createStackNavigator({
  CouponBatches: CouponBatchesScreen,
});

CouponBatchesStack.navigationOptions = {
  tabBarLabel: 'CouponBatches',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

export default createBottomTabNavigator({
  CouponBatchesStack
});
