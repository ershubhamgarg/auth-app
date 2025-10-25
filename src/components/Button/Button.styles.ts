import { StyleSheet } from "react-native";
import { BUTTON_COLOR, WHITE } from "./../../constants/styleConstants";
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    backgroundColor: BUTTON_COLOR,
    padding: 10,
    borderRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  label: {
    color: WHITE,
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 10,
  },
});

export default styles;
