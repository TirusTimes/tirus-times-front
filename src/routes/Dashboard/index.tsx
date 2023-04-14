import type { ChangeEvent } from 'react';
import { useState, useCallback } from 'react';

import axios from 'axios';

import useSWR from 'swr';

import type { AxiosError } from 'axios';

import { Fab } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { useSnackbar } from 'notistack';

import { Link } from 'react-router-dom';

import { useModal } from 'hooks/useModal';

import { Background } from 'components/Background';

import NavBar from 'components/NavBar';

import styles, { Main } from './styles';

import GroupForm from './GroupForm';

const Constants = {
  first: 5,
  initialFilter: {},
};

interface GroupsInterface {
  id: number;
  name: string;
  created_at: string;
}

interface GroupForm {
  name: string;
  id: number;
}

const Dashboard = (): JSX.Element => {
  const [_filter, setFilter] = useState(Constants.initialFilter);

  const { isOpen, handleOpen, handleClose } = useModal();
  const { enqueueSnackbar } = useSnackbar();
  const [groups, setGroups] = useState<GroupsInterface[] | undefined>(
    undefined,
  );
  const [rows, setRows] = useState<GroupsInterface[] | undefined>(undefined);

  const [groupFormState, setGroupFormState] = useState(
    {} as GroupForm | undefined,
  );

  const fetcherGroups = useCallback(() => {
    axios
      .get('/api/groups')
      .then(response => {
        setGroups(response.data);
        setRows(response.data);
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });
  }, [enqueueSnackbar]);

  useSWR(`/api/groups`, fetcherGroups, { refreshInterval: 3000 });

  const handleAddOpen = useCallback(() => {
    setGroupFormState(undefined);
    handleOpen();
  }, [setGroupFormState, handleOpen]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchText = event?.target?.value.toLowerCase().trim();
    const filtered = searchText
      ? rows?.filter(group => {
          return group.name.toLowerCase().includes(searchText);
        })
      : groups;

    setRows(filtered);
  };

  const handleClear = useCallback((): void => {
    setFilter(Constants.initialFilter);
  }, []);

  const setGroupFormStateHandler = useCallback(
    (newFormState: GroupForm | undefined) => {
      setGroupFormState(newFormState);
    },
    [],
  );

  return (
    <>
      <Background />
      <NavBar />
      <Main>
        <div className="box">
          <input
            className="search"
            type="text"
            placeholder="Procurar grupo..."
            onChange={handleSearch}
          />
          <div>
            <ul>
              {rows?.map(group => (
                <li key={group.id}>
                  <Link to={`/group/${group.id}`}>
                    <button type="button">{group.name}</button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Fab
          sx={styles.button}
          size="medium"
          color="secondary"
          onClick={handleAddOpen}
        >
          <AddIcon />
        </Fab>
        <GroupForm
          open={isOpen}
          onClose={handleClose}
          groupFormState={groupFormState}
          setGroupFormState={setGroupFormStateHandler}
          handleClearFilter={handleClear}
        />
      </Main>
    </>
  );
};

export default Dashboard;
