import { PressableProps, TextProps, ViewProps } from "react-native";

export type ButtonProps = PressableProps & {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  labelStyle?: TextProps["style"];
  containerStyle?: ViewProps["style"];
  loading?: boolean;
};
