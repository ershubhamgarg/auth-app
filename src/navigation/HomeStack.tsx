import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home/Home";
export type HomeStackParamList = {
  Home: undefined;
};
export const HomeStack = () => {
  const HomeStack = createNativeStackNavigator<HomeStackParamList>();
  const screenOptions = { headerShown: false, gestureEnabled: true };
  return (
    <HomeStack.Navigator
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <HomeStack.Screen options={screenOptions} name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};
