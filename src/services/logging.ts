import { useEffect } from 'react';

import {
  addBreadcrumb,
  captureException,
  captureMessage,
  init,
  withScope,
  reactRouterV6Instrumentation,
} from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';

export interface Extras {
  [name: string]: string;
}

const setUp = (): void => {
  init({
    dsn: import.meta.env.VITE_SENTRY,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        ),
      }),
    ],
    release: 'tirustimes@0.5',
  });
};

const logEvent = (message: string, extras?: Extras): void => {
  withScope((scope): void => {
    scope.setLevel('info');
    if (extras) {
      scope.setExtras(extras);
    }
    captureMessage(message);
  });
};

const logError = (error: Error, extras?: Extras): void => {
  withScope((scope): void => {
    scope.setLevel('error');
    if (extras) {
      scope.setExtras(extras);
    }
    captureException(error);
  });
};

const logNavigation = (
  routeName: string,
  params?: { [name: string]: string } | undefined,
  extras?: Extras,
): void => {
  withScope((scope): void => {
    if (extras) {
      scope.setExtras(extras);
    }
    addBreadcrumb({
      category: 'navigation',
      data: { params, routeName },
      level: 'info',
      message: `navigated to ${routeName}`,
    });
    captureMessage(`navigated to ${routeName}`);
  });
};

const logServerError = (error: string | Error, extras?: Extras): void => {
  withScope((scope): void => {
    if (extras) {
      scope.setExtras(extras);
    }
    addBreadcrumb({
      category: 'Server error',
      data: { error, extras },
      level: 'error',
      message: `Server error`,
    });
    captureMessage(`Server error`);
  });
};

const logNetworkError = (error: string, extras?: Extras): void => {
  withScope((scope): void => {
    if (extras) {
      scope.setExtras(extras);
    }
    addBreadcrumb({
      category: 'network error',
      data: { error, extras },
      level: 'error',
      message: `Network error`,
    });
    captureMessage(`Network error`);
  });
};

export default {
  logError,
  logEvent,
  logServerError,
  logNavigation,
  logNetworkError,
  setUp,
};
