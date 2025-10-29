import { render } from "@testing-library/react-native";
import { Home } from "../screens/Home";

describe("Test Home screeen", () => {
  test("matches snapshot", () => {
    const { toJSON } = render(<Home />);
    expect(toJSON()).toMatchSnapshot();
  });
});
