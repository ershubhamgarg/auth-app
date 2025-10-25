import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Signup } from "../screens/Signup/Signup";
import { Home } from "../screens/Home/Home";
import { Login } from "../screens/Login/Login";
import { HomeStack } from "./HomeStack";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { AuthStack } from "./AuthStack";
export type MainStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};
export const MainStack = () => {
  const { user, checkLogin } = useAuth();

  useEffect(() => {
    checkLogin?.();
  }, []);

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
