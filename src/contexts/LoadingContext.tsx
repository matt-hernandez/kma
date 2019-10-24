import React, { createContext, useContext } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { IonProgressBar } from '@ionic/react';
import LargeCopy from '../components/LargeCopy';
import Spacer from '../components/Spacer';
import { colors } from '../styles/colors';
import { useStateHelper, listenerTypes } from '../util/use-state-helper';

export const LoadingContext = createContext({
  shouldShowLoadingScreen: false,
  showLoadingScreen: () => {},
  hideLoadingScreen: () => {}
});

const Provider = LoadingContext.Provider;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  animation: ${fadeIn} 600ms;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  opacity: 0.7;
`;

const LoadingContents = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
`;

export const LoadingProvider: React.FunctionComponent = ({children}) => {
  const [ shouldShowLoadingScreen, showLoadingScreen, hideLoadingScreen ] = useStateHelper(false, listenerTypes.TOGGLE_MANUALLY);
  return (
    <Provider value={{ shouldShowLoadingScreen, showLoadingScreen, hideLoadingScreen }}>
      {children}
    </Provider>
  );
};

const LoadingWrapper: React.FunctionComponent = () => {
  const { shouldShowLoadingScreen } = useContext(LoadingContext);
  return (
    <>
      {shouldShowLoadingScreen && (
        <Container>
          <Background />
          <LoadingContents>
            <LargeCopy centered>Please wait...</LargeCopy>
            <Spacer height="15px" />
            <IonProgressBar type="indeterminate" />
          </LoadingContents>
        </Container>
      )}
    </>
  );
};

export default LoadingWrapper;
