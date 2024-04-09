import { StyleSheet, Platform, Alert, Button } from "react-native";

import { Text, View } from "../../components/Themed";
import { usePushNotification } from "../../hooks/usePushNotification";

export default function TabThreeScreen() {
  const { expoPushToken, notification } = usePushNotification();
  const data = JSON.stringify(notification, undefined, 2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification</Text>
      <Text>Token: {expoPushToken?.data ?? ""}</Text>
      <Text>Notification: {data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
