import { render } from "@testing-library/react-native";
import { Signup } from "../screens/Signup";

describe("Test Signup screeen", () => {
  test("matches snapshot", () => {
    const { toJSON } = render(<Signup />);
    expect(toJSON()).toMatchSnapshot();
  });
});
