import styled from 'styled-components';

import sx from 'utils/createSx';

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

  .search {
    padding: 8px;
    width: 100%;
  }

  .box {
    background-color: white;
    padding: 16px 32px;
    min-width: 18rem;
    min-height: 26rem;

    width: 60%;
    height: 60%;
    ul {
      list-style: none;
      padding-left: 0;
      max-height: 300px;
      overflow: auto;

      li + li {
        margin-top: 16px;
      }

      button {
        width: 80%;
        padding: 8px;
        cursor: pointer;
      }
    }
  }
`;

export default sx({
  button: {
    position: 'absolute',
    right: '2vw',
    bottom: '15vh',
  },
});
