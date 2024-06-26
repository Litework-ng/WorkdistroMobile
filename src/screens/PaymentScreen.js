import React, { useEffect, useState } from "react";
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
import FetchLoction from "../utils/Location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRef } from "react";

const PaymentScreen = ({
  onChange,
  jobDetails,
  onNext,
  StepIndicator,
  step,
  navigation,
  onPrev,
}) => {
  const [budget, setBudget] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("wallet");
  const [location, setLocation] = React.useState("");
  const [useCurrentLocation, setUseCurrentLocation] = React.useState(false);
  const [predictedLocation, setPredictedLocation] = useState([]);
  const [validBudget, setValidBudget] = useState(false);
  const [showModal, setShowodal] = useState(false);
  // const [selection, setSelection] = useState({ start: 0, end: 0 });
  // const textInputRef = useRef(null);
  console.log(location, "obvious");

  // useEffect(() => {
  //   if (textInputRef.current) {
  //     textInputRef.current.setNativeProps({ selection: { start: 0, end: 0 } });
  //   }
  // }, []);

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
  const data = [
    {
      label: "Use current location",
      value: "remember",
      RNchecked: useCurrentLocation,
    },
  ];

  const handleTermsCheck = () => {
    setUseCurrentLocation(!useCurrentLocation);
  };
  return (
    <>
      <Modal visible={showModal} transparent={true}>
        <View
          style={{
            backgroundColor: "black",
            opacity: 0.9,
            padding: 20,
            flex: 1,
          }}
        >
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 5,
                borderRadius: 4,
                paddingHorizontal: 20,
                marginTop: 5,
                height: 50,
                color: "white",
              }}
              placeholder="12, Lagos Street, Lagos, Nigeria"
              placeholderTextColor={"white"}
              autoFocus={true}
              onChangeText={(text) => {
                setLocation(text);
                FetchLoction(text)
                  .then((e) => {
                    const { predictions, status } = e;
                    const { description, placeId: place_id } = predictions;

                    setPredictedLocation(predictions);
                  })
                  .catch((e) => console.log(e, "err"));
              }}
              value={location}
            />
          </View>
          <View
            style={{
              width: "100%",
              // height: "70%",
              flex: 1,
              marginTop: 20,
              // backgroundColor: "pink",
            }}
          >
            <FlatList
              style={{
                flex: 1,
                // backgroundColor: "green",
              }}
              data={predictedLocation}
              keyExtractor={(item) => {
                return item.placeId;
              }}
              renderItem={({ item }) => {
                return predictedLocation.length == 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "red",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",

                        textAlign: "center",
                      }}
                    >
                      Sorry, We can't match your input with a result, Try typing
                      a valid address with a country and state
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      onChange("location", item.description);
                      setShowodal(false);
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "white",
                        marginHorizontal: 5,

                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        borderRadius: 20,
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                        }}
                      >
                        {item.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            ></FlatList>
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowodal(false);
            }}
          >
            <Ionicons
              name="close"
              size={25}
              color={"red"}
              style={{
                alignSelf: "center",
              }}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </Modal>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View
          // keyboardShouldPersistTaps="always"
          style={{ backgroundColor: "#ffffff", padding: 20, marginTop: 20 }}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onPrev}>
              <FontAwesomeIcon icon={faChevronLeft} size={24} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Payment</Text>
          </View>
          <StepIndicator step={step} />

          <Text style={styles.budgetInputLabel}>Budget</Text>
          <TextInput
            style={{
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 4,
              borderColor: "#6B6B6B",
              marginBottom: 20,
              width: "100%",

              height: 50,
              paddingHorizontal: 20,
            }}
            keyboardType="numeric"
            placeholder="5000"
            onChangeText={(text) => {
              onChange("budget", text);
            }}
            value={jobDetails.budget}
          />
          <Text style={{ marginTop: 32, marginBottom: 6.5 }}>
            Payment Method
          </Text>
          <View style={{ flexDirection: "row", gap: 64 }}>
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
          <View style={{ marginTop: 34 }}>
            <Text>Location</Text>
            {/* <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 5,
                borderRadius: 4,
                paddingHorizontal: 20,
                marginTop: 5,
                height: 50,
              }}
              placeholder="12, Lagos Street, Lagos, Nigeria"
              onChangeText={() => {
                setShowodal(!showModal);
              }}
              value={jobDetails.location}
            /> */}
            <TouchableOpacity
              onPress={() => {
                setShowodal(true);
              }}
            >
              <View
                style={{
                  padding: 15,
                  borderRadius: 10,
                  borderColor: "gray",
                  borderWidth: 1,
                }}
              >
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <Text>
                    {jobDetails.location == ""
                      ? "Type in a location"
                      : jobDetails.location}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <CheckBoxForm
            style={styles.checkboxContainer}
            iconSize={24}
            iconColor="#000"
            textStyle={{ fontSize: 12, color: "#1F2A47" }}
            onChecked={handleTermsCheck}
            itemCheckedKey="RNchecked"
            dataSource={data}
            renderItem={(item) => <CheckBox label={item.label} />}
          />

          <Button
            text="Review Post"
            onPress={() => {
              if (jobDetails.budget < 1000) {
                Toast.show("Your Budget must be atleast a thousand Naira", {
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
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
const styles = StyleSheet.create({
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
  checkboxContainer: {
    alignSelf: "flex-start",
    width: 150,
    padding: 10,
    marginBottom: 100,
  },
  nextButton: {
    backgroundColor: "#1F2A47",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 355,
    height: 50,
    marginBottom: 16,
    marginTop: 109,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PaymentScreen;
