/* eslint-disable filenames/match-exported */
import { useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes as RoutesContainer,
  Route as RouterRoute,
  Navigate,
} from 'react-router-dom';

import { withSentryReactRouterV6Routing, withProfiler } from '@sentry/react';

import { createLazyComponents } from 'components/LazyComponent';

import Route, { routesInfo } from './Route';

const SentryRoutes = withSentryReactRouterV6Routing(RoutesContainer);
const lazyRoutes = createLazyComponents({
  [Route.SIGNUP]: () => import('./SignUp'),
  [Route.LOGIN]: () => import('./SignIn'),
  [Route.ROOT]: () => import(`./Home`),
  [Route.DASHBOARD]: () => import('./Dashboard'),
  [Route.NOT_FOUND]: () => import(`./NotFound`),
});

const redirectToNotFound = (): JSX.Element => <Navigate to={Route.NOT_FOUND} />;

const Routes = (): JSX.Element => {
  const routes = useMemo(
    () =>
      Object.entries(lazyRoutes).map(([name, Component]) => {
        const currentRoute = routesInfo.find(({ path }) => path === name);
        return !currentRoute?.isPrivate ? (
          <RouterRoute path={name} element={<Component />} key={name} />
        ) : (
          // TODO: For now I`m letting have the same pattern, but it will be created a PrivateRoute wrapper latter on
          <RouterRoute path={name} element={<Component />} key={name} />
        );
      }),
    [],
  );

  return (
    <Router>
      <SentryRoutes>
        {routes}
        <RouterRoute
          path={Route.UNKNOWN_ROUTE}
          element={redirectToNotFound()}
        />
      </SentryRoutes>
    </Router>
  );
};

export default withProfiler(Routes);
