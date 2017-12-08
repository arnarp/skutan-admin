import * as React from 'react'
import { Route } from 'react-router-dom'
import { UsersIndexPage } from './UsersIndexPage'

export const usersRoutes = [
  <Route key="/users" path="/users" component={UsersIndexPage} />,
]
