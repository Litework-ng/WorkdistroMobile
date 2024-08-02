// AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { AppState, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes
 

  const logout = useCallback(async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('logintoken');
    navigation.navigate('Login'); // Adjust as per your navigation structure
    Alert.alert("Session Timeout", "Your session has expired. Please log in again."); // Notify the user
  }, [navigation]);

  const startSessionTimer = useCallback(() => {
    clearTimeout(sessionTimeout);
    const timeout = setTimeout(() => {
      logout();
    }, TIMEOUT_DURATION);
    setSessionTimeout(timeout);
  }, [logout, sessionTimeout]);

  const handleUserActivity = () => {
    if (isLoggedIn) {
      startSessionTimer();
    }
  };

  useEffect(() => {
    // Handle app state changes
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active' && isLoggedIn) {
        startSessionTimer();
      }
    };

    // Add event listener for app state changes
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    // Add event listener for user activity
    const interval = setInterval(handleUserActivity, 1000); // Check every second

    // Clean up listeners on unmount
    return () => {
      appStateListener.remove();
      clearInterval(interval);
      clearTimeout(sessionTimeout);
    };
  }, [isLoggedIn, startSessionTimer]);

  const login = async (token) => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem('logintoken', token);
    startSessionTimer();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
