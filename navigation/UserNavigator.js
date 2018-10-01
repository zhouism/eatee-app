import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import CouponListScreen from '../screens/users/CouponListScreen';
import SettingsScreen from '../screens/users/SettingsScreen';
import SwipeScreen from '../screens/users/SwipeScreen';


// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
//     />
//   ),
// };

// const SwipeStack = createStackNavigator({
//   Swipes: SwipeScreen,
// });

// SwipeStack.navigationOptions = {
//   tabBarLabel: 'Swipe',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? `ios-arrow-down${focused ? '' : '-outline'}` : 'md-arrow-down'}
//     />
//   ),
// };

// const CouponListStack = createStackNavigator({
//   Links: CouponListScreen,
// });

// CouponListStack.navigationOptions = {
//   tabBarLabel: 'CouponList',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-list'}
//     />
//   ),
// };

// export default createBottomTabNavigator({
//   SwipeStack,
//   SettingsStack,
//   CouponListStack
// });

export default UserStack = createStackNavigator(
  {
  Swipe: SwipeScreen,
  Settings: SettingsScreen,
  CouponList: CouponListScreen
  },
  {
    initialRouteName: 'Swipe',
  }
);