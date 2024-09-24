import styled from 'styled-components';
import { DARK_BLUE, BLUE_GREY, WHITE, LIGHT_GREY } from '../../../shared/colors';

export const ContentParagraph = styled.p`
  margin-top: 0;
`;

export const ContainerTab = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentTitle = styled.h3`
  color: ${DARK_BLUE};
  margin: 10px 0;
`;

export const TextEditorBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 10px;
`;

export const muiStyles = {
  table: {
    maxWidth: '100%',
  },
  dialogContent: {
    minWidth: 350,
  },
  dialogContentFixed: {
    width: 350,
  },
  dialogTitleFlex: {
    '&> h2': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
};
