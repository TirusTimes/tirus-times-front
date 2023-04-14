import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

import axios from 'axios';

import type { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';

import { useNavigate, useParams } from 'react-router-dom';

import useSWR from 'swr';

import { Background } from 'components/Background';

import NavBar from 'components/NavBar';

import { Main, StyledButton } from './styles';

interface GroupsInterface {
  id: number;
  name: string;
  created_at: string;
  adminID: number;
}

const TIME_TO_REDIRECT = 3000;

const NewMatch = (): JSX.Element => {
  const navigate = useNavigate();
  const { group: groupID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [group, setGroup] = useState<GroupsInterface | undefined>(undefined);
  const [match, setMatch] = useState({
    location: undefined,
    date: undefined,
    time: undefined,
    playerLimit: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);

  const adminID = JSON.parse(String(localStorage.getItem('user')))?.id;

  const fetcherGroup = useCallback(() => {
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
  }, [enqueueSnackbar, groupID]);

  useSWR(`/api/groups/${groupID}`, fetcherGroup);

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

        const response = await axios.post('/api/match', {
          ...match,
          adminID,
          groupId: group?.id,
          date: new Date(String(match?.date)),
          playerLimit: Number(match?.playerLimit),
        });

        if (response.data) {
          enqueueSnackbar('Partida criada com sucesso', {
            variant: 'success',
          });

          setTimeout(() => {
            navigate(`/group/${group?.id}/match/${response.data.id}`);
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
          <h1>Criar partida para {group?.name}</h1>
          <div className="content">
            <div className="description">
              <input
                onChange={handleChange}
                name="location"
                type="text"
                placeholder="Local"
              />
              <input
                onChange={handleChange}
                name="date"
                type="date"
                placeholder="Data"
              />
              <input
                onChange={handleChange}
                name="time"
                type="time"
                placeholder="Horário"
              />
              <input
                onChange={handleChange}
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

export default NewMatch;
