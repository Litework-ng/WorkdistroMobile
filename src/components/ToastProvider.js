import React, { createContext, useContext, useState } from 'react';
import { View } from 'react-native';
import CustomToast from './CustomToast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ visible: false, message: '', duration: 2000 });

  const showToast = (message, duration) => {
    setToast({ visible: true, message, duration });
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <CustomToast visible={toast.visible} message={toast.message} duration={toast.duration} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
