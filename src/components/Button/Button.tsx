import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import { ButtonProps } from "./Button.types";
import styles from "./Button.styles";
import { WHITE } from "../../constants/styleConstants";

const Button = ({
  label,
  onPress,
  disabled = false,
  labelStyle,
  containerStyle,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      style={[styles.buttonContainer, containerStyle]}
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      {loading && <ActivityIndicator color={WHITE} />}

      <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
    </Pressable>
  );
};

export default Button;
