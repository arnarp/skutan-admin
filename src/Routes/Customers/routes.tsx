import * as React from 'react'
import { Route } from 'react-router-dom'
import { CustomersIndexPage } from './CustomersIndexPage'
import { CustomerPage } from './CustomerPage'

export const customerRoutes = [
  <Route
    key="/customers"
    exact={true}
    path="/customers"
    component={CustomersIndexPage}
  />,
  <Route key="/customer/:id" path="/customer/:id" component={CustomerPage} />,
]
