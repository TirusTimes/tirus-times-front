import { useState, useEffect } from 'react';

import axios from 'axios';

import type { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';

import { Link, useParams } from 'react-router-dom';

import { Background } from 'components/Background';

import NavBar from 'components/NavBar';

import { Main } from './styles';

const Evaluate = (): JSX.Element => {
  const { group: groupID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Background />
      <NavBar />
      <Main>
        <div className="box">
          <h1>Avaliar jogadores</h1>
          <div className="content">
            {users.map(item => (
              <Link to={`${item.id}`} key={item.id}>
                <button type="button">
                  {item.firstname} {item.lastname}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </Main>
    </>
  );
};

export default Evaluate;
