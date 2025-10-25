import { TextInputProps, TextProps, ViewProps } from "react-native";

export type InputProps = TextInputProps & {
  label: string;
  labelStyle?: TextProps["style"];
  containerStyle?: ViewProps["style"];
  isPassword?: boolean;
  error?: string;
};
