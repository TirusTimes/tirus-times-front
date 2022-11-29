import styled from 'styled-components';
import { Button } from '@mui/material';

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`;

export const StyledButton = styled(Button)`
  color: black;
  border: 1px solid #2c951c;

  &:hover {
    color: white;
    background-color: #2c951c;
    border: 1px solid #2c951c;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 4rem;
  border-radius: 1rem;
  margin: 0 auto;
  min-width: 520px;
  box-shadow: 4px 4px 16px 1px #aaaaaa;

  form {
    display: flex;
    flex-direction: column;
  }

  h3 {
    font-weight: bold;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    max-width: 80%;
    padding: 3rem;

    h3 {
      font-size: 5vw;
    }
  }

  @media screen and (max-width: 600px) {
    padding: 2rem;

    h3 {
      font-size: 7vw;
    }
  }
`;
