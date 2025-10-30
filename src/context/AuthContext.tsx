import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { ERROR_MSG } from "../constants/errorConstants";
import { findUser, userExist } from "../queries/userQueries";
import {
  getItemFromStorage,
  removeItemFromStorage,
  setItemInStorage,
} from "../utils/utils";
export type User = {
  name: string;
  email: string;
  password: string;
};

export type LoginPaylod = { email: string; password: string };
interface AuthContextType {
  user: User | null;
  login: (payload: LoginPaylod) => void;
  signup: (payload: User) => void;
  logout: () => void;
  error?: string;
  setErrors?: () => void;
  checkLogin?: () => void;
  checking?: boolean;
  setChecking?: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  error: "",
  setErrors: () => {},
  checkLogin: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const login = async (payload: LoginPaylod) => {
    //logic to find user data from saved users
    try {
      const data = await getItemFromStorage("users");
      const users = await JSON.parse(data ?? "[]");
      const user = findUser(users, payload);
      if (user) {
        setError("");
        setUser(user);
        await setItemInStorage("user", JSON.stringify(user));
      } else {
        setError("Please check email/ password");
      }
    } catch {
      console.log("error");
    }
  };

  const signup = async (payload: User) => {
    try {
      const data = await getItemFromStorage("users");
      const users = await JSON.parse(data ?? "[]");
      const newUser = payload;
      const userExists = Boolean(userExist(users, newUser.email));
      if (userExists) {
        setError(ERROR_MSG.USER_EXISTS);
      } else {
        users.push(newUser);
        await setItemInStorage("users", JSON.stringify(users));
        Alert.alert("Signed up successfully");
        setError("");
        setUser(payload);
        await setItemInStorage("user", JSON.stringify(payload));
      }
    } catch (error) {
      Alert.alert("Error fetching data" + error);
    }
  };

  const logout = () => {
    removeItemFromStorage("user");
    setError("");
    setUser(null);
  };

  const setErrors = () => {
    setError("");
  };

  const checkLogin = async () => {
    const data = await getItemFromStorage("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, error, setErrors, checkLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 👇 Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
