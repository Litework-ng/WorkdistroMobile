import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ToastAndroid,
  Modal,
  FlatList,
} from "react-native";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CheckBoxForm from "react-native-checkbox-form";
import { RadioButton } from "react-native-paper";
import CustomRadioButton from "../components/CustomRadioButton";
import Button from "../components/Button";
import Toast from "react-native-root-toast";
import FetchLocation from "../utils/Location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const PaymentScreen = ({
  onChange,
  jobDetails,
  onNext,
  StepIndicator,
  step,
  navigation,
  onPrev,
}) => {
  const [budget, setBudget] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [location, setLocation] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [predictedLocation, setPredictedLocation] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleBudgetChange = (value) => {
    setBudget(value);
  };

  const handlePaymentMethodChange = (method) => {
    onChange("paymentMethod", method);
  };

  const handleLocationChange = (value) => {
    setLocation(value);
  };

  const toggleCurrentLocation = () => {
    setUseCurrentLocation(!useCurrentLocation);
  };

  const handleTermsCheck = () => {
    setUseCurrentLocation(!useCurrentLocation);
  };

  const handleLocationInputChange = (text) => {
    setLocation(text);
    FetchLocation(text)
      .then((response) => {
        const { predictions } = response;
        setPredictedLocation(predictions);
      })
      .catch((error) => console.log(error, "error"));
  };

  const data = [
    {
      label: "Use current location",
      value: "remember",
      RNchecked: useCurrentLocation,
    },
  ];

  return (
    <>
      <Modal visible={showModal} transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.modalInput}
              placeholder="12, Lagos Street, Lagos, Nigeria"
              placeholderTextColor={"white"}
              autoFocus={true}
              onChangeText={handleLocationInputChange}
              value={location}
            />
            <FlatList
              style={styles.modalList}
              data={predictedLocation}
              keyExtractor={(item) => item.placeId}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange("location", item.description);
                    setShowModal(false);
                  }}
                >
                  <View style={styles.modalListItem}>
                    <Text style={styles.modalListItemText}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.modalEmptyContainer}>
                  <Text style={styles.modalEmptyText}>
                    Sorry, We can't match your input with a result. Try typing a
                    valid address with a country and state.
                  </Text>
                </View>
              }
            />
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Ionicons
                name="close"
                size={25}
                color={"red"}
                style={styles.modalCloseIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onPrev}>
              <FontAwesomeIcon icon={faChevronLeft} size={24} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Payment</Text>
          </View>
          <StepIndicator step={step} />
          <Text style={styles.budgetInputLabel}>Budget</Text>
          <TextInput
            style={styles.budgetInput}
            keyboardType="numeric"
            placeholder="5000"
            onChangeText={(text) => onChange("budget", text)}
            value={jobDetails.budget}
          />
          <Text style={styles.paymentMethodLabel}>Payment Method</Text>
          <View style={styles.paymentMethodContainer}>
            <CustomRadioButton
              label="Wallet"
              checked={jobDetails.paymentMethod === "wallet"}
              onPress={() => handlePaymentMethodChange("wallet")}
            />
            <CustomRadioButton
              label="Cash"
              checked={jobDetails.paymentMethod === "cash"}
              onPress={() => handlePaymentMethodChange("cash")}
            />
          </View>
          <View style={styles.locationContainer}>
            <Text>Location</Text>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <View style={styles.locationInput}>
                <Text>
                  {jobDetails.location === ""
                    ? "Type in a location"
                    : jobDetails.location}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
         
          <Button
            text="Review Post"
            onPress={() => {
              if (jobDetails.budget < 1000) {
                Toast.show("Your Budget must be at least a thousand Naira", {
                  duration: Toast.durations.LONG,
                  backgroundColor: "red",
                  position: Toast.positions.TOP,
                  shadow: false,
                  opacity: 0.8,
                });
                return;
              }
              onNext();
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollViewContainer: {
    padding: 20,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    gap: 84,
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  budgetInputLabel: {
    color: "#525252",
    marginTop: 37,
    marginBottom: 5,
  },
  budgetInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
  },
  paymentMethodLabel: {
    marginTop: 32,
    marginBottom: 6.5,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    gap: 64,
  },
  locationContainer: {
    marginTop: 34,
  },
  locationInput: {
    padding: 15,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  checkboxContainer: {
    alignSelf: "flex-start",
    width: 150,
    padding: 10,
    marginBottom: 100,
  },
  checkboxText: {
    fontSize: 12,
    color: "#1F2A47",
  },
  modalOverlay: {
    backgroundColor: "black",
    opacity: 0.9,
    padding: 20,
    flex: 1,
  },
  modalContainer: {
    marginTop: 10,
  },
  modalInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 4,
    paddingHorizontal: 20,
    color: "white",
  },
  modalList: {
    flex: 1,
    marginTop: 20,
  },
  modalListItem: {
    backgroundColor: "white",
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  modalListItemText: {
    color: "black",
  },
  modalEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalEmptyText: {
    color: "white",
    textAlign: "center",
  },
  modalCloseIcon: {
    alignSelf: "center",
  },
});

export default PaymentScreen;
