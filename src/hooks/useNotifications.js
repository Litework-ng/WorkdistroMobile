// useNotifications.js
import { useState, useEffect, useContext } from 'react';
import api from '../components/Api';
import { AuthContext } from '../components/userAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const useNotifications = (accountType) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      return; // Don't fetch notifications if not logged in
    }

    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem('logintoken');
        const response = await api.get('/user/notifications/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            type: accountType,
          },
        });
        setNotifications(response.data);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
        setError(err);
      }
    };

    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [accountType, isLoggedIn]);

  return { notifications, error };
};

export default useNotifications;
