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
import { HomeStackParamList } from "../../navigation/HomeStack";
import { styles } from "./Signup.styles";
import { ERROR_MSG } from "../../constants/errorConstants";
import { ERROR } from "../../constants/styleConstants";
export const Signup = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { signup, user, error, setErrors } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleSignup = () => {
    if (!name.length) {
      setNameError(ERROR_MSG.NAME);
    }
    if (!email.length) {
      setEmailError(ERROR_MSG.EMAIL);
    }
    if (!password.length) {
      setPasswordError(ERROR_MSG.PASSWORD);
    }
    if (!confirmPassword.length) {
      setConfirmPasswordError(ERROR_MSG.CONFIRM_PASSWORD);
    }
    if (email && password) {
      const payload = {
        name,
        email,
        password,
      };
      signup(payload);
    }
  };

  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
      return;
    }
    if (error) {
      Alert.alert(error);
      setErrors?.();
    }
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

  const onConfirmPasswordChange = (e: string) => {
    if (e.length) {
      setConfirmPassword(e);
      setConfirmPasswordError("");
    } else {
      setConfirmPasswordError(ERROR_MSG.CONFIRM_PASSWORD);
    }
  };

  const onNameChange = (e: string) => {
    if (e.length) {
      setName(e);
      setNameError("");
    } else {
      setNameError(ERROR_MSG.NAME);
    }
  };

  const gotoLogin = () => {
    navigation.goBack();
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
          <Text style={styles.title}>Please enter your details to sign up</Text>
        </View>
        <Input
          placeholder="Name"
          label="Name"
          keyboardType="default"
          containerStyle={styles.input}
          onChangeText={onNameChange}
          error={nameError}
        />
        <Input
          placeholder="Email"
          label="Email"
          keyboardType="email-address"
          containerStyle={styles.input}
          onChangeText={onEmailChange}
          error={emailError}
        />
        <Input
          placeholder="Password"
          label="Password"
          isPassword
          containerStyle={styles.input}
          onChangeText={onPasswordChange}
          error={passwordError}
        />
        <Input
          placeholder="Confirm Password"
          label="Confirm Password"
          isPassword
          containerStyle={styles.input}
          onChangeText={onConfirmPasswordChange}
          error={confirmPasswordError}
        />

        <Button
          containerStyle={styles.button}
          label="Sign up"
          onPress={handleSignup}
        />
        <View style={styles.alignCenter}>
          <Text style={styles.footer}>
            Already have an account ?{" "}
            <Pressable onPress={gotoLogin}>
              <Text style={styles.signup}>Login</Text>
            </Pressable>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
