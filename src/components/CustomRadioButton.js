import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";

const CustomRadioButton = ({ label, checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
      <FontAwesomeIcon
        icon={checked ? faDotCircle : faCircle}
        size={20}
        color={checked ? "#31DE9E" : "#31DE9E"}
        style={{ borderWidth: 1, borderRadius: 10 }}
      />
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonLabel: {
    marginLeft: 8,
  },
});

export default CustomRadioButton;
