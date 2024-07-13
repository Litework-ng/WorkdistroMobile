import React, { createContext, useState } from 'react';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [selectedJobContext, setSelectedJobContext] = useState(null);

  return (
    <JobContext.Provider value={{ selectedJobContext, setSelectedJobContext }}>
      {children}
    </JobContext.Provider>
  );
};
