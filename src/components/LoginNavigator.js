import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import LoginWorkerScreen from "../screens/LoginWorkerScreen";
import LoadingOverlay from "./Loading";
import { useUserContext } from "./UserContext";

const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
  const { userSelection, loading } = useUserContext();

  useEffect(() => {
    console.log(userSelection, 'userSelection in useEffect');
  }, [userSelection]);

  if (loading) {
    // Optionally show a loading indicator or screen while userSelection is being loaded
    return <LoadingOverlay />;
  }

  return (
    <Stack.Navigator>
      {userSelection === 'findWorker' ? (
        <Stack.Screen
          name="ClientLogin"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="WorkerLogin"
          component={LoginWorkerScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default LoginNavigator;
