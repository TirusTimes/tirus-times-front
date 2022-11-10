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
} from '@mui/material';

import { validateString } from 'utils/validate-string';

import { Main, Tips, ButtonsContainer, StyledButton } from './styles';

const TIME_TO_REDIRECT = 6000;
const INITIAL_DATA = {
  name: '',
  lastname: '',
  nickname: '',
  email: '',
  gender: '',
  expertise: '',
};

interface ISignUpForm {
  setSnackbar: (
    value: React.SetStateAction<{
      open: boolean;
      message: string;
      severity: string;
    }>,
  ) => void;
}

const SignUpForm: React.FC<ISignUpForm> = ({ setSnackbar }) => {
  const navigate = useNavigate();

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

  const handleChangeSelect = useCallback((event: SelectChangeEvent): void => {
    setFormData(curr => ({
      ...curr,
      [event.target.name]: event.target.value || '',
    }));
  }, []);

  const handleSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      validateString(formData.name, 'Nome');
      validateString(formData.lastname, 'Sobrenome');
      validateString(formData.nickname, 'Apelido');
      validateString(formData.email, 'Email');
      validateString(formData.gender, 'Gênero');
      validateString(formData.expertise, 'Experiência');

      const response = await axios.post('/api/signup', formData);

      if (response.data) {
        setSnackbar(curr => ({
          ...curr,
          open: true,
          severity: 'success',
          message: 'Usuário criado com sucesso! Você será redirecionado agora!',
        }));

        setFormData(INITIAL_DATA);

        setTimeout(() => {
          navigate('/');
        }, TIME_TO_REDIRECT);
      }
    } catch (error) {
      const err = error as AxiosError;
      setSnackbar(curr => ({
        ...curr,
        open: true,
        severity: 'error',
        message: err?.message || 'Ops, algo deu errado...',
      }));
    } finally {
      setLoading(false);
    }
  }, [formData, navigate, setSnackbar]);

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
          name="name"
          onChange={handleChange}
          required
          value={formData.name}
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
          name="nickname"
          onChange={handleChange}
          required
          value={formData.nickname}
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
          <InputLabel color="success" id="expertise-label">
            Experiência
          </InputLabel>
          <Select
            labelId="expertise-label"
            id="expertise-select"
            color="success"
            name="expertise"
            value={formData.expertise}
            onChange={handleChangeSelect}
          >
            <MenuItem value="low">Baixa</MenuItem>
            <MenuItem value="medium">Intermediário</MenuItem>
            <MenuItem value="high">Experiente</MenuItem>
          </Select>
          <FormHelperText>
            Defina como você classificaria a sua habilidade com Futebol Society
          </FormHelperText>
        </FormControl>
        <Tips>
          <Typography variant="body2" gutterBottom>
            <b>Baixa:</b> Tenho dificuldade para marcar, driblar e/ou golear
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Intermediário:</b> Consigo marcar, driblar e/ou golear sem muita
            dificuldade
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Experiente:</b>Consigo marcar, driblar e golear tranquilamente
          </Typography>
        </Tips>
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
