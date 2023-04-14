import { useState, useCallback } from 'react';

import axios from 'axios';

import type { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';

import { Link, useParams } from 'react-router-dom';

import useSWR from 'swr';

import { Background } from 'components/Background';

import NavBar from 'components/NavBar';

import { Main } from './styles';

interface GroupsInterface {
  id: number;
  name: string;
  created_at: string;
  adminID: number;
}

interface MatchInterface {
  id: number;
  location: string;
  date: string;
  playerLimit: number;
  status: string;
  time: string;
}

const MatchDetails = (): JSX.Element => {
  const { group: groupID, match: matchID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [group, setGroup] = useState<GroupsInterface | undefined>(undefined);
  const [match, setMatch] = useState<MatchInterface | undefined>(undefined);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(String(localStorage.getItem('user')));
  const isGroupAdmin = group?.adminID === user?.id;

  const handleEnter = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);

        const response = await axios.post(
          `/api/match/${matchID}/user/${user?.id}`,
        );

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

  const handleFinish = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);

        const response = await axios.patch(`/api/match/${matchID}`, {
          id: matchID,
          adminID: group?.adminID,
          status: 'EVALUATE',
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
  const fetcherMatch = useCallback(() => {
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
  }, [enqueueSnackbar, matchID]);
  const fetcherUsers = useCallback(() => {
    axios
      .get(`/api/groups/${groupID}/users`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });
  }, [enqueueSnackbar, groupID]);

  useSWR(`/api/groups/${groupID}`, fetcherGroup);
  useSWR(`/api/match/${matchID}`, fetcherMatch);
  useSWR(`/api/groups/${groupID}/users`, fetcherUsers);

  const statuses = {
    OPEN: 'Aberto',
    STARTED: 'Iniciado',
    FINISHED: 'Finalizado',
    EVALUATE: 'Avaliar',
  };

  return (
    <>
      <Background />
      <NavBar />
      <Main>
        <div className="box">
          <h1>
            {group?.name}{' '}
            {match && `- ${statuses[match?.status as keyof typeof statuses]}`}
          </h1>
          <div className="content">
            <div className="description">
              <span>Local: {match?.location}</span>
              <span>
                Jogadores: {users.length}/{match?.playerLimit}
              </span>
              <span>
                Dia: {new Date(String(match?.date)).toLocaleDateString('pt-BR')}{' '}
              </span>
              <span>Horário: {match?.time}</span>
            </div>

            <div className="buttons">
              {isGroupAdmin ? (
                <AdminMatchView
                  status={String(match?.status)}
                  handleEnter={handleEnter}
                  handleFinish={handleFinish}
                  isLoading={isLoading}
                />
              ) : (
                <UserMatchView
                  status={String(match?.status)}
                  handleEnter={handleEnter}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

const AdminMatchView = ({
  status,
  handleEnter,
  handleFinish,
  isLoading,
}: {
  status: string;
  handleEnter: () => void;
  handleFinish: () => void;
  isLoading: boolean;
}): JSX.Element => {
  const buttonRender = () => {
    const options = {
      OPEN: (
        <>
          <Link to="edit">
            <button type="button">Editar partida atual</button>
          </Link>
          <Link to="choose">
            <button type="button">Separar Equipes</button>
          </Link>
          <button type="button" disabled={isLoading} onClick={handleEnter}>
            Entrar
          </button>
        </>
      ),
      STARTED: (
        <>
          <Link to="choose">
            <button type="button">Ver confronto</button>
          </Link>
          <button type="button" disabled={isLoading} onClick={handleFinish}>
            Encerrar partida
          </button>
        </>
      ),
      FINISHED: (
        <button type="button">
          Iniciar avaliação <small>(aguardando...)</small>
        </button>
      ),
      EVALUATE: (
        <Link to="evaluate">
          <button type="button">Iniciar avaliação</button>
        </Link>
      ),
    };

    return options[status as keyof typeof options];
  };

  return <>{buttonRender()}</>;
};

const UserMatchView = ({
  status,
  handleEnter,
  isLoading,
}: {
  status: string;
  handleEnter: () => void;
  isLoading: boolean;
}): JSX.Element => {
  const buttonRender = () => {
    const options = {
      OPEN: (
        <button type="button" disabled={isLoading} onClick={handleEnter}>
          Entrar
        </button>
      ),
      STARTED: (
        <Link to="choose">
          <button type="button">Ver confronto</button>
        </Link>
      ),
      FINISHED: (
        <button type="button">
          Iniciar avaliação <small>(aguardando...)</small>
        </button>
      ),
      EVALUATE: (
        <Link to="evaluate">
          <button type="button">Iniciar avaliação</button>
        </Link>
      ),
    };

    return options[status as keyof typeof options];
  };

  return <>{buttonRender()}</>;
};

export default MatchDetails;
