import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import RestaurantNavigator from './RestaurantNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import UserNavigator from './UserNavigator';
import HomeScreen from '../screens/HomeScreen';
import UserLogin from '../screens/users/UserLogin';
import SettingsScreen from '../screens/users/SettingsScreen';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

// const AppStack = createStackNavigator({ Home: HomeScreen, User: UserNavigator, Restaurant: RestaurantNavigator });
// const AuthStack = createStackNavigator({ SignIn: UserLogin });

const UserStack = UserNavigator;
const RestaurantStack = RestaurantNavigator;

export default createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    Home: HomeScreen,
    User: UserLogin,
    Restaurant: RestaurantStack, //this has to be changed to RestaurantLogin
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'Home',
  }
);