import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const { View, TouchableOpacity } = require("react-native");

  const Swipeable = React.forwardRef(
    ({ children, renderRightActions, ...props }, ref) => {
      React.useImperativeHandle(
        ref,
        () => ({
          close: jest.fn(),
          openLeft: jest.fn(),
          openRight: jest.fn(),
        }),
        []
      );
      return React.createElement(View, { ref, ...props }, [
        children,
        typeof renderRightActions === "function" ? renderRightActions() : null,
      ]);
    }
  );

  const mockGesture = {
    onUpdate: jest.fn().mockReturnThis(),
    onEnd: jest.fn().mockReturnThis(),
    onStart: jest.fn().mockReturnThis(),
    onFinalize: jest.fn().mockReturnThis(),
    enabled: jest.fn().mockReturnThis(),
    shouldCancelWhenOutside: jest.fn().mockReturnThis(),
    simultaneousWithExternalGesture: jest.fn().mockReturnThis(),
    requireExternalGestureToFail: jest.fn().mockReturnThis(),
  };

  return {
    ...require("react-native-gesture-handler/jestSetup"),
    GestureHandlerRootView: ({ children, ...props }) =>
      React.createElement(
        View,
        { testID: "gesture-handler-root-view", ...props },
        children
      ),
    GestureDetector: ({ children, ...props }) =>
      React.createElement(
        View,
        { testID: "gesture-detector", ...props },
        children
      ),
    ScrollView: React.forwardRef((props, ref) =>
      React.createElement(View, { ref, ...props })
    ),
    PanGestureHandler: View,
    TapGestureHandler: View,
    LongPressGestureHandler: View,
    TouchableOpacity,
    Swipeable,
    State: {},
    Directions: {},
    Gesture: {
      Pan: jest.fn(() => mockGesture),
      Tap: jest.fn(() => mockGesture),
      LongPress: jest.fn(() => mockGesture),
      Pinch: jest.fn(() => mockGesture),
      Rotation: jest.fn(() => mockGesture),
      Fling: jest.fn(() => mockGesture),
      Native: jest.fn(() => mockGesture),
      Manual: jest.fn(() => mockGesture),
      Race: jest.fn(() => mockGesture),
      Simultaneous: jest.fn(() => mockGesture),
      Exclusive: jest.fn(() => mockGesture),
    },
  };
});
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});
