import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { IonProgressBar } from '@ionic/react';
import LargeCopy from '../components/LargeCopy';
import Spacer from '../components/Spacer';
import { colors } from '../styles/colors';
import { ourConnect, StateProps } from '../util/state';

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

const LoadingWrapper: React.FunctionComponent<StateProps> = ({
    state
  }) => {
  const { isLoadingScreenVisible } = state;
  const { loadingScreenText } = state;
  return (
    <>
      {isLoadingScreenVisible && (
        <Container>
          <Background />
          <LoadingContents>
            <LargeCopy centered>{loadingScreenText}</LargeCopy>
            <Spacer height="15px" />
            <IonProgressBar type="indeterminate" />
          </LoadingContents>
        </Container>
      )}
    </>
  );
};

export default ourConnect()(LoadingWrapper);
