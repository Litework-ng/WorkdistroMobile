import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the contexts
const UserContext = createContext();
const UserActivityContext = createContext();

export const useUserActivity = () => useContext(UserActivityContext);

export const UserActivityProvider = ({ children }) => {
  const [userActivity, setUserActivity] = useState(false);

  const handleUserActivity = () => {
    setUserActivity(true);
    // Optionally, you can reset a timer or perform other actions here
  };

  return (
    <UserActivityContext.Provider value={{ userActivity, handleUserActivity }}>
      {children}
    </UserActivityContext.Provider>
  );
};

export const UserProvider = ({ children }) => {
  const [userSelection, setUserSelection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserSelection = async () => {
      try {
        const storedUserSelection = await AsyncStorage.getItem('userSelection');
        if (storedUserSelection) {
          setUserSelection(storedUserSelection);
        }
      } catch (error) {
        console.error('Failed to load user selection from storage', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserSelection();
  }, []);

  const setSelection = async (selection) => {
    try {
      await AsyncStorage.setItem('userSelection', selection);
      setUserSelection(selection);
    } catch (error) {
      console.error('Failed to set user selection in storage', error);
    }
  };

  return (
    <UserContext.Provider value={{ userSelection, setSelection, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

