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
}

const GroupDetails = (): JSX.Element => {
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const [group, setGroup] = useState<GroupsInterface | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`/api/groups/${id}`)
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
              <Link to="match/123">
                <button type="button">Partida</button>
              </Link>
              <button type="button" disabled>
                Convite
                <br />
                <small>(em breve)</small>
              </button>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default GroupDetails;
