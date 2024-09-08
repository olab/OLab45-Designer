import styled from 'styled-components';
import { DARK_BLUE } from '../../../shared/colors';

export const Title = styled.h3`
  color: ${DARK_BLUE};
  margin-top: 0;
`;

export const TextFieldContainer = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
`;

export const TextEditorWrapper = styled.div`
  margin-top: 0;
  margin-bottom: 0;
`;

export const BlockCheckbox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`;

export const CheckBoxContainer = styled.div`
  width: 820px;
  padding-right: 20px;
  padding-bottom: 100px;
`;

const styles = () => ({
  textField: {
    marginLeft: 5,
    width: '100%',
  },
});

export default styles;
