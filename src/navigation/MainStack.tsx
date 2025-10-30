import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { AuthStack } from "./AuthStack";
import { HomeStack } from "./HomeStack";

export type MainStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

const MainStackComponent: React.FC = () => {
  const { user, checkLogin } = useAuth();

  useEffect(() => {
    // guard in case checkLogin is undefined
    if (typeof checkLogin === "function") {
      checkLogin();
    }
  }, [checkLogin]);

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export const MainStack = React.memo(MainStackComponent);
