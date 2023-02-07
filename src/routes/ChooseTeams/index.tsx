import { useState, useEffect } from 'react';

import axios from 'axios';

import type { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';

import { useParams } from 'react-router-dom';

import { Background } from 'components/Background';

import NavBar from 'components/NavBar';

import { Main, StyledButton } from './styles';

interface GroupsInterface {
  id: number;
  name: string;
  created_at: string;
  adminID: number;
}

const ChooseTeams = (): JSX.Element => {
  const { group: groupID, match: matchID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [group, setGroup] = useState<GroupsInterface | undefined>(undefined);
  const [players, setPlayers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(String(localStorage.getItem('user')));
  const isGroupAdmin = group?.adminID === user.id;

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
      .get(`/api/match/choose/${matchID}`)
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const team1Text = () => {
    if (isGroupAdmin) return 'Equipe 1';

    const userIsInFirstTeam = players[0]?.team?.find(
      (element: any) => element.id === user.id,
    );

    return userIsInFirstTeam ? 'Seu Time' : 'Time Adversário';
  };

  const team2Text = () => {
    if (isGroupAdmin) return 'Equipe 2';

    const userIsInSecondTeam = players[1]?.team?.find(
      (element: any) => element.id === user.id,
    );

    return userIsInSecondTeam ? 'Seu Time' : 'Time Adversário';
  };

  const handleStart = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);

        const response = await axios.patch(`/api/match/${matchID}`, {
          id: matchID,
          adminID: group?.adminID,
          status: 'STARTED',
        });

        if (response.data) {
          enqueueSnackbar('Solicitação de entrada enviada com sucesso', {
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
          <div className="content">
            <div>
              <h3>{team1Text()}</h3>
              <div className="description">
                {players[0]?.team?.map((item: any) => (
                  <span key={item.id}>{item.name}</span>
                ))}
              </div>
            </div>
            <div>
              <h3>{team2Text()}</h3>
              <div className="description">
                {players[1]?.team?.map((item: any) => (
                  <span key={item.id}>{item.name}</span>
                ))}
              </div>
            </div>
          </div>
          <StyledButton
            type="button"
            disabled={isLoading}
            onClick={handleStart}
          >
            Iniciar
          </StyledButton>
        </div>
      </Main>
    </>
  );
};

export default ChooseTeams;
