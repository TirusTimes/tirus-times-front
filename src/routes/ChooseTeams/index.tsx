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

// interface MatchInterface {
//   id: number;
//   location: string;
//   date: string;
//   playerLimit: number;
//   status: string;
//   time: string;
// }

const ChooseTeams = (): JSX.Element => {
  const { match: matchID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [group, setGroup] = useState<GroupsInterface | undefined>(undefined);
  // const [match, setMatch] = useState<MatchInterface | undefined>(undefined);
  // const [users, setUsers] = useState<any[]>([]);

  const user = JSON.parse(String(localStorage.getItem('user')));
  const isGroupAdmin = group?.adminID === user.id;

  useEffect(() => {
    axios
      .get(`/api/match/choose/${matchID}`)
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

  const team1 = [
    { firstname: 'John', lastname: 'Doe', id: 1 },
    { firstname: 'Mary', lastname: 'Jane', id: 2 },
    { firstname: 'Peter', lastname: 'Parker', id: 4 },
    { firstname: 'John', lastname: 'Doe', id: 3 },
    { firstname: 'Mary', lastname: 'Jane', id: 5 },
  ];

  const team2 = [
    { firstname: 'John', lastname: 'Doe', id: 6 },
    { firstname: 'Mary', lastname: 'Jane', id: 7 },
    { firstname: 'Peter', lastname: 'Parker', id: 8 },
    { firstname: 'John', lastname: 'Doe', id: 9 },
    { firstname: 'John', lastname: 'Doe', id: 10 },
  ];

  const team1Text = () => {
    if (isGroupAdmin) return 'Equipe 1';

    const userIsInFirstTeam = team1.find(element => element.id === user.id);

    return userIsInFirstTeam ? 'Seu Time' : 'Time Adversário';
  };

  const team2Text = () => {
    if (isGroupAdmin) return 'Equipe 2';

    const userIsInFirstTeam = team2.find(element => element.id === user.id);

    return userIsInFirstTeam ? 'Seu Time' : 'Time Adversário';
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
                {team1.map(item => (
                  <span key={item.id}>
                    {item.firstname} {item.lastname}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3>{team2Text()}</h3>
              <div className="description">
                {team2.map(item => (
                  <span key={item.id}>
                    {item.firstname} {item.lastname}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* <StyledButton
            type="button"
            // disabled={isLoading}
            // onClick={handleEvaluate}
          >
            Iniciar
          </StyledButton> */}
        </div>
      </Main>
    </>
  );
};

export default ChooseTeams;
