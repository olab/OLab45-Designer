import styled from 'styled-components';

export const SwitchArticle = styled.article`
  display: flex;
  justify-content: space-between;
`;

export const MenusArticle = styled(SwitchArticle)`
  > div:first-of-type {
    margin-right: 0.5rem;
  }

  > div:last-of-type {
    margin-left: 0.5rem;
  }
`;
