import messaging from "@react-native-firebase/messaging";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function App() {

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
    return enabled;
  };

  useEffect(() => {
    if(requestUserPermission()){
      messaging()
        .getToken()
        .then((token) => {
          console.log(token)
        });
    }else{
        console.log("Permission not granted",authStatus);
      }

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage) {
            console.log(
              "Notification caused app to open from quit state:",
              remoteMessage.notification
            );
          }
        });
      
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          "Notification caused app to open from background state",
          remoteMessage.notification
        );
      });

      // Background message handler
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage);
      });

      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        Alert.alert(
          "A new FCM message arrived!",
          JASON.stringify(remoteMessage)
        );
      });

      return unsubscribe;

  }, []);

  return (
    <View style={styles.container}>
      <Text>FCM Tutorial</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
