import type { ChangeEvent } from 'react';

import { useState, useCallback, useEffect } from 'react';

import {
  Dialog,
  FormControl,
  Box,
  TextField,
  Stack,
  Button,
} from '@mui/material';

// import { useSnackbar } from 'notistack';

import ModalHeader from 'components/ModalHeader';

import styles from './styles';

interface GroupFormProps {
  open: boolean;
  onClose: () => void;
  groupFormState?: { name: string };
  setGroupFormState?: (state: { name: string } | undefined) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  handleClearFilter?: () => void;
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
}: GroupFormProps): JSX.Element => {
  // const { enqueueSnackbar } = useSnackbar();
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
    if (setGroupFormState) setGroupFormState(undefined);
    onClose();
  }, [onClose, setGroupFormState]);

  const handleClick = useCallback(() => {
    // if (!groupFormState) {
    //   // TODO: Create group call
    //   createGroup({
    //     ...formFields,
    //   })
    //     .then(({ data }) => {
    //       enqueueSnackbar('Grupo criado com sucesso', {
    //         variant: 'success',
    //       });
    //     })
    //     .catch(() => {
    //       enqueueSnackbar('Ocorreu um erro ao criar o grupo', {
    //         variant: 'error',
    //       });
    //     });
    // } else {
    //   updateGroup({
    //     ...formFields,
    //   })
    //     .then(() => {
    //       enqueueSnackbar('Grupo atualizado com sucesso', {
    //         variant: 'success',
    //       });
    //       if (handleClearFilter) handleClearFilter();
    //     })
    //     .catch(() => {
    //       enqueueSnackbar('Ocorreu um erro ao atualizar o grupo', {
    //         variant: 'error',
    //       });
    //     });
    // }
    handleClose();
  }, [handleClose]);

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
              name="Nome"
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
