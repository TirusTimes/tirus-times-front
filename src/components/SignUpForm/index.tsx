import React, { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type { ChangeEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material';

import { VisibilityOff, Visibility } from '@mui/icons-material';

import { useSnackbar } from 'notistack';

import { validateString } from 'utils/validate-string';

import { validateAge } from 'utils/validate-age';

import { validatePassword } from 'utils/validate-password';

import { useToken } from 'hooks/useToken';

import Route from 'routes/Route';

import { Main, ButtonsContainer, StyledButton } from './styles';

const TIME_TO_REDIRECT = 6000;
const INITIAL_DATA = {
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  password: ``,
  confirmPassword: '',
  position: '',
  age: 0,
  gender: '',
};

interface FormDataInterface {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  position: string;
  age: number;
  gender: string;
  confirmPassword?: string;
}
const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { updateToken } = useToken();
  const [formData, setFormData] = useState<FormDataInterface>(INITIAL_DATA);

  const handleClickShowPassword = useCallback((): void => {
    setShowPassword(curr => !curr);
  }, []);

  const handleClickShowConfirmPassword = useCallback((): void => {
    setShowConfirmPassword(curr => !curr);
  }, []);

  const handleMouseDownPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
    },
    [],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setFormData(curr => ({
        ...curr,
        [event.target.name]: event.target.value || '',
      }));
    },
    [],
  );

  const handleChangeSelect = useCallback((event: SelectChangeEvent): void => {
    setFormData(curr => ({
      ...curr,
      [event.target.name]: event.target.value || '',
    }));
  }, []);

  const handleSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      formData.age = Number(formData.age);
      validateString(formData.firstname, 'Nome');
      validateString(formData.lastname, 'Sobrenome');
      validateString(formData.username, 'Apelido');
      validateString(formData.email, 'Email');
      validateString(formData.gender, 'Gênero');
      validateAge(formData.age, 'Idade');
      validatePassword(formData.password, formData.confirmPassword ?? ``);
      validateString(formData.position, 'Posição');
      delete formData.confirmPassword;

      const response = await axios.post('/api/users', formData);

      if (response.data) {
        enqueueSnackbar(
          'Usuário criado com sucesso! Você será redirecionado agora!',
          {
            variant: 'success',
          },
        );

        setFormData(INITIAL_DATA);
        const login = await axios.post('/api/auth', {
          username: formData.username,
          password: formData.password,
        });

        if (login.data) {
          setFormData(INITIAL_DATA);
          updateToken(login.data.token);
          setTimeout(() => {
            navigate(Route.DASHBOARD);
          }, TIME_TO_REDIRECT);
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar, formData, navigate, updateToken]);

  return (
    <Main>
      <Typography variant="h3" gutterBottom>
        Crie sua conta
      </Typography>
      <form>
        <TextField
          color="success"
          label="Nome"
          margin="dense"
          name="firstname"
          onChange={handleChange}
          required
          value={formData.firstname}
          variant="standard"
        />
        <TextField
          color="success"
          label="Sobrenome"
          margin="dense"
          name="lastname"
          onChange={handleChange}
          required
          value={formData.lastname}
          variant="standard"
        />
        <TextField
          color="success"
          label="Apelido"
          margin="dense"
          name="username"
          onChange={handleChange}
          required
          value={formData.username}
          variant="standard"
        />
        <TextField
          color="success"
          label="Email"
          margin="dense"
          name="email"
          onChange={handleChange}
          required
          value={formData.email}
          variant="standard"
        />
        <TextField
          color="success"
          label="Idade"
          margin="dense"
          name="age"
          onChange={handleChange}
          required
          value={formData.age}
          variant="standard"
        />
        <FormControl margin="dense">
          <FormLabel color="success" id="gender">
            Gênero
          </FormLabel>
          <RadioGroup row aria-labelledby="gender" name="gender">
            <FormControlLabel
              control={
                <Radio
                  checked={formData.gender === 'male'}
                  color="success"
                  onChange={handleChange}
                />
              }
              label="Masculino"
              value="male"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={formData.gender === 'female'}
                  color="success"
                  onChange={handleChange}
                />
              }
              label="Feminino"
              value="female"
            />
          </RadioGroup>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel color="success" id="position-label">
            Posição
          </InputLabel>
          <Select
            labelId="position-label"
            id="position-select"
            color="success"
            name="position"
            value={formData.position}
            onChange={handleChangeSelect}
          >
            <MenuItem value="Goleiro">Goleiro</MenuItem>
            <MenuItem value="Zagueiro">Zagueiro</MenuItem>
            <MenuItem value="Lateral">Lateral</MenuItem>
            <MenuItem value="Meio campista">Meio campista</MenuItem>
            <MenuItem value="Atacante">Atacante</MenuItem>
          </Select>
          <FormHelperText>Defina a sua posição</FormHelperText>
        </FormControl>
        <FormControl variant="standard" margin="dense">
          <InputLabel color="success" htmlFor="standard-adornment-password">
            Senha
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard" margin="dense">
          <InputLabel
            color="success"
            htmlFor="standard-adornment-confirmPassword"
          >
            Confirmação de senha
          </InputLabel>
          <Input
            id="standard-adornment-confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            color="success"
            name="confirmPassword"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
          Cadastrar
        </StyledButton>
      </ButtonsContainer>
    </Main>
  );
};

export default SignUpForm;
