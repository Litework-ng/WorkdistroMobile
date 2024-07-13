import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FirstTimeUserContext = createContext();

export const FirstTimeUserProvider = ({ children }) => {
  const [firstTimeUser, setFirstTimeUser] = useState(true);

  useEffect(() => {
    const fetchFirstTimeUser = async () => {
      try {
        const value = await AsyncStorage.getItem('firstTimeUser');
        if (value !== null) {
          setFirstTimeUser(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error fetching first time user status:', error);
      }
    };

    fetchFirstTimeUser();
  }, []);

  const updateFirstTimeUser = async (value) => {
    try {
      await AsyncStorage.setItem('firstTimeUser', JSON.stringify(value));
      setFirstTimeUser(value);
    } catch (error) {
      console.error('Error updating first time user status:', error);
    }
  };

  return (
    <FirstTimeUserContext.Provider value={{ firstTimeUser, updateFirstTimeUser }}>
      {children}
    </FirstTimeUserContext.Provider>
  );
};
