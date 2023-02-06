import { useState, useEffect } from 'react';

import axios from 'axios';

import type { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';

import { useParams } from 'react-router-dom';

import { Background } from 'components/Background';

import NavBar from 'components/NavBar';

import { Main } from './styles';

interface GroupsInterface {
  id: number;
  name: string;
  created_at: string;
  adminID: number;
}

const Invites = (): JSX.Element => {
  const { group: groupID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [requests, setRequests] = useState<any[] | undefined>(undefined);
  const [group, setGroup] = useState<GroupsInterface | undefined>(undefined);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(String(localStorage.getItem('user')));

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
      .get(`/api/group/${groupID}/owner/${user.id}`)
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    requests?.forEach((req: any) => {
      axios
        .get(`/api/users/${req.userId}`)
        .then(response => {
          if (users.indexOf(response.data) === -1) {
            setUsers([...users, response.data]);
          }
        })
        .catch(error => {
          const err = error as AxiosError;
          enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
            variant: 'error',
          });
        });
    });
  }, [requests]);

  const handleAccept = async (idToAccept: number) => {
    try {
      if (!isLoading) {
        setIsLoading(true);

        const response = await axios.post(
          `/api/group/${groupID}/owner/${user.id}/insertUser/${idToAccept}`,
        );

        if (response.data) {
          enqueueSnackbar('Solicitação aceita com sucesso', {
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

  const handleReject = async (idToReject: number) => {
    try {
      if (!isLoading) {
        setIsLoading(true);

        const response = await axios.post(
          `/api/group/${groupID}/user/${idToReject}`,
        );

        if (response.data) {
          enqueueSnackbar('Solicitação aceita com sucesso', {
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
          <h1>{group?.name}</h1>
          <div className="content">
            <h1>Solicitações pendentes</h1>
            <h4>Deseja aceitar?</h4>
            <div className="description">
              {users.map(item => (
                <div key={item.id}>
                  <span>
                    {item.firstname} {item.lastname}
                  </span>
                  <div>
                    <button
                      onClick={() => handleAccept(item.id)}
                      disabled={isLoading}
                      type="button"
                    >
                      Sim
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      disabled={isLoading}
                      type="button"
                    >
                      Não
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Invites;
