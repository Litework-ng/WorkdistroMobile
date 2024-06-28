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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { RadioButton } from "react-native-paper";
import CustomRadioButton from "../components/CustomRadioButton";
import Button from "../components/Button";
import Toast from "react-native-root-toast";
import FetchLoction from "../utils/Location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRef } from "react";
import CustomCheckBox from '../components/CustomCheckBox'
import {useToast} from "../components/ToastProvider"
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
  const showToast = useToast();
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
              placeholderTextColor={"grey"}
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
                        borderRadius: 10,
                        textAlign:'center'
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontFamily:'Manrope-Semibold'
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
            <View style={{ backgroundColor:'grey', width:60, height:60, borderRadius:50,justifyContent: "center", alignSelf:'center', alignItems: "center",}}>

            <Ionicons
              name="close"
              size={25}
              color={"#C11414"}
              style={{
                alignSelf: "center",
              }}
            ></Ionicons>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        
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
          <View style={styles.budgetInputContainer}>
              <Text style={styles.currencySymbol}>N</Text>
          <TextInput
            style={{
              flex: 1,
              height: "100%",
              fontFamily: 'Manrope-Regular',
            }}
            keyboardType="numeric"
            placeholder="5000"
            onChangeText={(text) => {
              onChange("budget", text);
            }}
            value={jobDetails.budget}
          />
         </View>
          <View style={{ marginTop: 34 }}>
            <Text style={{fontFamily: 'Manrope-Regular', color: "#525252"}}>Location</Text>
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
                  borderRadius: 4,
                  borderColor: "#525252",
                  borderWidth: 1,
                  marginTop:5,
                  marginBottom:10,
                }}
              >
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <Text style={{ color: jobDetails.location === "" ? "#B9B9B9" : "black"}}>
                    {jobDetails.location == ""
                      ? "Type in a location"
                      : jobDetails.location}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <CustomCheckBox
          
           label={'Use current location'}
            onChange={setUseCurrentLocation}
            checked={useCurrentLocation}
            
          />

          <View style={{marginTop:150, marginBottom:30,}}>

          <Button
            text="Review Post"
            onPress={() => {
              if (jobDetails.budget < 1000) {
                showToast('Your Budget must be at least N1000')

                return;
              }
              onNext();
            }}
          />
          </View>
        </View>
      </View>
     </TouchableWithoutFeedback>
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
    fontFamily: 'Manrope-Regular',
  },
  checkboxContainer: {
    alignSelf: "flex-start",
    width: 150,
    padding: 10,
    marginBottom: 250,
    backgroundColor:'blue',
  },
  budgetInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#6B6B6B",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
  },
  currencySymbol: {
    fontSize: 16,
    marginRight: 5,
    fontFamily: 'Manrope-SemiBold',
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
