import * as React from 'react'
import { Route } from 'react-router-dom'
import { Users } from './Users'

export const usersRoutes = [
  <Route key="/users" path="/users" component={Users} />,
]
