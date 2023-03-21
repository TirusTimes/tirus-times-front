import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

import type { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';

import { useNavigate, useParams } from 'react-router-dom';

import { Background } from 'components/Background';

import NavBar from 'components/NavBar';

import { Main, StyledButton } from './styles';

interface MatchInterface {
  id?: number;
  groupId?: number;
  location?: string;
  date?: string;
  playerLimit?: number;
  status?: string;
  time?: string;
}

interface GroupsInterface {
  id: number;
  name: string;
  created_at: string;
  adminID: number;
}

const TIME_TO_REDIRECT = 3000;

const EditMatch = (): JSX.Element => {
  const navigate = useNavigate();
  const { group: groupID, match: matchID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [group, setGroup] = useState<GroupsInterface | undefined>(undefined);
  const [match, setMatch] = useState<MatchInterface | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const adminID = JSON.parse(String(localStorage.getItem('user')))?.id;

  useEffect(() => {
    axios
      .get(`/api/groups/${groupID}`)
      .then(response => {
        setGroup(response.data);
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });

    axios
      .get(`/api/match/${matchID}`)
      .then(response => {
        setMatch(response.data);
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
    const { name, value } = event.target;
    setMatch(curr => ({
      ...curr,
      [name]: value,
    }));
  };

  const handleCreateMatch = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);

        const response = await axios.put(`/api/match/${matchID}`, {
          ...match,
          adminID,
          date: new Date(String(match?.date)),
          playerLimit: Number(match?.playerLimit),
        });

        if (response.data) {
          enqueueSnackbar('Partida modificada com sucesso', {
            variant: 'success',
          });

          setTimeout(() => {
            navigate(`/group/${match?.groupId}/match/${matchID}`);
          }, TIME_TO_REDIRECT);
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
          <h1>Editar partida para {group?.name}</h1>
          <div className="content">
            <div className="description">
              <input
                onChange={handleChange}
                value={match?.location}
                name="location"
                type="text"
                placeholder="Local"
              />
              <input
                onChange={handleChange}
                value={match?.date?.split('T')[0]}
                name="date"
                type="date"
                placeholder="Data"
              />
              <input
                onChange={handleChange}
                value={match?.time}
                name="time"
                type="time"
                placeholder="Horário"
              />
              <input
                onChange={handleChange}
                value={match?.playerLimit}
                name="playerLimit"
                type="number"
                min="2"
                placeholder="Limite de Jogadores"
              />
            </div>
            <StyledButton
              type="button"
              disabled={isLoading}
              onClick={handleCreateMatch}
            >
              Enviar
            </StyledButton>
          </div>
        </div>
      </Main>
    </>
  );
};

export default EditMatch;
