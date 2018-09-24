import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import RestaurantNavigator from './RestaurantNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import UserNavigator from './UserNavigator';
import HomeScreen from '../screens/HomeScreen';
import UserLoginScreen from '../screens/users/UserLoginScreen';
import RestaurantLoginScreen from '../screens/restaurants/RestaurantLoginScreen';


// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

// const AppStack = createStackNavigator({ Home: HomeScreen, User: UserNavigator, Restaurant: RestaurantNavigator });
// const AuthStack = createStackNavigator({ SignIn: UserLogin });

const UserStack = UserNavigator;
const RestaurantStack = RestaurantNavigator;

const UserAuthSwitch = createSwitchNavigator({
  User: UserLoginScreen,
  UserNav: UserStack,
})

const RestaurantAuthSwitch = createSwitchNavigator({
  Restaurant: RestaurantLoginScreen,
  RestaurantNav: RestaurantStack,
})

export default createStackNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    Home: HomeScreen,
    User: UserLoginScreen,
    Restaurant: RestaurantLoginScreen,
    UserAU: UserAuthSwitch,
    RestaurantAU: RestaurantAuthSwitch,

  },
  {
    initialRouteName: 'Home',
  }
);