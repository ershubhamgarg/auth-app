import { LogBox, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext";
import { MainStack } from "./src/navigation/MainStack";

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthProvider>
        <MainStack />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
