import { createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import UserLoginScreen from "../screens/users/UserLoginScreen";
import RestaurantLoginScreen from "../screens/restaurants/RestaurantLoginScreen";

export default (HomeStack = createStackNavigator({
  Home: HomeScreen,
  User: UserLoginScreen,
  Restaurant: RestaurantLoginScreen
}));
