import { useState, useEffect } from 'react';

import axios from 'axios';

import type { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';

import { Link, useParams } from 'react-router-dom';

import { Background } from 'components/Background';

import NavBar from 'components/NavBar';

import { Main } from './styles';

interface GroupsInterface {
  id: number;
  name: string;
  created_at: string;
  adminID: number;
}

const GroupDetails = (): JSX.Element => {
  const { id: groupID } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const [group, setGroup] = useState<GroupsInterface | undefined>(undefined);
  const [match, setMatch] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = JSON.parse(String(localStorage.getItem('user')));
  const isGroupAdmin = group?.adminID === user?.id;

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
      .get(`/api/match`)
      .then(response => {
        setMatch(
          response.data.filter(
            (item: any) => item.groupId === Number(groupID),
          )[0],
        );
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAskInvite = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);

        const response = await axios.post(
          `/api/group/${groupID}/user/${user?.id}`,
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

  return (
    <>
      <Background />
      <NavBar />
      <Main>
        <div className="box">
          <h1>{group?.name}</h1>
          <div className="content">
            <div className="description">
              <h3>Informações do time</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae est natus amet, quia itaque reprehenderit eum nihil
                repellendus ea tempore assumenda vitae blanditiis ipsam! Nisi
                tempora cum in dicta nemo?
              </p>
            </div>
            <div className="buttons">
              <Link to={match ? `match/${match.id}` : 'match'}>
                <button type="button">Partida</button>
              </Link>

              {isGroupAdmin ? (
                <Link to="invites">
                  <button type="button">
                    Pedidos <br />
                    de entrada
                  </button>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleAskInvite}
                  disabled={isLoading}
                >
                  Solicitar <br />
                  entrada
                </button>
              )}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default GroupDetails;
