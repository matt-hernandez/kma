import { createContext } from 'react';

export const LoadingContext = createContext({
  shouldShowLoadingScreen: false,
  showLoadingScreen: () => {},
  hideLoadingScreen: () => {}
});

export const Provider = LoadingContext.Provider;

export const Consumer = LoadingContext.Consumer;
