import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { faChevronLeft, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DropdownInput from "../components/DropDown";
import MonthDropdown from "../components/Monthdropdown";

const TransactionFeedMinus = ({ payer, time, amount }) => {
  return (
    <View
      style={{
        marginBottom: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          source={require("../../assets/images/profilepic2.png")}
          style={{ width: 30, height: 30 }}
        />
        <View>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#000" }}>
            {payer}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "400", color: "#797979" }}>
            {time}
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 14, fontWeight: "700", color: "#C11414" }}>
        {amount}
      </Text>
    </View>
  );
};

const TransactionFeedPlus = ({ payer, time, amount }) => {
  return (
    <View
      style={{
        marginBottom: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          source={require("../../assets/images/profilepic2.png")}
          style={{ width: 30, height: 30 }}
        />
        <View>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#000" }}>
            {payer}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "400", color: "#797979" }}>
            {time}
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 14, fontWeight: "700", color: "#19B00C" }}>
        {amount}
      </Text>
    </View>
  );
};

const PaymentHistory = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleDropdownChange = (value) => {
    setSelectedValue(value);
  };
  const dropdownItems = [
    { label: "January", value: "Jan" },
    { label: "febraury", value: "Feb" },
    { label: "March", value: "Mar" },
    { label: "April", value: "Apr" },
    { label: "May", value: "May" },
    { label: "June", value: "Jun" },
    { label: "July", value: "Jul" },
    { label: "August", value: "Aug" },
    { label: "September", value: "Sept" },
    { label: "October", value: "Oct" },
    { label: "November", value: "Nov" },
    { label: "December", value: "Dec" },
  ];
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment History</Text>
      </View>
      <View>
        <View style={{ paddingHorizontal: 20, height: 40 }}>
          <MonthDropdown
            items={dropdownItems}
            onValueChange={handleDropdownChange}
          />
          <TouchableOpacity style={styles.dropdownIcon}>
            <FontAwesomeIcon icon={faAngleDown} size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            gap: 22,
            marginBottom: 8,
          }}
        >
          <View
            style={{ flexDirection: "row", gap: 3, justifyContent: "center" }}
          >
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#8B8B8B" }}>
              In
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "500" }}>N20,000.00</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 3 }}>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#8B8B8B" }}>
              Out
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "500" }}>N10,000.00</Text>
          </View>
        </View>
        <Text
          style={{
            backgroundColor: "#EDF2FF",
            paddingVertical: 2,
            paddingLeft: 20,
            fontSize: 12,
            fontWeight: "400",
            color: "#9B9B9B",
            marginTop: 13,
            marginBottom: 26,
          }}
        >
          19th May 2023
        </Text>
        <TransactionFeedPlus payer="Monnify" time="7:45pm" amount="+N5000" />
        <TransactionFeedMinus
          payer="Tosin Alabi"
          time="7:45pm"
          amount="-N5000"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    gap: 124,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 35,
    paddingLeft: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  dropdownIcon: {
    padding: 10,
    position: "relative",
    left: 65,
    bottom: 50,
  },
});

export default PaymentHistory;
