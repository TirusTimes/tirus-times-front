import type { ReactElement } from 'react';

import { Navigate } from 'react-router-dom';

import { useToken } from 'hooks/useToken';

import Routes from '../Route';

interface Props {
  children: ReactElement;
}

const PrivateRoute = ({ children }: Props): JSX.Element => {
  const { token } = useToken();

  return token ? children : <Navigate to={Routes.LOGIN} />;
};

export default PrivateRoute;
