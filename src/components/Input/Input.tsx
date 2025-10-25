import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { InputProps } from "./Input.types";
import styles from "./Input.styles";

const Input = ({
  label,
  labelStyle,
  containerStyle,
  onChangeText,
  isPassword = false,
  error,
  ...props
}: InputProps) => {
  const [show, setShow] = useState(false);
  const onPressEye = () => {
    setShow(!show);
  };
  return (
    <View style={[styles.outerContainer, containerStyle]}>
      <View style={styles.container}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <View style={styles.innerContainer}>
          <TextInput
            autoCapitalize="none"
            style={[styles.input, styles.inputContainer]}
            onChangeText={onChangeText}
            secureTextEntry={isPassword && !show}
            autoComplete="off"
            autoCorrect={false}
            {...props}
          />
          {isPassword && (
            <Pressable onPress={onPressEye}>
              <Image
                style={[styles.eye]}
                source={
                  show
                    ? require("../../assets/icons/view.png")
                    : require("../../assets/icons/hide.png")
                }
                resizeMode="contain"
              />
            </Pressable>
          )}
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
