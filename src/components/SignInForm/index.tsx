import React, { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type { ChangeEvent } from 'react';
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

import { validateString } from 'utils/validate-string';

import Route from 'routes/Route';

import { ButtonsContainer, Main, StyledButton } from './styles';

const INITIAL_DATA = {
  email: '',
  password: '',
  showPassword: false,
};

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setFormData(curr => ({
        ...curr,
        [event.target.name]: event.target.value || '',
      }));
    },
    [],
  );

  const handleSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      validateString(formData.email, 'Email');
      validateString(formData.password, 'Senha');

      const response = await axios.post('/api/login', formData);

      if (response.data) {
        setFormData(INITIAL_DATA);

        navigate(Route.DASHBOARD);
      }
    } catch (error) {
      const err = error as AxiosError;
      enqueueSnackbar(
        (err?.response?.data as any)?.error ||
          err?.message ||
          'Ops, algo deu errado...',
        {
          variant: 'error',
        },
      );
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar, formData, navigate]);

  const handleClickShowPassword = useCallback((): void => {
    setFormData(curr => ({
      ...curr,
      showPassword: !curr.showPassword,
    }));
  }, []);

  const handleMouseDownPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
    },
    [],
  );

  return (
    <Main>
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          color="success"
          label="Email"
          margin="dense"
          name="email"
          onChange={handleChange}
          value={formData.email}
          variant="standard"
        />
        <FormControl variant="standard" margin="dense">
          <InputLabel color="success" htmlFor="standard-adornment-password">
            Senha
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={formData.showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            color="success"
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
      <ButtonsContainer>
        <StyledButton href="/" variant="outlined">
          <ArrowBackIcon fontSize="small" /> Voltar
        </StyledButton>
        <StyledButton
          variant="outlined"
          disabled={loading}
          onClick={handleSubmit}
        >
          Entrar
        </StyledButton>
      </ButtonsContainer>
    </Main>
  );
};

export default SignInForm;
