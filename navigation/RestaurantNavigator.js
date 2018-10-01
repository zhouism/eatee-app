import { createStackNavigator } from "react-navigation";
import CouponBatchesScreen from "../screens/restaurants/CouponBatchesScreen";
import CreateCouponBatchScreen from "../screens/restaurants/CreateCouponBatchScreen";
import CouponBatchDetailsScreen from "../screens/restaurants/CouponBatchDetailsScreen";

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
