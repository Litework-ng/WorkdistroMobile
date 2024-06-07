// Import necessary components and functions
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnBoardingScreen";
import RegistrationScreenWorker from "../screens/RegistrationScreenWorker";
import RegistrationScreenClient from "../screens/RegistrationScreenClient";
import OtpScreen from "../screens/OtpScreen";
import OtpVerificationWorkerScreen from "../screens/OtpWorkerScreen";
import LoginScreen from "../screens/LoginScreen";
import ForgotPwdScreen from "../screens/ForgotPwdScreen";
import ResetPwdScreen from "../screens/ResetPwdScreen";
import HomeScreen from "../screens/HomeScreenClient";
import BottomTabNavigator from "./BottomTabNavigator";
import MultiStepForm from "../components/MultiStepForm";
import EditableForm from "./EditableForm";
import DescriptionForm from "../screens/DescriptionScreen";
import ManaulRequest from "../screens/ManualRequestScreen";
import ReHire from "../screens/ReHireScreen";
import BidScreen from "../screens/BidScreen";
import ViewProfile from "../screens/ViewProfile";
import HireScreen from "../screens/HireScreen";
import TrackTask from "../screens/TrackTaskScreen";
import VerifyWithdrawal from "../screens/VerifyWithdrawalScreen";
import WithdrawalSaved from "../screens/WithdrawalSavedScreen";
import WithdrawalDetails from "../screens/WithdrawalDetailsScreeen";
import EditProfile from "../screens/EditProfileScreen";
import AccountSetting from "../screens/AccountSettingsScreen";
import PaymentHistory from "../screens/PaymentHistory";
import HomeScreenWorker from "../screens/HomeScreenWorker";
import WorkerBidScreen from "../screens/WokerBidScreen";
import JobDetailsScreen from "../screens/JobDetailsScreen";
import WorkerTaskScreen from "../screens/WorkerTaskScreen";
import LoginWorkerScreen from "../screens/LoginWorkerScreen";
import UpdatedTask from "../screens/UpdateTask";
import Faq from "../screens/Faq";
import Support from "../screens/Support";
import Privacy from "../screens/Privacy";
import AboutUs from "../screens/AboutUs";
import { useUserContext } from "./UserContext";
import BottomNavigator from "./BottomTabNavigator";
import LoginNavigator from "./LoginNavigator";
import React, { useEffect, useRef, useState } from "react";
import { AppState, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../components/Api";
import JobSelectionModal from "./JobSelectionModal";
import { ActivityIndicator, View } from "react-native";
// Create a stack navigator
const Stack = createNativeStackNavigator();
const TIMEOUT_DURATION = 300000;

// Define the navigator component
const AppNavigator = () => {
  const navigation = useNavigation();

  const timeoutRef = useRef(null);

  const { userSelection, setSelection } = useUserContext();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [service, setServices] = useState([]);
  const [error, setError] = useState();
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndStoreServices = async () => {
      try {
        const response = await api.get("/service/");
        const servicesData = response.data;
        await AsyncStorage.setItem("services", JSON.stringify(servicesData));
        console.log(servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
        Alert.alert(
          "Error",
          "Failed to fetch services. Please check your network connection and try again.",
          [{ text: "OK" }]
        );
      }
    };

    const checkOnboardingStatus = async () => {
      setLoading(true);
      try {
        const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
        console.log(hasOnboarded, "okay");
        setInitialRoute(hasOnboarded ? "Login" : "Onboarding");
      } catch (error) {
        console.error("Failed to check onboarding status from storage", error);
        setInitialRoute("Onboarding");
      } finally {
        setLoading(false);
      }
    };

    fetchAndStoreServices();
    checkOnboardingStatus();
  }, []);

  const setSelectedUserType = setSelection;

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "background") {
        startTimeoutTimer();
      } else {
        clearTimeoutTimer();
      }
    };

    const myListner = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      myListner.remove();
      clearTimeoutTimer();
    };
  }, []);

  const startTimeoutTimer = () => {
    timeoutRef.current = setTimeout(
      handleLogout(userSelection),
      TIMEOUT_DURATION
    );
    console.log(userSelection);
  };

  const clearTimeoutTimer = () => {
    clearTimeout(timeoutRef.current);
  };

  const resetTimeoutTimer = () => {
    clearTimeoutTimer();
    startTimeoutTimer();
  };

  const logout = () => {
    // Perform logout actions here
    Alert.alert(
      "Session Timeout",
      "Your session has timed out. Please log in again."
    );
    // Example: navigate to the login screen
    // navigation.navigate('Login');
  };

  const handleLogout = (userType) => {
    // Perform logout logic (clear authentication tokens, etc.)
    // For demonstration, navigate to the appropriate login screen
    if (userType === "becomeWorker") {
      navigation.navigate("LoginWorker"); // Navigate to worker login screen
      Alert.alert(
        "Session Timeout",
        "Your session has timed out. Please log in again."
      );
    } else if (userType === "findWorker") {
      navigation.navigate("Login"); // Navigate to client login screen
      Alert.alert(
        "Session Timeout",
        "Your session has timed out. Please log in again."
      );
    } else {
      // Default to a generic login screen if userType is not recognized
      navigation.navigate("Login");
      Alert.alert(
        "Session Timeout",
        "Your session has timed out. Please log in again."
      );
    }
  };

  const handleUserActivity = () => {
    resetTimeoutTimer();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BottomTabs" component={BottomTabsWrapper} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen
        name="JobSelectionModal"
        component={JobSelectionModal}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SignUpClient" component={RegistrationScreenClient} />
      <Stack.Screen name="SignUpWorker" component={RegistrationScreenWorker} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen
        name="OtpWorkerScreen"
        component={OtpVerificationWorkerScreen}
      />
      <Stack.Screen name="Login" component={NavigateLogin} />
      <Stack.Screen name="ForgotPwd" component={ForgotPwdScreen} />
      <Stack.Screen name="ResetPwd" component={ResetPwdScreen} />
      <Stack.Screen name="MultiStepForm" component={MultiStepForm} />
      <Stack.Screen name="EditableForm" component={EditableForm} />
      <Stack.Screen name="Description" component={DescriptionForm} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="HomeWorker" component={HomeScreenWorker} />
      <Stack.Screen name="ManualRequest" component={ManaulRequest} />
      <Stack.Screen name="ReHire" component={ReHire} />
      <Stack.Screen name="Bids" component={BidScreen} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="Hire" component={HireScreen} />
      <Stack.Screen name="Track" component={TrackTask} />
      <Stack.Screen name="VerifyWithdrawal" component={VerifyWithdrawal} />
      <Stack.Screen name="WithdrawalSaved" component={WithdrawalSaved} />
      <Stack.Screen name="WithdrawalDetails" component={WithdrawalDetails} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen name="WorkerBid" component={WorkerBidScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      <Stack.Screen name="WorkerTask" component={WorkerTaskScreen} />
      <Stack.Screen name="UpdatedTask" component={UpdatedTask} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
    </Stack.Navigator>
  );
};
const BottomTabsWrapper = () => {
  const { userSelection } = useUserContext();
  return <BottomNavigator userSelection={userSelection} />;
};

const NavigateLogin = () => {
  const { userSelection } = useUserContext();
  return <LoginNavigator userSelection={userSelection} />;
};
export default AppNavigator;
