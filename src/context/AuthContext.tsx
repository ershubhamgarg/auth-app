import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
type User = {
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

const findUser = (db: User[], payload: LoginPaylod) => {
  if (db.length) {
    return db.filter(
      (user) =>
        user.email.toLowerCase() === payload.email.toLowerCase() &&
        user.password === payload.password
    )[0];
  } else {
    return null;
  }
};
const userExist = (db: User[], email: string) => {
  if (db.length) {
    return db.filter(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    )[0];
  } else {
    return null;
  }
};

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
      const data = await AsyncStorage.getItem("users");
      const users = await JSON.parse(data ?? "[]");
      const user = findUser(users, payload);
      if (user) {
        setError("");
        setUser(user);
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } else {
        setError("Please check email/ password");
      }
    } catch {
      console.log("error");
    }
  };

  const signup = async (payload: User) => {
    try {
      const data = await AsyncStorage.getItem("users");
      const users = await JSON.parse(data ?? "[]");
      const newUser = payload;
      const userExists = Boolean(userExist(users, newUser.email));
      if (userExists) {
        setError("User already exists. Please log in.");
      } else {
        users.push(newUser);
        await AsyncStorage.setItem("users", JSON.stringify(users));
        Alert.alert("Signed up successfully");
        setError("");
        setUser(payload);
        await AsyncStorage.setItem("user", JSON.stringify(payload));
      }
    } catch (error) {
      Alert.alert("Error fetching data" + error);
    }
  };

  const logout = () => {
    AsyncStorage.removeItem("user");
    setError("");
    setUser(null);
  };

  const setErrors = () => {
    setError("");
  };

  const checkLogin = async () => {
    const data = await AsyncStorage.getItem("user");
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
