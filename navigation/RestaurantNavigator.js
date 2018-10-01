import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import CouponBatchesScreen from "../screens/restaurants/CouponBatchesScreen";
import CreateCouponBatchScreen from "../screens/restaurants/CreateCouponBatchScreen";
import CouponBatchDetailsScreen from "../screens/restaurants/CouponBatchDetailsScreen";

// const CouponBatchesStack = createStackNavigator({
//   CouponBatches: CouponBatchesScreen
// });

// CouponBatchesStack.navigationOptions = {
//   tabBarLabel: "CouponBatches",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === "ios"
//           ? `ios-information-circle${focused ? "" : "-outline"}`
//           : "md-information-circle"
//       }
//     />
//   )
// };

// const CreateCouponBatchStack = createStackNavigator({
//   CreateCouponBatch: CreateCouponBatchScreen
// });

// CreateCouponBatchStack.navigationOptions = {
//   tabBarLabel: "CreateCouponBatch",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === "ios"
//           ? `ios-options${focused ? "" : "-outline"}`
//           : "md-options"
//       }
//     />
//   )
// };

// export default createBottomTabNavigator({
//   CouponBatchesStack,
//   CreateCouponBatchStack
// });

export default (RestaurantStack = createStackNavigator(
  {
    CouponBatch: CouponBatchesScreen,
    CreateCouponBatch: CreateCouponBatchScreen,
    CouponBatchDetail: CouponBatchDetailsScreen
  },
  {
    initialRouteName: "CouponBatch"
  }
));
