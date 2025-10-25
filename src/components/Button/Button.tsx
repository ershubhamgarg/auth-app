import React from 'react';
import { Pressable, View, Text, ActivityIndicator } from 'react-native';
import { ButtonProps } from './Button.types';
import styles from './Button.styles';
import { BG_COLOR } from '../../constants/styleConstants';

const Button = ({
  label,
  onPress,
  disabled = false,
  labelStyle,
  containerStyle,
  loading,
}: ButtonProps) => {
  return (
    <Pressable
      style={[styles.buttonContainer, containerStyle]}
      disabled={disabled}
      onPress={onPress}
    >
      {loading && <ActivityIndicator color={BG_COLOR} />}

      <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
    </Pressable>
  );
};

export default Button;
