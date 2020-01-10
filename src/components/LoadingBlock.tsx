import styled, { keyframes } from 'styled-components/macro';
import { colors } from '../styles/colors';

const loadingAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  
  100% {
    background-position: 1000px 0; 
  }
`;

export default styled.div`
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${colors.gray1};
    background-image: linear-gradient(to right, ${colors.gray1} 0%, ${colors.gray2} 20%, ${colors.gray1} 40%, ${colors.gray1} 100%);
    background-repeat: no-repeat;
    background-size: 800px 104px;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${loadingAnimation};
    animation-timing-function: linear;
  }
`;
