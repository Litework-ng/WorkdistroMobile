import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

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
