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
    padding: 16px 32px;
    min-width: 400px;
    min-height: 400px;

    .content {
      display: flex;
      flex-direction: column;

      h1 {
        margin-bottom: 0;
      }

      .description {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        padding: 16px;
        flex-basis: 150px;
        flex-grow: 1;
        height: 100%;

        div {
          display: flex;
          justify-content: space-between;

          button + button {
            margin-left: 16px;
          }
        }

        div + div {
          margin-top: 16px;
        }
      }
    }
  }
`;
