import styled from 'styled-components';
import { Button } from '@mui/material';

export const Nav = styled.nav`
  position: fixed;
  height: 3.75rem;
  width: 100%;
  background: #2c951c;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const StyledButton = styled(Button)`
  color: white;
  border: 1px solid white;

  &:hover {
    color: #2c951c;
    background-color: white;
    border: 1px solid white;
  }

  & + & {
    margin-left: 1rem;
  }
`;
