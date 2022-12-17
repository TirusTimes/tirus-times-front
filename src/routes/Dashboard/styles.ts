import styled from 'styled-components';

import sx from 'utils/createSx';

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

export const Main = styled.main`
  position: absolute;
  margin-top: calc(3.75rem + 1rem);
  padding: 1rem;
  height: 100%;
  height: -moz-available;
  height: -webkit-fill-available;
  height: fill-available;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h3 {
    font-weight: bold;
  }

  p {
    max-width: 30rem;
    font-weight: 500;
  }
`;

export default sx({
  container: {
    minWidth: '60vw',
    margin: '10px auto',
    width: '70%',
  },
  button: {
    position: 'absolute',
    right: '2vw',
    bottom: '15vh',
  },
  organizationContainer: {
    display: 'flex',
  },
  footer: {
    display: 'flex',
  },
});
