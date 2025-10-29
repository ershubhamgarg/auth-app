import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";
import { Home } from "../src/screens/Home";

// --- Mock navigation ---
const mockDispatch = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actual = jest.requireActual("@react-navigation/native");
  return {
    ...actual,
    useNavigation: () => ({
      dispatch: mockDispatch,
    }),
    CommonActions: {
      reset: jest.fn((payload) => payload), // return payload so we can inspect it
    },
  };
});

// --- Mock Auth Context ---
const mockLogout = jest.fn();
const mockUser = { name: "John Doe", email: "john@example.com" };

jest.mock("../src/context/AuthContext", () => ({
  useAuth: () => ({
    user: mockUser,
    logout: mockLogout,
  }),
}));

// --- Mock Alert.alert ---
jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

describe("Home Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("matches snapshot", () => {
    const { toJSON } = render(<Home />);
    expect(toJSON()).toMatchSnapshot();
  });

  test("renders user name and email", async () => {
    const { getByTestId, getByText } = render(<Home />);
    expect(getByTestId("card-container")).toBeTruthy();
    expect(getByText("Name : John Doe")).toBeTruthy();
    expect(getByText("E-mail : john@example.com")).toBeTruthy();
  });

  test("shows logout confirmation alert when pressing logout", () => {
    const { getByText } = render(<Home />);
    const logoutButton = getByText("Log out");
    fireEvent.press(logoutButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Logout",
      "Are you sure you want to logout ?",
      expect.any(Array)
    );
  });

  test("calls logout and navigates to Login when confirming logout", () => {
    const alertSpy = jest
      .spyOn(Alert, "alert")
      .mockImplementation((title, msg, buttons) => {
        // Simulate pressing "Yes"
        const yesButton = buttons?.find((b) => b.text === "Yes");
        yesButton?.onPress?.();
      });

    const { getByText } = render(<Home />);
    fireEvent.press(getByText("Log out"));

    expect(mockLogout).toHaveBeenCalled();

    // Verify navigation reset call
    expect(mockDispatch).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: "Login" }],
    });

    alertSpy.mockRestore();
  });

  test('does not logout when pressing "No" on alert', () => {
    const alertSpy = jest
      .spyOn(Alert, "alert")
      .mockImplementation((title, msg, buttons) => {
        const noButton = buttons?.find((b) => b.text === "No");
        noButton?.onPress?.(); // simulate pressing "No"
      });

    const { getByText } = render(<Home />);
    fireEvent.press(getByText("Log out"));

    expect(mockLogout).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});
