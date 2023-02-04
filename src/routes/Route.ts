const Route = {
  ROOT: '/',
  LOGIN: '/login',
  SIGNUP: `/signup`,
  DASHBOARD: '/dashboard',
  NOT_FOUND: '/not_found',
  GROUP_DETAILS: '/group/:id',
  PROFILE: '/profile',
  UNKNOWN_ROUTE: '*',
};

export type RoutesType = typeof Route;
export type RouteNames = keyof RoutesType;
export type RoutePaths = RoutesType[RouteNames];

export default Route;

export const routesInfo = [
  { path: Route.LOGIN, isPrivate: false },
  { path: Route.ROOT, isPrivate: false },
  { path: Route.DASHBOARD, isPrivate: true },
  { path: Route.SIGNUP, isPrivate: false },
  { path: Route.NOT_FOUND, isPrivate: false },
  { path: Route.GROUP_DETAILS, isPrivate: true },
  { path: Route.PROFILE, isPrivate: true },
];
