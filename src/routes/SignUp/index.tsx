import { useState } from 'react';
import type { AlertColor } from '@mui/material';
import { Alert, Snackbar } from '@mui/material';

import SignUpForm from 'components/SignUpForm';

import { Background, Container } from './styles';

const SignUp = (): JSX.Element => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  const handleClose = (): void => {
    setSnackbar(curr => ({
      ...curr,
      open: false,
    }));
  };

  return (
    <Container>
      <Background />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          elevation={6}
          variant="filled"
          severity={snackbar.severity as AlertColor}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <SignUpForm setSnackbar={setSnackbar} />
    </Container>
  );
};

export default SignUp;
