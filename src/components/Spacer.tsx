import styled, { css } from 'styled-components/macro';

type ExtraProps = {
  height?: string;
  marginTop?: string;
  marginBottom?: string;
};

export default styled.div<ExtraProps>`
  ${({height}) => height
    ? css`
      padding-top: ${height};
    `
    : css`
      padding-top: 0;
    `
  }
  ${({marginTop}) => marginTop
    ? css`
      margin-top: ${marginTop};
    `
    : css`
      margin-top: 0;
    `
  }
  ${({marginBottom}) => marginBottom
    ? css`
      margin-bottom: ${marginBottom};
    `
    : css`
      margin-bottom: 0;
    `
  }
`;
