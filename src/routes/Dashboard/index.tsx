import { useMemo, useState, useCallback, useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';

import axios from 'axios';

import type { AxiosError } from 'axios';

import type { GridColumns } from '@mui/x-data-grid';

import { Paper, ButtonBase, Fab, Box, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { useSnackbar } from 'notistack';

import { useNavigate } from 'react-router-dom';

import SearchBar from 'components/SearchBar';

import { useModal } from 'hooks/useModal';

import { useToken } from 'hooks/useToken';

import Route from 'routes/Route';

import styles, { Nav, Main, StyledButton } from './styles';

import GroupForm from './GroupForm';
import NoRows from './NoRows';

const columnKeys = ['name'];

const Constants = {
  first: 5,
  initialFilter: {},
};

const columns: GridColumns = columnKeys.map(column => ({
  field: column,
  headerName: column,
  width: 200,
  renderCell: (params): JSX.Element => <ButtonBase>{params.value}</ButtonBase>,
}));

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
  const { wipeToken } = useToken();
  const navigate = useNavigate();
  const [refetch, setRefetch] = useState(false);

  const [groups, setGroups] = useState<GroupsInterface[] | undefined>(
    undefined,
  );

  const [groupFormState, setGroupFormState] = useState(
    {} as GroupForm | undefined,
  );

  useEffect(() => {
    axios
      .get('/api/groups')
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const handleAddOpen = useCallback(() => {
    setGroupFormState(undefined);
    handleOpen();
  }, [setGroupFormState, handleOpen]);

  const onRowClick = useCallback(
    (data: any) => {
      setGroupFormState(data.row);
      handleOpen();
    },
    [handleOpen, setGroupFormState],
  );

  const handleSearch = useCallback((searchText: string): void => {
    const newFilter =
      searchText.length > 0
        ? { name: { contains: searchText } }
        : Constants.initialFilter;
    setFilter(newFilter);
  }, []);

  const handleClear = useCallback((): void => {
    setFilter(Constants.initialFilter);
  }, []);

  const handleRefetch = useCallback(() => {
    setRefetch(prev => !prev);
  }, []);

  const setGroupFormStateHandler = useCallback(
    (newFormState: GroupForm | undefined) => {
      setGroupFormState(newFormState);
    },
    [],
  );

  const rows = useMemo(
    () =>
      groups?.map(group => {
        const { id, name } = group;
        return {
          id,
          name,
        };
      }) ?? [],
    [groups],
  );

  const logout = useCallback(() => {
    wipeToken();
    navigate(Route.LOGIN);
  }, [navigate, wipeToken]);

  return (
    <>
      <Nav>
        <Typography color="white">TirusTimes</Typography>
        <StyledButton onClick={logout}>Logout</StyledButton>
      </Nav>
      <Main>
        <Box sx={styles.container}>
          <SearchBar
            onSearch={handleSearch}
            onClear={handleClear}
            placeholder="Procurar grupo..."
          />
          <Paper>
            {groups?.length ? (
              <DataGrid
                rows={rows}
                onRowClick={onRowClick}
                columns={columns}
                rowCount={groups.length}
                pageSize={Constants.first}
                autoHeight
                hideFooter
              />
            ) : (
              <NoRows />
            )}
          </Paper>
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
            setRefetch={handleRefetch}
            handleClearFilter={handleClear}
          />
        </Box>
      </Main>
    </>
  );
};

export default Dashboard;
