import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import {
  ThemeProvider as MaterialThemeProvider,
  StyledEngineProvider,
  unstable_createMuiStrictModeTheme as createTheme,
} from '@mui/material/styles';

const Theme: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useMemo(() => createTheme(), []);
  return (
    <StyledEngineProvider injectFirst>
      <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
    </StyledEngineProvider>
  );
};

export default Theme;
