import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import LoginWorkerScreen from "../screens/LoginWorkerScreen";

const Stack = createNativeStackNavigator();

const LoginNavigator = ({ userSelection }) => {
  const userRole = userSelection; // Assuming you have a userRole state from context

  useEffect(() => {
    console.log(userRole, "role");
  }, []);

  return (
    <Stack.Navigator>
      {userRole === "findWorker" ? (
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
