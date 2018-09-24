import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CouponListScreen from '../screens/users/CouponListScreen';
import SettingsScreen from '../screens/users/SettingsScreen';
import SwipeScreen2 from '../screens/users/SwipeScreen2';
import UserLogin from '../screens/users/UserLogin';

const UserStack = createStackNavigator({
  UserLogin: UserLogin,
});

UserStack.navigationOptions = {
  tabBarLabel: 'Home',
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

const CouponListStack = createStackNavigator({
  Links: CouponListScreen,
});

CouponListStack.navigationOptions = {
  tabBarLabel: 'CouponList',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-list'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

const SwipeStack = createStackNavigator({
  Swipes: SwipeScreen2,
});

SwipeStack.navigationOptions = {
  tabBarLabel: 'Swipe',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-arrow-down${focused ? '' : '-outline'}` : 'md-arrow-down'}
    />
  ),
};

export default createBottomTabNavigator({
  UserStack,
  SettingsStack,
  SwipeStack,
  CouponListStack
});
