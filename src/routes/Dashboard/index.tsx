import { useMemo, useState, useCallback } from 'react';

import { DataGrid } from '@mui/x-data-grid';

import type { GridColumns } from '@mui/x-data-grid';

import { Paper, ButtonBase, Fab, Box, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import SearchBar from 'components/SearchBar';

import { useModal } from 'hooks/useModal';

import styles, { Nav, Main } from './styles';

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

const groups = [
  { id: 'auishdnas', name: 'Test' },
  { id: 'auishdnassas', name: 'Test 2' },
];

const Dashboard = (): JSX.Element => {
  const [_filter, setFilter] = useState(Constants.initialFilter);

  const { isOpen, handleOpen, handleClose } = useModal();

  const [groupFormState, setGroupFormState] = useState(
    {} as { name: string } | undefined,
  );

  const handleAddOpen = useCallback(() => {
    setGroupFormState(undefined);
    handleOpen();
  }, [setGroupFormState, handleOpen]);

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

  const setGroupFormStateHandler = useCallback(
    (newFormState: { name: string } | undefined) => {
      setGroupFormState(newFormState);
    },
    [],
  );

  const rows = useMemo(
    () =>
      groups.map(group => {
        const { id, name } = group;
        return {
          id,
          name,
        };
      }) ?? [],
    [],
  );

  return (
    <>
      <Nav>
        <Typography color="white">TirusTimes</Typography>
      </Nav>
      <Main>
        <Box sx={styles.container}>
          <SearchBar
            onSearch={handleSearch}
            onClear={handleClear}
            placeholder="Procurar grupo..."
          />
          <Paper>
            {groups.length ? (
              <DataGrid
                rows={rows}
                onRowClick={handleOpen}
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
            handleClearFilter={handleClear}
          />
        </Box>
      </Main>
    </>
  );
};

export default Dashboard;
