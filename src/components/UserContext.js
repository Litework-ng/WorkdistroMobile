import React, { createContext, useState, useContext } from 'react';

// Create the context
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

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userSelection, setUserSelection] = useState(null);
  
  

  const setSelection = (selection) => {
    setUserSelection(selection);
  };

  

  return (
    <UserContext.Provider value={{ userSelection, setSelection }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useUserContext = () => {
  return useContext(UserContext);
};
