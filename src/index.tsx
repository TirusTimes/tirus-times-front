import type { ReactElement } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';

import { setupAxios } from 'services';

import { makeServer } from './server';
import Theme from './theme';

import Routes from './routes';

import './styles.css';

setupAxios();

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!);

const AppContainer = (): ReactElement => (
  <React.StrictMode>
    <Theme>
      <SnackbarProvider maxSnack={1} autoHideDuration={5000}>
        <Routes />
      </SnackbarProvider>
    </Theme>
  </React.StrictMode>
);

root.render(<AppContainer />);
