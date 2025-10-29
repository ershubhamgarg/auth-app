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
import { validateEmail } from "../../utils/utils";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, user, error, setErrors } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  let allGood = true;
  const handleLogin = () => {
    if (!email.length) {
      setEmailError(ERROR_MSG.EMAIL);
      allGood = false;
    }
    if (!password.length) {
      setPasswordError(ERROR_MSG.PASSWORD);
      allGood = false;
    }
    if (email.length && !validateEmail(email)) {
      setEmailError(ERROR_MSG.INVALID_EMAIL);
      allGood = false;
    }
    if (allGood) {
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
    setEmail(e);
    if (e.length) {
      setEmailError("");
    } else {
      setEmailError(ERROR_MSG.EMAIL);
      allGood = false;
    }
  };

  const onPasswordChange = (e: string) => {
    setPassword(e);
    if (e.length) {
      setPasswordError("");
    } else {
      setPasswordError(ERROR_MSG.PASSWORD);
      allGood = false;
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
        testID="login-container"
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
          testID="email-input"
          placeholder="Email"
          label="Email"
          keyboardType="email-address"
          value={email}
          containerStyle={styles.emailContainer}
          onChangeText={onEmailChange}
          error={emailError}
        />
        <Input
          testID="password-input"
          placeholder="Password"
          label="Password"
          isPassword
          value={password}
          onChangeText={onPasswordChange}
          error={passwordError}
        />
        <Button
          testID={"login-button"}
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
