import { TextProps, ViewProps } from 'react-native';

export type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  labelStyle?: TextProps['style'];
  containerStyle?: ViewProps['style'];
  loading?: boolean;
};
