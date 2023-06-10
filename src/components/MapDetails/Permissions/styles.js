import styled from 'styled-components';

export const ContentParagraph = styled.p`
  margin-top: 0;
`;

export const muiStyles = {
  table: {
    maxWidth: '100%',
    width: 800,
  },
  dialogContent: {
    minWidth: 350,
  },
  dialogTitleFlex: {
    '&> h2': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
};
