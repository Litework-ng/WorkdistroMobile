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
import {
  faSearch,
  faEdit,
  faLocationDot,
  faDollarSign,
  faChevronLeft,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const Reviews = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const handleRating = (ratedValue) => {
    // Handle the rated value (1 to 5) as needed
    setRating(ratedValue);
  };
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: "row", paddingTop: 20 }}>
        <Image
          source={require("../../assets/images/profilepic2.png")}
          style={{ width: 30, height: 30, marginRight: 10 }}
        />
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 5 }}>
              Ife Aduralere
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 125 }}>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#797979" }}>
              11th May 2023
            </Text>
            <AirbnbRating
              count={5}
              defaultRating={0}
              size={12}
              onFinishRating={handleRating}
              ratingContainerStyle={{
                padding: 0,
                margin: 0,
                alignSelf: "flex-start",
              }}
              starContainerStyle={{ margin: 0, padding: 0, gap: -4 }}
              showRating={false}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 32 }}></View>
        </View>
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "400",
          color: "#3F3F3F",
          width: 335,
          marginTop: 5,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        iaculis molestie nisi .
      </Text>
    </View>
  );
};

export default Reviews;
