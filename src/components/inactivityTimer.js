import React from "react";

let inactivityTimer;

const resetInactivityTimer = () => {
  clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(() => {
    // Session has timed out, perform logout or show a session expiration message
    handleLogout();
  }, 60000); // Set the timeout duration in milliseconds (e.g., 60000 milliseconds = 1 minute)
};


const handleLogout = async () => {
    // Clear authentication state or token
    clearTimeout(inactivityTimer);
    await clearAuthentication();
  
    // Navigate to the login screen
    navigation.navigate('Login');
  };

  AppState.addEventListener('change', (newState) => {
  if (newState === 'background') {
    clearTimeout(inactivityTimer);
  }
});