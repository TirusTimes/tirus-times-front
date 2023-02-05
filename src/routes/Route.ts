const Route = {
  ROOT: '/',
  LOGIN: '/login',
  SIGNUP: `/signup`,
  DASHBOARD: '/dashboard',
  NOT_FOUND: '/not_found',
  GROUP_DETAILS: '/group/:id',
  MATCH_DETAILS: '/group/:group/match/:match',
  NO_MATCH: '/group/:group/match',
  NEW_MATCH: '/group/:group/match/new',
  EDIT_MATCH: '/group/:group/match/:match/edit',
  PROFILE: '/profile',
  INVITES: '/group/:group/invites',
  EVALUATE: '/group/:group/match/:match/evaluate',
  EVALUATE_USER: '/group/:group/match/:match/evaluate/:user',
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
  { path: Route.MATCH_DETAILS, isPrivate: true },
  { path: Route.NO_MATCH, isPrivate: true },
  { path: Route.NEW_MATCH, isPrivate: true },
  { path: Route.EDIT_MATCH, isPrivate: true },
  { path: Route.INVITES, isPrivate: true },
  { path: Route.EDIT_MATCH, isPrivate: true },
  { path: Route.EVALUATE, isPrivate: true },
  { path: Route.EVALUATE_USER, isPrivate: true },
];
