import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

import type { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';

import { useParams } from 'react-router-dom';

import { Background } from 'components/Background';

import NavBar from 'components/NavBar';

import { Main, StyledButton } from './styles';

const EvaluateUser = (): JSX.Element => {
  const { user: userID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [grade, setGrade] = useState<number | undefined>(undefined);
  const [player, setPlayer] = useState<any>();

  useEffect(() => {
    axios
      .get(`/api/users/${userID}`)
      .then(response => {
        setPlayer(response.data);
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGrade(Number(event.target.value));
  };

  const handleEvaluate = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);

        const response = await axios.post(`/api/avaliation`, {
          userId: String(player?.id),
          avaliation: grade,
        });

        if (response.data) {
          enqueueSnackbar('Avaliação feita com sucesso', {
            variant: 'success',
          });
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Background />
      <NavBar />
      <Main>
        <div className="box">
          <h1>
            {player?.firstname} {player?.lastname}
          </h1>
          <div className="content">
            <div className="description">
              <span>Posição: {player?.position}</span>
              <span>
                Pontuação:
                <input
                  onChange={handleChange}
                  name="pontuation"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Pontuação"
                />
              </span>
            </div>

            <StyledButton
              type="button"
              disabled={isLoading}
              onClick={handleEvaluate}
            >
              Enviar
            </StyledButton>
          </div>
        </div>
      </Main>
    </>
  );
};

export default EvaluateUser;
