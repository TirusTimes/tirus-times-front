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
    min-width: 400px;
    min-height: 400px;

    .content {
      display: flex;
      gap: 64px;

      .description {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        padding: 16px;
        flex-basis: 150px;
        flex-grow: 1;
        height: 100%;
        display: flex;
        align-items: flex-start;
        flex-direction: column;

        span {
          font-weight: bold;
          text-align: start;
        }

        span + span {
          margin-top: 16px;
        }
      }

      .buttons {
        flex-basis: 0;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        border: 1px solid black;

        button {
          background: rgba(0, 0, 0, 0.05);
          padding: 16px;
          width: 100%;
          border: none;
          font-weight: bold;
          font-size: 16px;

          &:not([disabled]) {
            cursor: pointer;
          }
        }

        > :not(:first-child) {
          border-top: 1px solid black;
        }
      }
    }
  }
`;
