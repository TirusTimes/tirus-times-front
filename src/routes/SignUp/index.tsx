import SignUpForm from 'components/SignUpForm';

import { Background, Container } from './styles';

const SignUp = (): JSX.Element => {
  return (
    <Container>
      <Background />
      <SignUpForm />
    </Container>
  );
};

export default SignUp;
