import { render } from "@testing-library/react-native";
import { Login } from "../screens/Login";

describe("Test login screeen", () => {
  test("matches snapshot", () => {
    const { toJSON } = render(<Login />);
    expect(toJSON()).toMatchSnapshot();
  });
});
