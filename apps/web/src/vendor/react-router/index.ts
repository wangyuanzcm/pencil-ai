import { useRoutes, useViewTransitionState } from 'react-router-dom'

export function xge(routes: any, locationArg?: any, _parentMatches?: any, _dataRouterState?: any, _future?: any) {
  return useRoutes(routes, locationArg)
}

export function Eze(to: any, opts?: { relative?: any }) {
  return useViewTransitionState(to, opts as any)
}

