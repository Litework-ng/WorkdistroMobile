import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Briefcase, Location } from "iconsax-react-native";

const Bids = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const handleRating = (ratedValue) => {
    // Handle the rated value (1 to 5) as needed
    setRating(ratedValue);
  };
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 20,
        backgroundColor: "#fff",
        borderColor: "#D0D0D0",
        marginBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../../assets/images/profilepic2.png")}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <View>
          <View style={{ flexDirection: "row", gap: 140 }}>
            <Text style={{ fontSize: 14, fontWeight: "500" }}>Tosin Alabi</Text>
            <Text style={{ fontSize: 10, fontWeight: "400", color: "#636363" }}>
              3 mins ago
            </Text>
          </View>
          <AirbnbRating
            count={5}
            defaultRating={0}
            size={10}
            onFinishRating={handleRating}
            ratingContainerStyle={{
              padding: 0,
              margin: 0,
              alignSelf: "flex-start",
            }}
            starContainerStyle={{ margin: 0, padding: 0, gap: -4 }}
            showRating={false}
          />
          <View style={{ flexDirection: "row", gap: 32 }}>
            <View
              style={{ flexDirection: "row", alignContent: "center", gap: 5 }}
            >
              <Briefcase size={10} style={{ marginTop: 2 }} color="#6B6B6B" />
              <Text
                style={{ fontSize: 12, fontWeight: "400", color: "#6B6B6B" }}
              >
                20 jobs completed
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignContent: "center", gap: 5 }}
            >
              <Location size={10} style={{ marginTop: 2 }} color="#6B6B6B" />
              <Text
                style={{ fontSize: 12, fontWeight: "400", color: "#6B6B6B" }}
              >
                Ikeja, Lagos
              </Text>
            </View>
          </View>
          <Text
            style={{ fontSize: 14, fontWeight: "600", alignSelf: "flex-start" }}
          >
            Bid:N5000
          </Text>
        </View>
      </View>

      <Text style={{ fontSize: 14, fontWeight: "600", marginTop: 20 }}>
        Cover Letter
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "400",
          color: "#3F3F3F",
          marginTop: 10,
          width: 335,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        iaculis molestie nisi vitae tincidunt. Nulla at ante mauris. Cras
        hendrerit placerat erat aliquet scelerisque. Sed malesuada ornare eros,
        vitae faucibus odio sollicitudin eu.
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 32,
          alignSelf: "center",
          marginTop: 27,
        }}
      >
        <TouchableOpacity
          style={styles.viewProfileButton}
          onPress={() => navigation.navigate("ViewProfile")}
        >
          <Text style={styles.viewProfileButtonText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.hireButton}
          onPress={() => navigation.navigate("Hire")}
        >
          <Text style={styles.hireButtonText}>Hire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewProfileButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 119,
    borderWidth: 1,
  },
  viewProfileButtonText: {
    color: "#1F2A47",
    fontWeight: "bold",
  },

  hireButton: {
    backgroundColor: "#1F2A47",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 119,
  },
  hireButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Bids;
