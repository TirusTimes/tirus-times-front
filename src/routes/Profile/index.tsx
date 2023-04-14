import { useState, useCallback } from 'react';

import axios from 'axios';

import useSWR from 'swr';

import type { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';

import { Background } from 'components/Background';

import NavBar from 'components/NavBar';

import { Main } from './styles';

const Profile = (): JSX.Element => {
  const [user, setUser] = useState<any>(undefined);

  const { enqueueSnackbar } = useSnackbar();

  const localUser = JSON.parse(String(localStorage.getItem('user')));

  const fetcherUser = useCallback(() => {
    axios
      .get(`/api/users/${localUser?.id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });
  }, [enqueueSnackbar, localUser?.id]);

  useSWR(localUser ? `/api/users/${localUser?.id}` : null, fetcherUser);

  return (
    <>
      <Background />
      <NavBar />
      <Main>
        <div className="box">
          <div>
            <h1>
              {user?.firstname} {user?.lastname}
            </h1>
            <ul>
              <li>
                <b>{user?.age}</b> anos de idade
              </li>
              <li>
                Joga como <b>{user?.position}</b>
              </li>
              <li>
                Conhecido como <b>{user?.username}</b>
              </li>
            </ul>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Profile;
