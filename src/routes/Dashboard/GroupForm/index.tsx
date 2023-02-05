import type { ChangeEvent } from 'react';

import axios from 'axios';

import { useState, useCallback, useEffect } from 'react';

import {
  Dialog,
  FormControl,
  Box,
  TextField,
  Stack,
  Button,
} from '@mui/material';

import { useSnackbar } from 'notistack';

import ModalHeader from 'components/ModalHeader';

import styles from './styles';

interface GroupFormProps {
  open: boolean;
  onClose: () => void;
  groupFormState?: { name: string; id: number };
  setGroupFormState: (state: { name: string; id: number } | undefined) => void;
  setRefetch: () => void;
  handleClearFilter: () => void;
}

type CreateGroupInput = {
  name: string;
};

const initialState: CreateGroupInput = {
  name: '',
};

const Constants = {
  addOrgDialogId: 'dialog-title',
  orgStatusId: 'Group-status-group',
  orgTagsId: 'Group-tags-select',
};

const GroupForm = ({
  open,
  onClose,
  groupFormState,
  setGroupFormState,
  handleClearFilter,
  setRefetch,
}: GroupFormProps): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const [formFields, setFormFields] = useState<{ name: string }>(initialState);

  useEffect(() => {
    if (groupFormState && Object.keys(groupFormState).length) {
      setFormFields(groupFormState);
    } else {
      setFormFields(initialState);
    }
  }, [groupFormState]);
  const onChangeFormFields = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void =>
      setFormFields(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      })),
    [setFormFields],
  );

  const handleClose = useCallback(() => {
    setGroupFormState(undefined);
    onClose();
  }, [onClose, setGroupFormState]);

  const handleClick = useCallback(() => {
    const adminID = JSON.parse(String(localStorage.getItem('user'))).id;

    if (!groupFormState) {
      axios
        .post('api/groups', { ...formFields, adminID })
        .then(() => {
          enqueueSnackbar('Grupo criado com sucesso', {
            variant: 'success',
          });
          setRefetch();
        })
        .catch(() => {
          enqueueSnackbar('Ocorreu um erro ao criar o grupo', {
            variant: 'error',
          });
        });
    } else {
      axios
        .put(`api/groups/${groupFormState.id}`, formFields)
        .then(() => {
          enqueueSnackbar('Grupo atualizado com sucesso', {
            variant: 'success',
          });
          handleClearFilter();
          setRefetch();
        })
        .catch(() => {
          enqueueSnackbar('Ocorreu um erro ao atualizar o grupo', {
            variant: 'error',
          });
        });
    }
    handleClose();
  }, [
    enqueueSnackbar,
    formFields,
    groupFormState,
    handleClose,
    handleClearFilter,
    setRefetch,
  ]);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby={Constants.addOrgDialogId}
    >
      <Box>
        <ModalHeader
          id={Constants.addOrgDialogId}
          closeButtonAriaLabel="Fechar"
          onClose={handleClose}
          text={!groupFormState ? 'Adicionar Grupo' : 'Modificar Grupo'}
        />
        <Stack style={styles.stack}>
          <FormControl style={styles.textField}>
            <TextField
              autoFocus
              label="Nome"
              type="text"
              margin="dense"
              variant="outlined"
              value={formFields.name}
              fullWidth
              name="name"
              onChange={onChangeFormFields}
            />
          </FormControl>
        </Stack>
        <Button fullWidth onClick={handleClick}>
          {!groupFormState ? 'Adicionar' : 'Atualizar'}
        </Button>
      </Box>
    </Dialog>
  );
};

export default GroupForm;
