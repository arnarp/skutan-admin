import * as React from 'react'
import { Route } from 'react-router-dom'
import { CustomersIndex } from './CustomersIndex'

export const customerRoutes = [
  <Route key="/customers" path="/customers" component={CustomersIndex} />,
]
