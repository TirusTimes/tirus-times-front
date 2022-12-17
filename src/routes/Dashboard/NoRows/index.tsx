import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

const NoRows = (): JSX.Element => {
  return (
    <Stack alignItems="center">
      <Typography>Nenhum grupo encontrado</Typography>
    </Stack>
  );
};

export default NoRows;
