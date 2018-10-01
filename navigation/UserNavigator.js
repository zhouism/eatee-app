import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import CouponListScreen from '../screens/users/CouponListScreen';
import SettingsScreen from '../screens/users/SettingsScreen';
import SwipeScreen from '../screens/users/SwipeScreen';
import CouponDetailScreen from '../screens/users/CouponDetailScreen';

const Coupon = createSwitchNavigator({
  CouponList: CouponListScreen,
  CouponDetail: CouponDetailScreen
})

export default UserStack = createStackNavigator(
  {
  Swipe: SwipeScreen,
  Settings: SettingsScreen,
  CouponNav: Coupon
  },
  {
    initialRouteName: 'Swipe',
  }
);