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

const NoMatch = (): JSX.Element => {
  const { group: groupID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [group, setGroup] = useState<GroupsInterface | undefined>(undefined);

  const user = JSON.parse(String(localStorage.getItem('user')));
  const isGroupAdmin = group?.adminID === user?.id;

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

  return (
    <>
      <Background />
      <NavBar />
      <Main>
        <div className="box">
          <h1>{group?.name}</h1>
          <div className="content">
            <div className="description">
              {isGroupAdmin ? (
                <>
                  <p>Crie sua primeira partida</p>
                  <Link to="new">
                    <button type="button">Criar partida</button>
                  </Link>
                </>
              ) : (
                <p>O organizador do seu grupo ainda não criou uma partida</p>
              )}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default NoMatch;
