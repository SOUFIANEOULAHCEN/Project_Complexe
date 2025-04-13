import React from 'react';
import { toast, Toaster as HotToaster } from 'react-hot-toast';

export const Toaster = () => {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          duration: 3000,
          theme: {
            primary: '#4aee88',
          },
        },
        error: {
          duration: 4000,
          theme: {
            primary: '#ff4b4b',
          },
        },
      }}
    />
  );
};

export const showToast = (message, type = 'default') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    default:
      toast(message);
  }
};

export default Toaster; 