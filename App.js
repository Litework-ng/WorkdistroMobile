// App.js
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/components/AppNavigator";
import BottomTabNavigator from "./src/components/BottomTabNavigator";
import CustomBottomNavBar from "./src/components/CustomNavBar";
import * as SplashScreen from "expo-splash-screen";
import { UserProvider } from "./src/components/UserContext";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import React, { useEffect, useRef, useState } from "react";
import IdleTimerManager from "react-native-idle-timer";
import { UserActivityProvider } from "./src/components/UserContext";
import { useUserContext } from "./src/components/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootSiblingParent } from "react-native-root-siblings";
import { ToastProvider } from "./src/components/ToastProvider";

AsyncStorage.clear();

const fetchFonts = () => {
  return Font.loadAsync({
    "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf"),
    "MAnrope-ExtraBold": require("./assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("./assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("./assets/fonts/Manrope-Light.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Medium": require("./assets/fonts/Manrope-Medium.ttf"),
  });
};

const TIMEOUT_DURATION = 300000;

const App = ({ navigation, state }) => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const prepareData = async () => {
      try {
        // Hide the splash screen
        await SplashScreen.preventAutoHideAsync();

        // Load fonts
        await fetchFonts();

        // Allow the splash screen to be hidden
        await SplashScreen.hideAsync();

        // Mark data as loaded
        setDataLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    prepareData();
  }, []);

  if (!dataLoaded) {
    return <AppLoading />;
  }

  return (
    <UserProvider>
      <UserActivityProvider>
       <ToastProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>

       </ToastProvider>
        
      </UserActivityProvider>
    </UserProvider>
  );
};

export default App;
