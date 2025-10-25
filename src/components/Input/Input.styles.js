import { StyleSheet } from "react-native";
import { BLACK, ERROR, GREY } from "../../constants/styleConstants";
const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderBottomWidth: 1,
    borderColor: BLACK,
    width: "100%",
    paddingTop: 10,
  },
  innerContainer: {
    flexDirection: "row",
  },
  outerContainer: {
    width: "100%",
  },
  label: {
    color: GREY,
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    paddingVertical: 5,
    fontSize: 16,
  },
  inputContainer: { flex: 1 },
  eye: {
    height: 20,
    width: 20,
  },
  error: {
    color: ERROR,
    fontSize: 12,
    marginTop: 5,
  },
});

export default styles;
