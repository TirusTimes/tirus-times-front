import type {
  PropsWithRef,
  PropsWithChildren,
  FunctionComponent,
  ComponentType,
} from 'react';
import { Suspense, lazy } from 'react';

import ErrorBoundary from 'components/ErrorBoundary';
import LoadingOverlay from 'components/LoadingOverlay';

type LazyComponentProps = JSX.IntrinsicAttributes;

type LazyComponentFactory<T> = () => Promise<{
  default: FunctionComponent<T> | ComponentType<T>;
}>;
type LazyComponentType<T> = FunctionComponent<
  PropsWithRef<PropsWithChildren<T>>
>;

const LazyComponent = <T extends LazyComponentProps>(
  name: string,
  factory: LazyComponentFactory<T>,
  fallback: JSX.Element = <LoadingOverlay isLoading />,
): LazyComponentType<T> => {
  const TheLazyComponent = lazy(factory);
  const Component = (
    props: PropsWithRef<PropsWithChildren<T>>,
  ): JSX.Element => (
    // eslint-disable-next-line react/destructuring-assignment
    <ErrorBoundary name={name}>
      <Suspense fallback={fallback}>
        <TheLazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
  Component.displayName = `LazyComponent(${name})`;
  return Component;
};

interface LazyComponentSpecDetail {
  component: LazyComponentFactory<LazyComponentProps>;
  fallback: JSX.Element;
}

type LazyComponentsSpec =
  | LazyComponentFactory<LazyComponentProps>
  | LazyComponentSpecDetail;

type LazyComponentsResult<S> = {
  [K in keyof S]: LazyComponentType<LazyComponentProps>;
};

export const createLazyComponents = <
  S extends Record<string, LazyComponentsSpec>,
>(
  specs: S,
  fallback?: JSX.Element,
): LazyComponentsResult<S> =>
  Object.entries(specs).reduce(
    (result, [name, factory]): LazyComponentsResult<S> => {
      const { component, fallback: fallbackOverride } = (
        typeof factory === 'function'
          ? { component: factory, fallback }
          : factory
      ) as LazyComponentSpecDetail;
      // eslint-disable-next-line no-param-reassign
      result = {
        ...result,
        [name]: LazyComponent(name, component, fallbackOverride || fallback),
      };
      return result;
    },
    {} as LazyComponentsResult<S>,
  );

export default LazyComponent;
