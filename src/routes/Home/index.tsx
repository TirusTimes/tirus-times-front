import { Typography } from '@mui/material';

import { Background, Container, Main, Nav, StyledButton } from './style';

const Home = (): JSX.Element => {
  return (
    <Container>
      <Background />

      <Nav>
        <Typography>TirusTimes</Typography>
        <div>
          <StyledButton href="/login" variant="outlined">
            Login
          </StyledButton>
          <StyledButton href="/register" variant="outlined">
            Cadastro
          </StyledButton>
        </div>
      </Nav>

      <Main>
        <Typography variant="h3" gutterBottom>
          Sobre o app
        </Typography>
        <Typography variant="body1" gutterBottom>
          TirusTimes é Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Perferendis vero asperiores voluptate vel expedita quidem suscipit
          esse ipsa atque necessitatibus facilis nihil nobis quasi voluptates
          repellat laborum aliquid, voluptatibus quia!
        </Typography>
      </Main>
    </Container>
  );
};

export default Home;
