import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import { Signup } from "../src/screens/Signup";

// --- Mock navigation ---
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actual = jest.requireActual("@react-navigation/native");
  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
  };
});

// --- Mock AuthContext ---
const mockSignup = jest.fn();
const mockSetErrors = jest.fn();
let mockUser: any = null;
let mockError: string | null = null;

jest.mock("../src/context/AuthContext", () => ({
  useAuth: () => ({
    signup: mockSignup,
    user: mockUser,
    error: mockError,
    setErrors: mockSetErrors,
  }),
}));

// --- Mock Alert ---
jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

describe("Signup Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUser = null;
    mockError = null;
  });

  test("matches snapshot", () => {
    const { toJSON } = render(<Signup />);
    expect(toJSON()).toMatchSnapshot();
  });

  test("renders all input fields and sign up button", () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);
    expect(getByPlaceholderText("Name")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByPlaceholderText("Confirm Password")).toBeTruthy();
    expect(getByText("Sign up")).toBeTruthy();
  });

  test("shows errors when fields are empty on submit", () => {
    const { getByTestId, getByPlaceholderText } = render(<Signup />);
    fireEvent.press(getByTestId("signup-button"));
    const signupContainer = getByTestId("signup-container");
    // Check validation
    expect(signupContainer).toHaveTextContent(/Name is required/);
    expect(signupContainer).toHaveTextContent(/Email is required/);
    expect(signupContainer).toHaveTextContent(/Password is required/);
    expect(signupContainer).toHaveTextContent(/Confirm password is required/);
    expect(mockSignup).not.toHaveBeenCalled();
  });

  test("shows password mismatch error", () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<Signup />);
    fireEvent.changeText(getByPlaceholderText("Name"), "John");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "123456");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "654321");

    fireEvent.press(getByText("Sign up"));
    const signupContainer = getByTestId("signup-container");
    expect(signupContainer).toHaveTextContent(
      /Password and confirm password do not match/
    );
    expect(mockSignup).not.toHaveBeenCalled();
  });

  test("calls signup when all inputs are valid", () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);
    fireEvent.changeText(getByPlaceholderText("Name"), "John");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "123456");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "123456");

    fireEvent.press(getByText("Sign up"));

    expect(mockSignup).toHaveBeenCalledWith({
      name: "John",
      email: "john@example.com",
      password: "123456",
    });
  });

  test("navigates to Home when user is set", async () => {
    mockUser = { id: 1, name: "John" };
    render(<Signup />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("Home");
    });
  });

  test("shows alert when error exists", async () => {
    mockError = "Something went wrong";
    render(<Signup />);
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Something went wrong");
      expect(mockSetErrors).toHaveBeenCalled();
    });
  });

  test("clears field errors on valid input", () => {
    const { getByPlaceholderText, getByTestId } = render(<Signup />);
    const nameInput = getByPlaceholderText("Name");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm Password");

    fireEvent.changeText(nameInput, "Jane");
    fireEvent.changeText(emailInput, "jane@example.com");
    fireEvent.changeText(passwordInput, "abc123");
    fireEvent.changeText(confirmPasswordInput, "abc123");

    const signupContainer = getByTestId("signup-container");
    expect(signupContainer).not.toHaveTextContent(/Name is required/);
    expect(signupContainer).not.toHaveTextContent(/Email is required/);
    expect(signupContainer).not.toHaveTextContent(
      /Please enter a valid email id/
    );
    expect(signupContainer).not.toHaveTextContent(/Email is required/);
    expect(signupContainer).not.toHaveTextContent(
      /Confirm password is required/
    );
    expect(signupContainer).not.toHaveTextContent(
      /Password and confirm password do not match/
    );
  });

  test("navigates back to login when pressing Login text", () => {
    const { getByText } = render(<Signup />);
    fireEvent.press(getByText("Login"));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
