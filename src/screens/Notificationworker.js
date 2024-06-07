import { View, ScrollView, Text, Image } from "react-native";

const NotificationFeed = ({ text }) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#F7F9FF",
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          borderRadius: 4,
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../assets/images/profilepic2.png")}
          style={{ width: 30, height: 30 }}
        />
        <View>
          <Text style={{ fontSize: 12, fontWeight: "400" }}>{text}</Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: "rgba(0, 0, 0, 0.65)",
            }}
          >
            10 mins ago
          </Text>
        </View>
      </View>
    </View>
  );
};
const NotificationWorkerScreen = () => {
  return (
    <ScrollView style={{ backgroundColor: "white", padding: 20 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        Notifications
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "500", marginVertical: 16 }}>
        Today
      </Text>
      <NotificationFeed text='Shaw marked "errand" as complete' />
      <NotificationFeed text="Payment To Shade Has Been Completed" />
    </ScrollView>
  );
};

export default NotificationWorkerScreen;
