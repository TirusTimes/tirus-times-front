import SignInForm from 'components/SignInForm';

import { Background, Container } from './styles';

const SignIn = (): JSX.Element => {
  return (
    <Container>
      <Background />
      <SignInForm />
    </Container>
  );
};

export default SignIn;
