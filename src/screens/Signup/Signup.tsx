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
import { validateEmail } from "../../utils/utils";
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
  let allGood = true;
  const handleSignup = () => {
    if (!name.length) {
      setNameError(ERROR_MSG.NAME);
      allGood = false;
    }
    if (!email.length) {
      setEmailError(ERROR_MSG.EMAIL);
      allGood = false;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email id");
      allGood = false;
    }
    if (!password.length) {
      setPasswordError(ERROR_MSG.PASSWORD);
      allGood = false;
    }
    if (!confirmPassword.length) {
      setConfirmPasswordError(ERROR_MSG.CONFIRM_PASSWORD);
      allGood = false;
    }
    if (
      password.length &&
      confirmPassword.length &&
      password !== confirmPassword
    ) {
      setConfirmPasswordError(ERROR_MSG.PASSWORD_MISMATCH);
      allGood = false;
    }

    if (allGood) {
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
      setConfirmPasswordError("");
    } else {
      setPasswordError(ERROR_MSG.PASSWORD);
      allGood = false;
    }
  };

  const onConfirmPasswordChange = (e: string) => {
    setConfirmPassword(e);
    if (e.length) {
      setConfirmPasswordError("");
    } else {
      setConfirmPasswordError(ERROR_MSG.CONFIRM_PASSWORD);
      allGood = false;
    }
  };

  const onNameChange = (e: string) => {
    setName(e);
    if (e.length) {
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
          value={name}
          containerStyle={styles.input}
          onChangeText={onNameChange}
          error={nameError}
        />
        <Input
          placeholder="Email"
          label="Email"
          value={email}
          keyboardType="email-address"
          containerStyle={styles.input}
          onChangeText={onEmailChange}
          error={emailError}
        />
        <Input
          placeholder="Password"
          label="Password"
          isPassword
          value={password}
          containerStyle={styles.input}
          onChangeText={onPasswordChange}
          error={passwordError}
        />
        <Input
          placeholder="Confirm Password"
          label="Confirm Password"
          isPassword
          value={confirmPassword}
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
