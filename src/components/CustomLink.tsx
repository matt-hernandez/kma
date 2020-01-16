import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { colors } from '../styles/colors';

const Wrapper = styled.span`
  color: ${colors.active};
  cursor: pointer;
`;

type Props = {
  href?: string;
  onClick?: () => void
};

const CustomLink: React.FunctionComponent<Props> = ({ children, href = '', onClick }) => {
  if (onClick) {
    return (
      <Wrapper as="a" onClick={onClick}>{children}</Wrapper>
    );
  }
  return (
    <Link to={href}>
      <Wrapper>
        {children}
      </Wrapper>
    </Link>
  );
};

export default CustomLink;
