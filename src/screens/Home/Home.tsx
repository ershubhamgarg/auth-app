import { Alert, StatusBar, Text, useColorScheme, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../../navigation/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./Home.styles";
import { useAuth } from "../../context/AuthContext";
export const Home = () => {
  const { user, logout } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout ?", [
      { text: "No" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          logout();

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        },
      },
    ]);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.name}>{`Name : ${user?.name}`}</Text>
            <Text style={styles.email}>{`E-mail : ${user?.email}`}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button label="Log out" onPress={() => handleLogout()} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
