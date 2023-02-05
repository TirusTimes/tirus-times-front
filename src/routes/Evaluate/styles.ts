import styled from 'styled-components';

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

  button {
    cursor: pointer;
  }

  .box {
    background-color: white;
    padding: 32px 32px;
    min-width: 400px;
    min-height: 400px;

    h1 {
      margin-top: 0;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      max-height: 500px;
      overflow: auto;

      a {
        width: calc(50% - 16px);

        button {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid black;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }
`;
