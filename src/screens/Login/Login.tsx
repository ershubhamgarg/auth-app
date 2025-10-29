import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useAuth } from "../../context/AuthContext";
import { MainStackParamList } from "../../navigation/MainStack";
import { ERROR_MSG } from "./../../constants/errorConstants";
import { styles } from "./Login.styles";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, user, error, setErrors } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleLogin = () => {
    if (!email.length) {
      setEmailError(ERROR_MSG.EMAIL);
    }
    if (!password.length) {
      setPasswordError(ERROR_MSG.PASSWORD);
    }
    if (email && password) {
      const payload = {
        email,
        password,
      };
      login(payload);
    }
  };

  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
    if (error) {
      Alert.alert(error);
    }
    setErrors?.();
  }, [user, error]);

  const onEmailChange = (e: string) => {
    if (e.length) {
      setEmail(e);
      setEmailError("");
    } else {
      setEmailError(ERROR_MSG.EMAIL);
    }
  };

  const onPasswordChange = (e: string) => {
    if (e.length) {
      setPassword(e);
      setPasswordError("");
    } else {
      setPasswordError(ERROR_MSG.PASSWORD);
    }
  };

  const gotoSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/back.png")}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.alignCenter}>
          <Image
            source={require("../../assets/logo/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>
            Please enter your Email and Password to log in
          </Text>
        </View>
        <Input
          testID="login-username"
          placeholder="Email"
          label="Email"
          keyboardType="email-address"
          value={email}
          containerStyle={styles.emailContainer}
          onChangeText={onEmailChange}
          error={emailError}
        />
        <Input
          testID="login-password"
          placeholder="Password"
          label="Password"
          isPassword
          value={password}
          onChangeText={onPasswordChange}
          error={passwordError}
        />
        <Button
          containerStyle={styles.button}
          label="Log in"
          onPress={handleLogin}
        />
        <View style={styles.alignCenter}>
          <Text style={styles.footer}>
            Don't have an account ?{" "}
            <Pressable onPress={gotoSignup}>
              <Text style={styles.signup}>Signup</Text>
            </Pressable>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
