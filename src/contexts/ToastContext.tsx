import React, { createContext, useContext, useState, useRef } from 'react';
import { IonToast } from '@ionic/react';
import { ToastButton } from '@ionic/core';

interface Toast {
  color: string;
  message: string;
  buttons?: string[] | ToastButton[];
}

export const ToastContext = createContext({
  currentToast: (null as (Toast | null)),
  showToast: (toast: Toast) => {},
  hideToast: (toast: Toast) => {}
});

const Provider = ToastContext.Provider;

function removeToast(toast: any, array: Array<any>) {
  const index = array.indexOf(toast);
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ];
}

export const ToastProvider: React.FunctionComponent = ({children}) => {
  const toasts = useRef<Toast[]>([]);
  const [ currentToast, setCurrentToast ] = useState<Toast | null>(null);
  return (
    <Provider value={{
      currentToast,
      showToast: (toast: Toast) => {
        toasts.current = [...toasts.current, toast];
        if (toasts.current.length === 1) {
          setCurrentToast(toast);
        }
      },
      hideToast: (toast: Toast) => {
        toasts.current = removeToast(toast, toasts.current);
        if (toasts.current.length === 0) {
          setCurrentToast(null);
        } else {
          setCurrentToast(toasts.current[0]);
        }
      }
    }}>
      {children}
    </Provider>
  );
};

const ToastWrapper: React.FunctionComponent = () => {
  const { currentToast, hideToast } = useContext(ToastContext);
  return (
    <>
      {currentToast && (
        <IonToast
          isOpen={true}
          color={currentToast.color}
          onDidDismiss={() => hideToast(currentToast)}
          message={currentToast.message}
          duration={5000}
          buttons={currentToast.buttons ? currentToast.buttons : []}
        />
      )}
    </>
  );
};

export default ToastWrapper;
