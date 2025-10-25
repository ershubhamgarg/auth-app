import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home/Home";
import { Login } from "../screens/Login/Login";
import { Signup } from "../screens/Signup/Signup";
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};
export const AuthStack = () => {
  const AuthStack = createNativeStackNavigator<AuthStackParamList>();
  const screenOptions = { headerShown: false, gestureEnabled: true };
  return (
    <AuthStack.Navigator
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <AuthStack.Screen
        options={screenOptions}
        name="Login"
        component={Login}
      />
      <AuthStack.Screen
        options={screenOptions}
        name="Signup"
        component={Signup}
      />
    </AuthStack.Navigator>
  );
};
