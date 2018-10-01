import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import RestaurantNavigator from './RestaurantNavigator';
import UserNavigator from './UserNavigator';
import HomeNavigator from './HomeNavigator';

const HomeStack = HomeNavigator;
const UserStack = UserNavigator;
const RestaurantStack = RestaurantNavigator;


export default createSwitchNavigator(
  {
    Home: HomeStack,
    UserNav: UserStack,
    RestaurantNav: RestaurantStack,
  },
  {
    initialRouteName: 'Home',
  },
  {
    lazy: true
  }
);