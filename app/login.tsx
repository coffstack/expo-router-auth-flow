import { useAuth } from "@/state/AuthContext";
import { Button, Text, View } from "react-native";
export default function LoginScreen() {
  const { logIn } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> Login Screen</Text>
      <Button title="Login" onPress={logIn} />
    </View>
  );
}
