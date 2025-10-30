import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext";
import { MainStackParamList } from "../../navigation/MainStack";
import { styles } from "./Home.styles";
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
    <SafeAreaView style={styles.container}>
      <View testID="card-container" style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.name}>{`Name : ${user?.name}`}</Text>
          <Text style={styles.email}>{`E-mail : ${user?.email}`}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          testID="logout-button"
          label="Log out"
          onPress={() => handleLogout()}
        />
      </View>
    </SafeAreaView>
  );
};
