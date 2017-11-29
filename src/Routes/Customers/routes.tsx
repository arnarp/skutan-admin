import * as React from 'react'
import { Route } from 'react-router-dom'
import { Customers } from './Customers'

export const customerRoutes = [
  <Route key="/customers" path="/customers" component={Customers} />,
]
