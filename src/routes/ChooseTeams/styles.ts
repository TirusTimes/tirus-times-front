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
      height: 100%;
      gap: 64px;

      .description {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        padding: 16px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        width: 100%;
        border: 1px solid black;

        span {
          font-weight: bold;
          text-align: start;
        }

        span + span {
          margin-top: 16px;
        }
      }
    }
  }
`;

export const StyledButton = styled.button`
  color: #2c951c;
  border: 2px solid #2c951c;
  background: white;
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
