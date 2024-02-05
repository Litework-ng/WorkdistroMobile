import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClientBottomTabs from './ClientBottomTabs'; // Import your client bottom tabs
import WorkerBottomTabs from './WorkerBottomTabs'; // Import your worker bottom tabs
import { useUserContext } from '../components/UserContext';
import { HeaderTitle } from 'react-navigation-stack';

const BottomNavigator = ({userSelection}) => {
  const userRole = userSelection
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{headerShown:false, tabBarLabel:'', tabBarStyle:{display:'none'},}}
      >
      {userRole === 'findWorker' ? (
        <Tab.Screen name="ClientTabs" component={ClientBottomTabs}  />
      ) : (
        <Tab.Screen name="WorkerTabs" component={WorkerBottomTabs} />
      )}
    </Tab.Navigator>
  );
};

export default BottomNavigator;
