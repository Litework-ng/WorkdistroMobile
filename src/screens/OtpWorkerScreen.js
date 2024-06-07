import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import { faEye, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../components/Api";

const OtpVerificationWorkerScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));
  const expectedOtp = "1234";
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const getPhoneNumber = async () => {
      try {
        const storedPhoneNumber = await AsyncStorage.getItem("phoneNumber");
        if (storedPhoneNumber !== null) {
          setPhoneNumber(storedPhoneNumber);
        }
      } catch (error) {
        console.error(
          "Error retrieving phone number from AsyncStorage:",
          error
        );
      }
    };

    getPhoneNumber();
  }, []);

  const verifyOtp = async (enteredOtp) => {
    try {
      setVerifyingOtp(true);
      // Make API call to verify OTP
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        // Handle case where token is not found in AsyncStorage
        console.error("Token not found in AsyncStorage");
        return;
      }

      const response = await api.post(
        "verify-otp",
        {
          otp: enteredOtp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        }
      );

      // Check if OTP verification was successful
      if (response.data.response) {
        console.log("OTP verification successful!");
        navigation.navigate("BottomTabs");
        // Navigate to the next screen or perform any other action
      } else {
        console.log("Invalid OTP. Please try again.");
        Alert("Invalid OTP. Please try again.");
        // Handle the case where the OTP is invalid
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Handle any errors that occur during the verification process
    }
    setVerifyingOtp(false);
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    // Replace with the actual OTP sent to the user
    console.log("Entered OTP:", enteredOtp);
    console.log("Expected OTP:", expectedOtp);
    if (enteredOtp === expectedOtp) {
      console.log("OTP verification successful");
      // Navigate to the next screen or perform other actions
    } else {
    }
  };
  useEffect(() => {
    // Focus the first input when the component mounts
    inputRefs.current[0].focus();
  }, []);

  const handleResendOtp = () => {
    // TODO: Implement OTP resend logic
    console.log("Resend OTP");
    // Implement logic to resend OTP to the user
  };

  const handleInputChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);
    console.log(updatedOtp);
    console.log(otp);
    setFocusedInput(value !== "" ? index : null);

    // Move focus to the next input when a digit is entered
    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (index === otp.length - 1 && value !== "") {
      // Trigger verification when the last digit is entered
      verifyOtp(updatedOtp.join(""));
    }
  };

  const handleInputFocus = (index) => {
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <FontAwesomeIcon icon={faChevronLeft} size={24}/> */}
          <Text>lol</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Verification</Text>
      </View>
      <Text style={styles.verificationInstruction}>
        Please input the verification code sent to {phoneNumber}{" "}
        <TouchableOpacity>
          <Text style={styles.changeNumber}> Change</Text>
        </TouchableOpacity>
      </Text>
      {/* Input Fields */}
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[styles.input, digit !== "" && styles.activeInput]}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(text) => handleInputChange(index, text)}
            onFocus={() => handleInputFocus(index)}
          />
        ))}
      </View>
      <Modal visible={verifyingOtp} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#1F2A47" />
            <Text style={styles.modalText}>Verifying OTP...</Text>
          </View>
        </View>
      </Modal>

      {/* Resend OTP Button */}
      <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp}>
        <Text style={styles.resendButtonText}>
          Didn't get code? <Text style={styles.resend}>Resend</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 64,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Manrope-Bold",
  },
  verificationInstruction: {
    alignSelf: "center",
    width: 312,
    fontSize: 15,
    textAlign: "center",
    marginTop: 16,
    fontFamily: "Manrope-Regular",
  },
  changeNumber: {
    fontSize: 15,
    fontWeight: "700",
    alignSelf: "center",
    textDecorationLine: "underline",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    marginBottom: 20,
    marginTop: 100,
  },
  input: {
    borderWidth: 1,
    width: 50,
    height: 50,
    textAlign: "center",
    margin: 8,
    marginBottom: 0,
    fontSize: 20,
    borderColor: "#E6E6E6",
    borderRadius: 2,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  resendButton: {
    padding: 10,
    paddingTop: 0,
  },
  resendButtonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Manrope-Regular",
  },
  resend: {
    fontSize: 14,
    fontWeight: "700",
    alignSelf: "center",
    textDecorationLine: "underline",
    color: "#1F2A47",
  },

  activeInput: {
    borderColor: "#3E548E",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default OtpVerificationWorkerScreen;
