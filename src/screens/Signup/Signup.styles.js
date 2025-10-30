import { StyleSheet } from "react-native";
import { LIGHT_BLUE, SECONDARY_BLUE } from "../../constants/styleConstants";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
    justifyContent: "center",
  },
  title: { color: LIGHT_BLUE, fontSize: 13, fontWeight: "500" },
  logo: { height: 100, width: 100 },
  button: { marginTop: 50, width: "100%" },
  input: { marginVertical: 15 },
  footer: { marginTop: 10 },
  signup: { color: SECONDARY_BLUE, textDecorationLine: "underline" },
  alignCenter: { alignItems: "center" },
});
