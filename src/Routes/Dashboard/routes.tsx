import * as React from 'react'
import { Route } from 'react-router-dom'
import { Dashboard } from './Dashboard'

export const dashboardRoutes = [
  <Route key="/dashboard" exact={true} path="/" component={Dashboard} />,
]
