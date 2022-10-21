import type { ReactElement } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import Theme from './theme';

import Routes from './routes';

import './styles.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!);

const AppContainer = (): ReactElement => (
  <React.StrictMode>
    <Theme>
      <Routes />
    </Theme>
  </React.StrictMode>
);

root.render(<AppContainer />);
