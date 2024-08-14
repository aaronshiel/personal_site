import styled from 'styled-components';

/**
 * 100% width and height, flexbox, centering content
 */
export const CenterScreenContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
