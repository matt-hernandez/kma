import React, { useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useStateHelper, listenerTypes } from '../util/use-state-helper';
import { colors } from '../styles/colors';

const Container = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: middle;
`;

const ChildrenWrapper = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;

  svg {
    width: 15px;
    height: 15px;
  }
`;

const TooltipWrapper = styled.div`
  position: absolute;
  left: calc(100% + 10px);
  top: 50%;
  z-index: 1;
  width: 200px;
  padding: 10px;
  border: 1px solid ${colors.gray4};
  border-radius: 3px;
  font-size: 13px;
  background-color: ${colors.white};
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  transform: translateY(-50%);

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    border-top: 6px solid transparent;
    border-right: 6px solid ${colors.white};
    border-bottom: 6px solid transparent;
    transform: translate(-100%, -50%);
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    border-top: 6px solid transparent;
    border-right: 6px solid ${colors.gray4};
    border-bottom: 6px solid transparent;
    transform: translate(calc(-100% - 1px), -50%);
  }
`;

const TextBlockWrapper = styled.div`
  padding-bottom: 6px;
  white-space: normal;

  &:last-child {
    padding-bottom: 0;
  }
`;

type ExtraProps = {
  text: string[];
};

let tooltipKey = 0;

const Tooltip: React.FunctionComponent<ExtraProps> = ({ children, text = [] }) => {
  const keyRef = useRef(tooltipKey);
  useEffect(() => {tooltipKey++}, []);
  const [ isVisible, setVisibleTrue, setVisibleFalse ] = useStateHelper(false, listenerTypes.TOGGLE_MANUALLY);
  return (
    <Container tabIndex={0} onMouseEnter={setVisibleTrue} onMouseLeave={setVisibleFalse} onFocus={setVisibleTrue} onBlur={setVisibleFalse}>
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
      {isVisible && (
        <TooltipWrapper>
          {text.map((t, i) => <TextBlockWrapper key={`Tooltip-${keyRef.current}-${i}`}>{t}</TextBlockWrapper>)}
        </TooltipWrapper>
      )}
    </Container>
  );
}

export default Tooltip;
