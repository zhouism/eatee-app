import { createStackNavigator } from 'react-navigation';
import CouponListScreen from '../screens/users/CouponListScreen';
import SettingsScreen from '../screens/users/SettingsScreen';
import SwipeScreen from '../screens/users/SwipeScreen';

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