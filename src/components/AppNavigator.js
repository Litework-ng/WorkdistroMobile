// Import necessary components and functions
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, Alert, ActivityIndicator } from "react-native";
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
import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../components/Api";
import JobSelectionModal from "./JobSelectionModal";
import { FirstTimeUserContext } from "./firstTimeUserContext";

const Stack = createNativeStackNavigator();
const TIMEOUT_DURATION = 300000;
const MAX_RETRIES = 3;


const AppNavigator = () => {
  const navigation = useNavigation();
  const timeoutRef = useRef(null);
  const { userSelection, setSelection } = useUserContext();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [service, setServices] = useState([]);
  const [error, setError] = useState();
  const [initialRoute, setInitialRoute] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { firstTimeUser, updateFirstTimeUser } = useContext(FirstTimeUserContext);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      try {
        const isFirstTimeUser = await AsyncStorage.getItem('firstTimeUser');
        if (isFirstTimeUser === null) {
          setInitialRoute('Onboarding');
          await AsyncStorage.setItem('firstTimeUser', 'false');
        } else {
          setInitialRoute('Onboarding');
        }
      } catch (error) {
        console.error('Error checking first time user flag', error);
      } finally {
        setLoading(false);
      }
    };


    const fetchAndStoreServices = async () => {
      try {
        const response = await api.get("/service/");
        const servicesData = response.data;
        await AsyncStorage.setItem("services", JSON.stringify(servicesData));
        console.log(servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
        if (retryCount < MAX_RETRIES) {
          setRetryCount(retryCount + 1);
        } else {
          setError("Failed to fetch services. Please check your network connection and try again.");
          Alert.alert("Error", "Failed to fetch services. Please check your network connection and try again.", [
            { text: "OK", onPress: retryFetch },
          ]);
        }
      }
    };

    const initializeApp = async () => {
      setLoading(true);
      await checkFirstTimeUser();
      await fetchAndStoreServices();
      setLoading(false);
    };

    initializeApp();
  }, [retryCount]);

  const retryFetch = () => {
    setLoading(true);
    setRetryCount(0);
    setError(null);
  };

  const setSelectedUserType = setSelection;

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
    Alert.alert("Session Timeout", "Your session has timed out. Please log in again.");
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem("logintoken", "");
    navigation.navigate("Login");
    Alert.alert("Session Timeout", "Your session has timed out. Please log in again.");
  };

  const handleUserActivity = () => {
    resetTimeoutTimer();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="Login" component={NavigateLogin} />
      <Stack.Screen name="BottomTabs" component={BottomTabsWrapper}  />
      <Stack.Screen name="OtpWorkerScreen" component={OtpVerificationWorkerScreen} />
      <Stack.Screen name="JobSelectionModal" component={JobSelectionModal} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpClient" component={RegistrationScreenClient} />
      <Stack.Screen name="SignUpWorker" component={RegistrationScreenWorker} />
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
