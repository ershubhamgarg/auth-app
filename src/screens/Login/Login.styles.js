import { StyleSheet } from "react-native";
import { LIGHT_BLUE, SECONDARY_BLUE } from "../../constants/styleConstants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: { color: LIGHT_BLUE, fontSize: 13, fontWeight: "500" },
  logo: { height: 120, width: 120 },
  button: { marginTop: 50, width: "100%" },
  emailContainer: { marginVertical: 30 },
  footer: { marginTop: 10 },
  signup: { color: SECONDARY_BLUE, textDecorationLine: "underline" },
  alignCenter: { alignItems: "center" },
});
