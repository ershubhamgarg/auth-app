import { StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStack } from './src/navigation/MainStack';
import { AuthProvider } from './src/context/AuthContext';

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
