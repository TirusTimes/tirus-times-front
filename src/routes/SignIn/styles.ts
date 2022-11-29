import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Background = styled.div`
  position: absolute;
  z-index: -1;
  background-image: url('https://www.apore.go.gov.br/wp-content/uploads/2021/01/7A.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #cccccc;
  filter: blur(4px);
  height: 100%;
  width: 100%;
`;
