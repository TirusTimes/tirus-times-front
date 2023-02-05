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
    max-height: 400px;

    .content {
      h1 {
        margin-bottom: 0;
      }

      .description {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        span {
          font-weight: bold;
          display: flex;
          align-items: center;
          width: 100%;

          input {
            padding: 4px;
            margin-left: 8px;
            width: 100%;
          }

          & + span {
            margin-top: 16px;
          }
        }
      }
    }
  }
`;

export const StyledButton = styled.button`
  color: #2c951c;
  border: 2px solid #2c951c;
  background: none;
  padding: 16px 32px;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 15%;

  &:hover {
    color: white;
    background-color: #2c951c;
  }
`;
