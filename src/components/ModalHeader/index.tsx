import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import type { MouseEvent } from 'react';
import { useCallback } from 'react';

interface Props {
  id?: string;
  closeButtonAriaLabel?: string;
  onClose: () => void;
  text: string;
}

const ModalHeader = ({
  id,
  closeButtonAriaLabel,
  onClose,
  text,
}: Props): JSX.Element => {
  const handleCloseModal = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      onClose();
    },
    [onClose],
  );

  return (
    <Stack direction="row" alignItems="center">
      <Typography id={id} flex={1} textAlign="center" color="secondary">
        {text}
      </Typography>
      <IconButton
        onClick={handleCloseModal}
        aria-label={closeButtonAriaLabel}
        color="secondary"
      >
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};

export default ModalHeader;
