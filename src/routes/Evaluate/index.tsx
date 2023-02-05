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

const Evaluate = (): JSX.Element => {
  const { group: groupID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [group, setGroup] = useState<GroupsInterface | undefined>(undefined);

  const user = JSON.parse(String(localStorage.getItem('user')));

  useEffect(() => {
    axios
      .get(`/api/group/${groupID}/owner/${user.id}`)
      .then(response => {
        setGroup(response.data);
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const array = [
    { firstname: 'John', lastname: 'Doe', id: 1 },
    { firstname: 'Mary', lastname: 'Jane', id: 2 },
    { firstname: 'Peter', lastname: 'Parker', id: 3 },
    { firstname: 'John', lastname: 'Doe', id: 1 },
    { firstname: 'Mary', lastname: 'Jane', id: 2 },
    { firstname: 'Peter', lastname: 'Parker', id: 3 },
    { firstname: 'John', lastname: 'Doe', id: 1 },
    { firstname: 'Mary', lastname: 'Jane', id: 2 },
    { firstname: 'Peter', lastname: 'Parker', id: 3 },
    { firstname: 'John', lastname: 'Doe', id: 1 },
    { firstname: 'Mary', lastname: 'Jane', id: 2 },
    { firstname: 'Peter', lastname: 'Parker', id: 3 },
  ];

  return (
    <>
      <Background />
      <NavBar />
      <Main>
        <div className="box">
          <h1>Avaliar jogadores</h1>
          {group?.name}
          <div className="content">
            {array.map(item => (
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
