import styled, { css } from 'styled-components/macro';

type ExtraProps = {
  marginTop?: boolean;
  marginRight?: boolean;
  marginBottom?: boolean;
  marginLeft?: boolean;
};

export default styled.div<ExtraProps>`
  ${({marginTop}) => marginTop
    ? css`
      margin-top: 16px;
    `
    : css`
      margin-top: 0;
    `
  }
  ${({marginRight}) => marginRight
    ? css`
      margin-right: 16px;
    `
    : css`
      margin-right: 0;
    `
  }
  ${({marginBottom}) => marginBottom
    ? css`
      margin-bottom: 16px;
    `
    : css`
      margin-bottom: 0;
    `
  }
  ${({marginLeft}) => marginLeft
    ? css`
      margin-left: 16px;
    `
    : css`
      margin-left: 0;
    `
  }
`;
