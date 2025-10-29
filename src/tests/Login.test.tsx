import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import { Login } from "../screens/Login";
import { ERROR_MSG } from "../constants/errorConstants";

// --- Mock navigation ---
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actual = jest.requireActual("@react-navigation/native");
  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

// --- Mock useAuth context ---
const mockLogin = jest.fn();
const mockSetErrors = jest.fn();
let mockUser: any = null;
let mockError: string | null = null;

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    user: mockUser,
    error: mockError,
    setErrors: mockSetErrors,
  }),
}));

// --- Mock Alert.alert ---
jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

describe("Login Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUser = null;
    mockError = null;
  });

  test("renders input fields and button", () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Log in")).toBeTruthy();
  });

  test("shows error if email and password are empty when logging in", () => {
    const { getByTestId } = render(<Login />);
    const button = getByTestId("login-button");
    fireEvent.press(button);

    // It should show error messages
    expect(getByTestId("login-container")).toHaveTextContent(
      /Email is required/
    );
    expect(getByTestId("login-container")).toHaveTextContent(
      /Password is required/
    );
  });

  test("calls login() when both email and password are entered", () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "secret123");
    fireEvent.press(getByText("Log in"));

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "secret123",
    });
  });

  test("navigates to Signup when pressing the Signup text", () => {
    const { getByText } = render(<Login />);
    fireEvent.press(getByText("Signup"));
    expect(mockNavigate).toHaveBeenCalledWith("Signup");
  });

  test("navigates to Home when user is set", async () => {
    mockUser = { id: 1, name: "John" };
    render(<Login />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("Home");
    });
  });

  test("shows alert when error exists", async () => {
    mockError = "Invalid credentials";
    render(<Login />);
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Invalid credentials");
    });
  });

  test("calls setErrors on mount/update", async () => {
    render(<Login />);
    await waitFor(() => {
      expect(mockSetErrors).toHaveBeenCalled();
    });
  });

  test("clears email error when valid email is entered", () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId("email-input");
    fireEvent.changeText(emailInput, "test@example.com");
    expect(getByTestId("login-container")).not.toHaveTextContent(
      /Email is required/
    );
  });

  test("sets email error when cleared", () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId("email-input");
    fireEvent.changeText(emailInput, "");
    expect(getByTestId("login-container")).toHaveTextContent(
      /Email is required/
    );
  });

  test("sets password error when cleared", () => {
    const { getByTestId } = render(<Login />);
    const passwordInput = getByTestId("password-input");

    fireEvent.changeText(passwordInput, "");
    expect(getByTestId("login-container")).toHaveTextContent(
      /Password is required/
    );
  });
});
