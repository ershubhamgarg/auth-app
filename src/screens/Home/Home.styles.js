import { StyleSheet } from "react-native";
import {
  BG_COLOR,
  BUTTON_COLOR,
  LIGHT_BLUE,
} from "../../constants/styleConstants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  cardContainer: { flex: 0.8, alignItems: "center", justifyContent: "center" },
  card: {
    borderWidth: 1,
    width: "80%",
    padding: 20,
    // borderRadius: 10,
    backgroundColor: BG_COLOR,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
  },
  buttonContainer: { flex: 0.2, padding: 40 },
  name: {
    color: BUTTON_COLOR,
    fontWeight: "800",
    fontSize: 20,
  },
  email: {
    color: BUTTON_COLOR,
    fontWeight: "500",
    fontSize: 15,
  },
});
